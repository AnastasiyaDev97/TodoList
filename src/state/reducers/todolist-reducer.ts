import {Dispatch} from "redux";
import {v1} from "uuid";
import {todolistAPI, TodolistResponseType} from "../../api/todolist-api";
import { RootReducerType} from "../store";

export type todolistsDomainType = TodolistResponseType & { filter: filterValuesType }
export type filterValuesType = "all" | "completed" | "active"

type stateType = Array<todolistsDomainType>

type ActionType = ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>
    | ReturnType<typeof setTodolistsAC>

let initialState: stateType = []


const todolistsReducer = (state = initialState, action: ActionType): Array<todolistsDomainType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return state.filter(f => f.id !== action.id)
        case "ADD-TODOLIST":
            return [...state, {id: action.id, title: action.title, filter: 'all', addedDate: '', order: 0}]
        case "CHANGE-TODOLIST-TITLE":
            return state.map(m => m.id === action.id ? {...m, title: action.title} : m)
        case "CHANGE-TODOLIST-FILTER":
            return state.map(m => m.id === action.id ? {...m, filter: action.filter} : m)
        case "SET-TODOLISTS":
            return action.todolists.map(m => {
                return {...m, filter: 'all'}
            })
        default:
            return state
    }
}

export const removeTodolistAC = (id: string) => {
    return {
        type: "REMOVE-TODOLIST",
        id,
    } as const
}

export const addTodolistAC = (title: string) => {
    return {
        type: 'ADD-TODOLIST',
        title,
        id: v1(),
    } as const
}

export const changeTodolistTitleAC = (id: string, title: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        id,
        title,
    } as const
}
export const changeTodolistFilterAC = (id: string, newFilter: filterValuesType) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER' as const,
        id,
        filter: newFilter,
    }
}
export const setTodolistsAC = (todolists: Array<TodolistResponseType>) => {
    return {
        type: 'SET-TODOLISTS' as const,
        todolists,
    }
}
export const setTodosThunk = (dispatch: Dispatch, getState: () => RootReducerType) => {
    todolistAPI.GetTodolists().then((data) => {
        dispatch(setTodolistsAC(data))
    })
}

export default todolistsReducer;