import {Dispatch} from "redux";
import {todolistAPI, TodolistResponseType} from "../../api/todolist-api";

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
            return [{...action.todolist, filter: "all"}, ...state]
        case "CHANGE-TODOLIST-TITLE":
            return [...state]
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

export const addTodolistAC = (todolist: TodolistResponseType) => {
    return {
        type: 'ADD-TODOLIST',
        todolist
    } as const
}

export const changeTodolistTitleAC = () => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
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
export const setTodosTC = () => (dispatch: Dispatch<ActionType>) => {
    todolistAPI.GetTodolists().then((data) => {
        dispatch(setTodolistsAC(data))
    })
}
export const removeTodoTC = (todolistId: string) => (dispatch: Dispatch<ActionType>) => {
    todolistAPI.DeleteTodolist(todolistId).then(() => {
        dispatch(removeTodolistAC(todolistId))
    })
}
export const addTodoTC = (title: string) => (dispatch: Dispatch<ActionType>) => {
    debugger
    todolistAPI.CreateTodolist(title).then((data) => {
        dispatch(addTodolistAC(data.data.item))
    })
}
export const updateTodoTitleTC = (todolistId: string, title: string) => (dispatch: Dispatch<ActionType>) => {
    debugger
    todolistAPI.UpdateTodolistTitle(todolistId, title).then(() => {
        dispatch(changeTodolistTitleAC())
    })
}
export default todolistsReducer;