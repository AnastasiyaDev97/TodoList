import {Dispatch} from "redux";
import {todolistAPI, TodolistResponseType} from "../../api/todolist-api";
import {RequestStatusType, ResultCodes, setRequestStatus} from "./app-reducer";
import {catchErrorHandler, errorHandler} from "../../utils/error-utils";
import {AxiosError} from "axios";
import {getTasksTC} from "./tasks-reducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type todolistsDomainType = TodolistResponseType & { filter: filterValuesType, entityStatus: RequestStatusType }
export type filterValuesType = "all" | "completed" | "active"

type stateType = Array<todolistsDomainType>

export type setTodolistStatusType = ReturnType<typeof setTodolistProgressStatus>


let initialState: stateType = []


const slice = createSlice({
    name: 'tasks',
    initialState: initialState,
    reducers: {
        removeTodolistAC(state, action: PayloadAction<{ id: string }>) {
            debugger
            let index = state.findIndex(tl => tl.id === action.payload.id)
            if (index !== -1) {
                state.splice(index, 1)         //с какого индекса, сколько эл-ов
            }
        },
        addTodolistAC(state, action: PayloadAction<{ todolist: TodolistResponseType }>) {
            state.unshift({...action.payload.todolist, filter: "all", entityStatus: 'idle'})
        },
        changeTodolistTitleAC(state, action: PayloadAction) {
            return state
        },
        changeTodolistFilterAC(state, action: PayloadAction<{ id: string, newFilter: filterValuesType }>) {
            let index = state.findIndex(t => t.id === action.payload.id)
            state[index] = {...state[index], filter: action.payload.newFilter}
        },
        setTodolistsAC(state, action: PayloadAction<{ todolists: Array<TodolistResponseType> }>) {
            return action.payload.todolists.map(m => ({...m, filter: 'all', entityStatus: 'idle'}))
        },
        setTodolistProgressStatus(state, action: PayloadAction<{ entityStatus: RequestStatusType, todolistId: string }>) {
            let index = state.findIndex(t => t.id === action.payload.todolistId)
            state[index] = {...state[index], entityStatus: action.payload.entityStatus}
        },
    }
})

export const {
    removeTodolistAC,
    addTodolistAC,
    changeTodolistTitleAC,
    changeTodolistFilterAC,
    setTodolistsAC,
    setTodolistProgressStatus
} = slice.actions
export const todolistsReducer = slice.reducer


/*type ThunkType = ThunkAction<void, RootReducerType, unknown, AppActionType>*/

export const setTodosTC = ()/*:ThunkType*/ => (dispatch: Dispatch) => {
    dispatch(setRequestStatus({status: 'loading'}))
    todolistAPI.GetTodolists().then((data) => {
        dispatch(setTodolistsAC({todolists: data}))
        dispatch(setRequestStatus({status: 'succeeded'}))
        return data;
    }).then((data) => {
        //@ts-ignore
        data.forEach(todo => dispatch(getTasksTC(todo.id)))
    })
}
export const removeTodoTC = (todolistId: string) => (dispatch: Dispatch) => {
    dispatch(setRequestStatus({status: 'loading'}))
    dispatch(setTodolistProgressStatus({entityStatus: 'loading', todolistId}))
    todolistAPI.DeleteTodolist(todolistId)
        .then((data) => {
            if (data.resultCode === ResultCodes.success) {
                dispatch(removeTodolistAC({id: todolistId}))
                dispatch(setTodolistProgressStatus({entityStatus: 'succeeded', todolistId}))
                dispatch(setRequestStatus({status: 'succeeded'}))
            } else {
                errorHandler(dispatch, data)
                dispatch(setTodolistProgressStatus({entityStatus: 'failed', todolistId}))
            }
        })
        .catch((err: AxiosError) => {
            catchErrorHandler(dispatch, err)
        })
}
export const addTodoTC = (title: string) => (dispatch: Dispatch) => {

    dispatch(setRequestStatus({status: 'loading'}))
    todolistAPI.CreateTodolist(title)
        .then((data) => {
            if (data.resultCode === ResultCodes.success) {
                dispatch(addTodolistAC({todolist: data.data.item}))
                dispatch(setRequestStatus({status: 'succeeded'}))
            } else {
                errorHandler(dispatch, data)
            }
        })
        .catch((err: AxiosError) => {
            catchErrorHandler(dispatch, err)
        })

}
export const updateTodoTitleTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    dispatch(setRequestStatus({status: 'loading'}))
    todolistAPI.UpdateTodolistTitle(todolistId, title)
        .then((data) => {
            if (data.resultCode === ResultCodes.success) {
                dispatch(changeTodolistTitleAC())
                dispatch(setRequestStatus({status: 'succeeded'}))
            } else {
                errorHandler(dispatch, data)
            }
        })
        .catch((err: AxiosError) => {
            catchErrorHandler(dispatch, err)
        })
}
