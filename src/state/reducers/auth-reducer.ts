import {Dispatch} from 'redux'
import {AppActionType, ResultCodes, setRequestStatus, toggleIsInitialize} from "./app-reducer";
import {authAPI, AuthUserDataType, loginParamsType} from "../../api/todolist-api";
import {catchErrorHandler, errorHandler} from "../../utils/error-utils";
import {AxiosError} from "axios";

const initialState = {
    isLoggedIn: false,
    data:{
    id:null,
    login:null,
    email:null,
}}
type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: AppActionType): InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}
        case 'SET-AUTH-USER-DATA':
            return {...state, ...action.data}
        default:
            return state
    }
}
// actions
export const setIsLoggedInAC = (value: boolean) =>
    ({type: 'login/SET-IS-LOGGED-IN', value} as const)

export const setAuthUserData = (data:AuthUserDataType) =>
    ({type: 'SET-AUTH-USER-DATA', data} as const)

// thunks
export const loginTC = (data: loginParamsType) => (dispatch: Dispatch<AppActionType>) => {
    dispatch(setRequestStatus('loading'))
    authAPI.login(data).then((data) => {
        if (data.resultCode === ResultCodes.success) {
            dispatch(setIsLoggedInAC(true))
            dispatch(setRequestStatus('succeeded'))
        } else {
            errorHandler(dispatch, data)
        }
    })
        .catch((err: AxiosError) => catchErrorHandler(dispatch, err))
}
export const logoutTC = () => (dispatch: Dispatch<AppActionType>) => {
    dispatch(setRequestStatus('loading'))
    authAPI.logout().then((data) => {
        if (data.resultCode === ResultCodes.success) {
            dispatch(setIsLoggedInAC(false))
            dispatch(setRequestStatus('succeeded'))
        } else {
            errorHandler(dispatch, data)
        }
    })
        .catch((err: AxiosError) => catchErrorHandler(dispatch, err))
}


export const authUserTC = () => (dispatch: Dispatch<AppActionType>) => {
    dispatch(setRequestStatus('loading'))
    authAPI.getAuthData().then((data) => {
        if (data.resultCode === ResultCodes.success) {
            dispatch(setIsLoggedInAC(true))
            dispatch(setRequestStatus('succeeded'))
        } else {
            errorHandler(dispatch, data)
        }
    })
        .catch((err: AxiosError) => catchErrorHandler(dispatch, err))
        .finally(()=>dispatch(toggleIsInitialize(true)))
}
// types

