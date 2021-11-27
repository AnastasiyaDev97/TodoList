import {TaskPriorities, TaskResponseType, tasksAPI, TaskStatuses, updateTaskType} from "../../api/tasks-api";
import {Dispatch} from "redux";
import { RootReducerType} from "../store";
import {AppActionType, ResultCodes, setRequestStatus, } from "./app-reducer";
import {AxiosError} from "axios";
import {catchErrorHandler, errorHandler} from "../../utils/error-utils";



export type tasksType = {
    [key: string]: Array<TaskResponseType>
}

let initialState: tasksType = {
    /* 'todoid1':[{id:string,title:string,description:null,todoListId:string, order:number,status:null|number
    priority:number,startDate:null,deadline:null],
    */
}
export const tasksReducer = (state = initialState, action: AppActionType) => {
    switch (action.type) {
        case "SET-TODOLISTS":
            let newState = {...state}
            action.todolists.forEach(f => {
                newState[f.id] = []
            })
            return newState
        case "REMOVE-TASK":
            return {...state, [action.id]: state[action.id].filter(f => f.id !== action.taskId)}
        case "ADD-TASK":
            return {
                ...state, [action.task.todoListId]:
                    [action.task, ...state[action.task.todoListId]]
            }
        case "UPDATE-TASK":
            return {
                ...state,
                [action.task.todoListId]: [...state[action.task.todoListId].map(m => m.id === action.taskId
                    ? {...action.task} : m)]
            }
        case "ADD-TODOLIST":
            return {...state, [action.todolist.id]: []}
        case "REMOVE-TODOLIST":
            let currState = {...state}
            delete currState[action.id]
            return currState
        case 'SET-TASKS':
            let copyState = {...state}
            copyState[action.todolistId] = action.tasks
            return copyState
        default:
            return state
    }
}

export const removeTaskAC = (taskId: string, id: string) => {
    return {
        type: "REMOVE-TASK",
        id,
        taskId,
    } as const
}


export const addTaskAC = (task: TaskResponseType, id: string) => {
    return {
        type: "ADD-TASK",
        task,
        id,
    } as const
}

export const updateTaskAC = (task: TaskResponseType, taskId: string) => ({
    type: "UPDATE-TASK" as const,
    task,
    taskId,
})
export const setTasksAC = (tasks: Array<TaskResponseType>, todolistId: string) => ({
    type: "SET-TASKS" as const,
    tasks,
    todolistId,
})

export const getTasksTC = (todolistId: string) =>
    (dispatch: Dispatch<AppActionType>) => {
        dispatch(setRequestStatus('loading'))
        tasksAPI.GetTasks(todolistId)
            .then((data) => {
                dispatch(setTasksAC(data.items, todolistId))
                dispatch(setRequestStatus('succeeded'))
            })

    }

export const deleteTaskTC = (todolistId: string, taskId: string) =>
    (dispatch: Dispatch<AppActionType>) => {
        dispatch(setRequestStatus('loading'))
        tasksAPI.DeleteTask(todolistId, taskId)
            .then((data) => {
                if (data.resultCode === ResultCodes.success) {
                    dispatch(removeTaskAC(taskId, todolistId))
                    dispatch(setRequestStatus('succeeded'))
                } else {
                    errorHandler(dispatch, data)
                }
            })
            .catch((err: AxiosError) => {
                catchErrorHandler(dispatch, err)
            })
    }

export const addTaskTC = (todolistId: string, title: string) =>
    (dispatch: Dispatch<AppActionType>) => {
        dispatch(setRequestStatus('loading'))
        tasksAPI.CreateTask(todolistId, title)
            .then((data) => {
                if (data.resultCode === ResultCodes.success) {
                    let task = data.data.item
                    dispatch(addTaskAC(task, todolistId))
                    dispatch(setRequestStatus('succeeded'))
                } else {
                    errorHandler(dispatch, data)
                }
            })
            .catch((err: AxiosError) => catchErrorHandler(dispatch, err))
    }
export type updateElemInTaskType = {
    title?: string
    description?: string | null
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: null | string
    deadline?: null | string
}

export const updateTaskTC = (todolistId: string, taskId: string, updateElemInTask: updateElemInTaskType) =>
    (dispatch: Dispatch<AppActionType>, getState: () => RootReducerType) => {
        let tasks = getState().tasks
        let currTask = tasks[todolistId].find(f => f.id === taskId)
        if (currTask) {
            let updateTask: updateTaskType = {
                title: currTask.title,
                description: currTask.description,
                status: currTask.status,
                priority: currTask.priority,
                startDate: currTask.startDate,
                deadline: currTask.deadline,
            }
            let updateTaskForAPI = {...updateTask, ...updateElemInTask}
            dispatch(setRequestStatus('loading'))
            tasksAPI.UpdateTask(todolistId, taskId, updateTaskForAPI)
                .then((data) => {
                    if (data.resultCode === ResultCodes.success) {
                        let task = data.data.item
                        dispatch(updateTaskAC(task, taskId))
                        dispatch(setRequestStatus('succeeded'))
                    } else {
                        errorHandler(dispatch, data)
                    }
                })
                .catch((err: AxiosError) => catchErrorHandler(dispatch, err))
        }
    }



