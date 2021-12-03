import {
    addTodolistAC, changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    setTodolistsAC,
    setTodolistStatusType
} from "./todolist-reducer";
import {addTaskAC, removeTaskAC, setTasksAC, updateTaskAC} from "./tasks-reducer";
import {setAuthUserData, setIsLoggedInAC} from "./auth-reducer";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    status: 'idle' as RequestStatusType,
    error: null,
    isInitialize:false,
}
export type appInitialStateType = {
    status: RequestStatusType
    error: string | null
    isInitialize:boolean
}


export const appReducer = (state: appInitialStateType = initialState, action: AppActionType) => {
    switch (action.type) {
        case 'SET-REQUEST-STATUS':
            return {...state, status: action.status};
        case 'SET-ERROR-TEXT':

            return {...state, error: action.error};
        case 'TOGGLE-INITIALIZATION':
            return {...state, isInitialize: action.value};
        default:
            return state
    }
}

export const setRequestStatus = (status: RequestStatusType) => ({
    type: 'SET-REQUEST-STATUS',
    status,
} as const)

export const setErrorText = (error: string | null) => ({
    type: 'SET-ERROR-TEXT',
    error,
} as const)
export const toggleIsInitialize = (value: boolean) => ({
    type: 'TOGGLE-INITIALIZATION',
    value,
} as const)

export type setRequestStatusType = ReturnType<typeof setRequestStatus>
export type setErrorTextType = ReturnType<typeof setErrorText>


export type AppActionType =
    ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof setTodolistsAC>
    | ReturnType<typeof setTasksAC>
    | ReturnType<typeof updateTaskAC>
    | setRequestStatusType
    | setErrorTextType
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>
    | ReturnType<typeof setTodolistsAC>
    | setTodolistStatusType
    | ReturnType<typeof setIsLoggedInAC>
    | ReturnType<typeof setAuthUserData>
    | ReturnType<typeof toggleIsInitialize>

export enum ResultCodes {
    success = 0,
    error = 1,
    captcha = 10,
}