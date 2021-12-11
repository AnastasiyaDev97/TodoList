import {Dispatch} from "redux";
import {todolistAPI, TodolistResponseType} from "../../api/todolist-api";
import {AppActionType, RequestStatusType, ResultCodes, setRequestStatus} from "./app-reducer";
import {catchErrorHandler, errorHandler} from "../../utils/error-utils";
import {AxiosError} from "axios";
import {getTasksTC} from "./tasks-reducer";
import {RootReducerType} from "../store";
import {ThunkAction} from "redux-thunk";

export type todolistsDomainType = TodolistResponseType & { filter: filterValuesType, entityStatus: RequestStatusType }
export type filterValuesType = "all" | "completed" | "active"

type stateType = Array<todolistsDomainType>

export type setTodolistStatusType = ReturnType<typeof setTodolistProgressStatus>


let initialState: stateType = []


const todolistsReducer = (state = initialState, action: AppActionType): Array<todolistsDomainType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return state.filter(f => f.id !== action.id)
        case "ADD-TODOLIST":
            return [{...action.todolist, filter: "all", entityStatus: 'idle'}, ...state]
        case "CHANGE-TODOLIST-TITLE":
            return [...state]
        case "CHANGE-TODOLIST-FILTER":
            return state.map(m => m.id === action.id ? {...m, filter: action.filter} : m)
        case "SET-TODOLISTS":
            return action.todolists.map(m => {
                return {...m, filter: 'all', entityStatus: 'idle'}
            })
        case 'SET-TODOLIST-PROGRESS-STATUS': {
            return state.map(m => m.id === action.todolistId ? {...m, entityStatus: action.entityStatus} : m)
        }
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
export const setTodolistProgressStatus = (entityStatus: RequestStatusType, todolistId: string) => {
    return {
        type: 'SET-TODOLIST-PROGRESS-STATUS' as const,
        entityStatus,
        todolistId,
    }
}
/*type ThunkType = ThunkAction<void, RootReducerType, unknown, AppActionType>*/

export const setTodosTC = ()/*:ThunkType*/ => (dispatch:Dispatch) => {
    dispatch(setRequestStatus({status:'loading'}))
    todolistAPI.GetTodolists().then((data) => {
        dispatch(setTodolistsAC(data))
        dispatch(setRequestStatus({status:'succeeded'}))
        return data;
    }).then((data)=>{
        //@ts-ignore
        data.forEach(todo=>dispatch(getTasksTC(todo.id)))
    })
}
export const removeTodoTC = (todolistId: string) => (dispatch: Dispatch) => {
    dispatch(setRequestStatus({status:'loading'}))
    dispatch(setTodolistProgressStatus('loading', todolistId))
    todolistAPI.DeleteTodolist(todolistId)
        .then((data) => {
            if (data.resultCode === ResultCodes.success) {
                dispatch(removeTodolistAC(todolistId))
                dispatch(setTodolistProgressStatus('succeeded', todolistId))
                dispatch(setRequestStatus({status:'succeeded'}))
            } else {
                errorHandler(dispatch, data)
                dispatch(setTodolistProgressStatus('failed', todolistId))
            }
        })
        .catch((err: AxiosError) => {
            catchErrorHandler(dispatch, err)
        })
}
export const addTodoTC = (title: string) => (dispatch: Dispatch) => {

    dispatch(setRequestStatus({status:'loading'}))
    todolistAPI.CreateTodolist(title)
        .then((data) => {
            if (data.resultCode === ResultCodes.success) {
                dispatch(addTodolistAC(data.data.item))
                dispatch(setRequestStatus({status:'succeeded'}))
            } else {
                errorHandler(dispatch, data)
            }
        })
        .catch((err: AxiosError) => {
            catchErrorHandler(dispatch, err)
        })

}
export const updateTodoTitleTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    dispatch(setRequestStatus({status:'loading'}))
    todolistAPI.UpdateTodolistTitle(todolistId, title)
        .then((data) => {
            if (data.resultCode === ResultCodes.success) {
                dispatch(changeTodolistTitleAC())
                dispatch(setRequestStatus({status:'succeeded'}))
            } else {
                errorHandler(dispatch, data)
            }
        })
        .catch((err: AxiosError) => {
            catchErrorHandler(dispatch, err)
        })
}
export default todolistsReducer;