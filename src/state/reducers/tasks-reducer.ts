import {TaskPriorities, TaskResponseType, tasksAPI, TaskStatuses, updateTaskType} from "../../api/tasks-api";
import {Dispatch} from "redux";
import {RootReducerType} from "../store";
import {ResultCodes, setRequestStatus,} from "./app-reducer";
import {AxiosError} from "axios";
import {catchErrorHandler, errorHandler} from "../../utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {addTodolistAC, removeTodolistAC, setTodolistsAC} from "./todolist-reducer";
import { Nullable } from "../../type/Nullable";


export type tasksType = {
    [key: string]: Array<TaskResponseType>
}

let initialState: tasksType = {
    /* 'todoid1':[{id:string,title:string,description:null,todoListId:string, order:number,status:null|number
    priority:number,startDate:null,deadline:null],
    */
}

const slice = createSlice({
    name: 'tasks',
    initialState: initialState,
    reducers: {
        removeTaskAC(state, action: PayloadAction<{ taskId: string, id: string }>) {
            let index = state[action.payload.id].findIndex(tl => tl.id === action.payload.taskId)
            if (index !== -1) {
                state[action.payload.id].splice(index, 1)         //с какого индекса, сколько эл-ов
            }
        },
        addTaskAC(state, action: PayloadAction<{ task: TaskResponseType, id: string }>) {
            state[action.payload.id].unshift(action.payload.task)
        },
        updateTaskAC(state, action: PayloadAction<{ task: TaskResponseType, taskId: string }>) {
            let index = state[action.payload.task.todoListId].findIndex(t => t.id === action.payload.taskId)
            state[action.payload.task.todoListId][index] = {...state[action.payload.task.todoListId][index], ...action.payload.task}
        },
        setTasksAC(state, action: PayloadAction<{ tasks: Array<TaskResponseType>, todolistId: string }>) {
            state[action.payload.todolistId] = action.payload.tasks
        },
    },
    extraReducers: builder => {
        builder.addCase(addTodolistAC, (state, action) => {
            state[action.payload.todolist.id] = []
        });
        builder.addCase(setTodolistsAC, (state, action) => {
            action.payload.todolists.forEach(f => {
                state[f.id] = []
            })
        });
        builder.addCase(removeTodolistAC, (state, action) => {
            delete state[action.payload.id]
        })
    }
})


export const {removeTaskAC, addTaskAC, updateTaskAC, setTasksAC} = slice.actions
export const tasksReducer = slice.reducer


export const getTasksTC = (todolistId: string) =>
    (dispatch: Dispatch) => {
        dispatch(setRequestStatus({status: 'loading'}))
        tasksAPI.GetTasks(todolistId)
            .then((data) => {
                dispatch(setTasksAC({tasks: data.items, todolistId}))
                dispatch(setRequestStatus({status: 'succeeded'}))
            })

    }

export const deleteTaskTC = (todolistId: string, taskId: string) =>
    (dispatch: Dispatch) => {
        dispatch(setRequestStatus({status: 'loading'}))
        tasksAPI.DeleteTask(todolistId, taskId)
            .then((data) => {
                if (data.resultCode === ResultCodes.success) {
                    dispatch(removeTaskAC({taskId, id: todolistId}))
                    dispatch(setRequestStatus({status: 'succeeded'}))
                } else {
                    errorHandler(dispatch, data)
                }
            })
            .catch((err: AxiosError) => {
                catchErrorHandler(dispatch, err)
            })
    }

export const addTaskTC = (todolistId: string, title: string) =>
    (dispatch: Dispatch) => {
        dispatch(setRequestStatus({status: 'loading'}))
        tasksAPI.CreateTask(todolistId, title)
            .then((data) => {
                if (data.resultCode === ResultCodes.success) {
                    let task = data.data.item
                    dispatch(addTaskAC({task, id: todolistId}))
                    dispatch(setRequestStatus({status: 'succeeded'}))
                } else {
                    errorHandler(dispatch, data)
                }
            })
            .catch((err: AxiosError) => catchErrorHandler(dispatch, err))
    }
export type updateElemInTaskType = {
    title?: string
    description?: Nullable<string>
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: Nullable<string>
    deadline?: Nullable<string>
}

export const updateTaskTC = (todolistId: string, taskId: string, updateElemInTask: updateElemInTaskType) =>
    (dispatch: Dispatch, getState: () => RootReducerType) => {
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
            dispatch(setRequestStatus({status: 'loading'}))
            tasksAPI.UpdateTask(todolistId, taskId, updateTaskForAPI)
                .then((data) => {
                    if (data.resultCode === ResultCodes.success) {
                        let task = data.data.item
                        dispatch(updateTaskAC({task, taskId}))
                        dispatch(setRequestStatus({status: 'succeeded'}))
                    } else {
                        errorHandler(dispatch, data)
                    }
                })
                .catch((err: AxiosError) => catchErrorHandler(dispatch, err))
        }
    }



