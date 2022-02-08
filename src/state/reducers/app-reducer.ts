import {
    addTodolistAC, changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    setTodolistsAC,
    setTodolistStatusType
} from "./todolist-reducer";
import {addTaskAC, removeTaskAC, setTasksAC, updateTaskAC} from "./tasks-reducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Nullable} from "../../type/Nullable";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as Nullable<string>,
    isInitialize: false,
}
export type appInitialStateType = {
    status: RequestStatusType
    error: Nullable<string>
    isInitialize: boolean
}

const slice = createSlice({
    name: 'app',
    initialState: initialState,
    reducers: {
        toggleIsInitialize(state, action: PayloadAction<{ value: boolean }>) {
            state.isInitialize = action.payload.value;
        },
        setRequestStatus(state, action: PayloadAction<{ status: RequestStatusType }>) {

            state.status = action.payload.status;
        },
        setErrorText(state, action: PayloadAction<{ error: Nullable<string> }>) {
            state.error = action.payload.error;
        },

    }
})

export const {setRequestStatus, toggleIsInitialize, setErrorText} = slice.actions
export const appReducer = slice.reducer


export type AppActionType =
    ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof setTodolistsAC>
    | ReturnType<typeof setTasksAC>
    | ReturnType<typeof updateTaskAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>
    | ReturnType<typeof setTodolistsAC>
    | setTodolistStatusType

export type setErrorTextType=ReturnType<typeof setErrorText>
export type setRequestStatusType=ReturnType<typeof setRequestStatus>

export enum ResultCodes {
    success = 0,
    error = 1,
    captcha = 10,
}