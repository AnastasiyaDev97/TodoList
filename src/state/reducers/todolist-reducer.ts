import {v1} from "uuid";
import {filterValuesType, todolistsType} from "../../AppWithRedux";

type stateType = Array<todolistsType>
type ActionType = ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>

let initialState: stateType = []


const todolistsReducer = (state=initialState, action: ActionType):Array<todolistsType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return state.filter(f => f.todolistId !== action.todolistId)
        case "ADD-TODOLIST":
            return [...state, {todolistId: action.todolistId, title: action.title, filter: 'all'}]
        case "CHANGE-TODOLIST-TITLE":
            return state.map(m => m.todolistId === action.todolistId ? {...m, title: action.title} : m)
        case "CHANGE-TODOLIST-FILTER":
            return state.map(m => m.todolistId === action.todolistId ? {...m, filter: action.filter} : m)
        default:
            return state
    }
}

export const removeTodolistAC = (todolistId: string) => {
    return {
        type: "REMOVE-TODOLIST",
        todolistId,
    } as const
}

export const addTodolistAC = (title: string) => {
    return {
        type: 'ADD-TODOLIST',
        title,
        todolistId:v1(),
    } as const
}

export const changeTodolistTitleAC = (todolistId: string, title: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        todolistId,
        title,
    } as const
}
export const changeTodolistFilterAC = (todolistId: string, newFilter: filterValuesType) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER' as const,
        todolistId,
        filter: newFilter,
    }
}

export default todolistsReducer;