import {v1} from "uuid";
import {addTodolistAC, removeTodolistAC, setTodolistsAC} from "./todolist-reducer";

export type taskType = {
    taskId: string
    taskTitle: string
    isDone: boolean
}
export type tasksType = {
    [key: string]: Array<taskType>
}

let initialState: tasksType = {
    /* 'todoid1':[],
    */
}
export const tasksReducer = (state = initialState, action: ActionType) => {
    switch (action.type) {
        case "SET-TODOLISTS":
            let newState={...state}
            action.todolists.forEach(f=>{
                newState[f.id]=[]
            })
            return newState
        case "REMOVE-TASK":
            return {...state, [action.id]: state[action.id].filter(f => f.taskId !== action.taskId)}
        case "ADD-TASK":
            return {
                ...state, [action.id]:
                    [{taskId: v1(), taskTitle: action.taskTitle, isDone: false}, ...state[action.id]]
            }
        case "CHANGE-TASK-STATUS":
            return {
                ...state, [action.id]: [...state[action.id].map(m => m.taskId === action.taskId
                    ? {...m, isDone: action.isDone} : m)]
            }

        case "CHANGE-TASK-TITLE":
            return {
                ...state, [action.id]: [...state[action.id].map(m => m.taskId === action.taskId
                    ? {...m, taskTitle: action.taskTitle} : m)]
            }
        case "ADD-TODOLIST":
            return {...state, [action.id]: []}
        case "REMOVE-TODOLIST": {
            let currState = {...state}
            delete currState[action.id]
            return currState
        }
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


export const addTaskAC = (taskTitle: string, id: string) => {
    return {
        type: "ADD-TASK",
        taskTitle,
        id,
    } as const
}

export const changeTaskStatusAC = (taskId: string, isDone: boolean, id: string) => ({
    type: "CHANGE-TASK-STATUS" as const,
    taskId,
    isDone,
    id,
})

export const changeTaskTitleAC = (taskId: string, newTitle: string, id: string) => ({
    type: "CHANGE-TASK-TITLE" as const,
    taskId,
    taskTitle: newTitle,
    id,
})

type ActionType =
    ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof changeTaskStatusAC>
    | ReturnType<typeof changeTaskTitleAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof setTodolistsAC>
