import {v1} from "uuid";
import {tasksType} from "../../App";
import {addTodolistAC, removeTodolistAC} from "./todolist-reducer";

type stateType = tasksType
type ActionType =
    ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof changeTaskStatusAC>
    | ReturnType<typeof changeTaskTitleAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof removeTodolistAC>

export const tasksReducer = (state: stateType, action: ActionType) => {
    switch (action.type) {
        case "REMOVE-TASK":
            return {...state, [action.todolistId]: state[action.todolistId].filter(f => f.taskId !== action.taskId)}
        case "ADD-TASK":
            return {
                ...state, [action.todolistId]:
                    [{taskId: v1(), taskTitle: action.taskTitle, isDone: false}, ...state[action.todolistId]]
            }
        case "CHANGE-TASK-STATUS":
            return {
                ...state, [action.todolistId]: [...state[action.todolistId].map(m => m.taskId === action.taskId
                    ? {...m, isDone: action.isDone} : m)]
            }
        case "CHANGE-TASK-TITLE":
            return {
                ...state, [action.todolistId]: [...state[action.todolistId].map(m => m.taskId === action.taskId
                    ? {...m, taskTitle: action.taskTitle} : m)]
            }
        case "ADD-TODOLIST":
            return {...state, [action.todolistId]: []}
        case "REMOVE-TODOLIST":
            delete state[action.todolistId]
            return state
        default:
            return state
    }
}

export const removeTaskAC = (taskId: string, todolistId: string) => {
    return {
        type: "REMOVE-TASK",
        todolistId,
        taskId,
    } as const
}


export const addTaskAC = (taskTitle: string, todolistId: string) => {
    return {
        type: "ADD-TASK",
        taskTitle,
        todolistId,
    } as const
}

export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string) => ({
    type: "CHANGE-TASK-STATUS" as const,
    taskId,
    isDone,
    todolistId,
})

export const changeTaskTitleAC = (taskId: string, newTitle: string, todolistId: string) => ({
    type: "CHANGE-TASK-TITLE" as const,
    taskId,
    taskTitle: newTitle,
    todolistId,
})


