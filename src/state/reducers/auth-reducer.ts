import {Dispatch} from 'redux'
import {AppActionType, ResultCodes, setRequestStatus} from "./app-reducer";
import {authAPI, loginParamsType} from "../../api/todolist-api";
import {catchErrorHandler, errorHandler} from "../../utils/error-utils";
import {AxiosError} from "axios";

const initialState = {
    isLoggedIn: false
}
type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: AppActionType): InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}
        default:
            return state
    }
}
// actions
export const setIsLoggedInAC = (value: boolean) =>
    ({type: 'login/SET-IS-LOGGED-IN', value} as const)

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


// types

