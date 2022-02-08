import {Dispatch} from 'redux'
import { ResultCodes, setRequestStatus, toggleIsInitialize} from "./app-reducer";
import {authAPI, AuthUserDataType, loginParamsType} from "../../api/todolist-api";
import {catchErrorHandler, errorHandler} from "../../utils/error-utils";
import {AxiosError} from "axios";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Nullable} from "../../type/Nullable";

const initialState = {
    isLoggedIn: false,
    data:{
    id:null as Nullable<number>,
    login:null as Nullable<string>,
    email:null as Nullable<string>,
}}


const slice = createSlice({
    name: 'app',
    initialState: initialState,
    reducers: {
        setIsLoggedInAC(state, action: PayloadAction<{ value: boolean }>) {
            state.isLoggedIn = action.payload.value;
        },
        setAuthUserData(state, action: PayloadAction<{ data:AuthUserDataType }>) {
            state.data=action.payload.data
        },

    }})

export const {setIsLoggedInAC,setAuthUserData}=slice.actions
export const authReducer = slice.reducer


export const loginTC = (data: loginParamsType) => (dispatch: Dispatch) => {
    dispatch(setRequestStatus({status:'loading'}))
    authAPI.login(data).then((data) => {
        if (data.resultCode === ResultCodes.success) {
            dispatch(setIsLoggedInAC({value:true}))
            dispatch(setRequestStatus({status:'succeeded'}))
        } else {
            errorHandler(dispatch, data)
        }
    })
        .catch((err: AxiosError) => catchErrorHandler(dispatch, err))
}
export const logoutTC = () => (dispatch: Dispatch) => {
    dispatch(setRequestStatus({status:'loading'}))
    authAPI.logout().then((data) => {
        if (data.resultCode === ResultCodes.success) {
            dispatch(setIsLoggedInAC({value:false}))
            dispatch(setRequestStatus({status:'succeeded'}))
        } else {
            errorHandler(dispatch, data)
        }
    })
        .catch((err: AxiosError) => catchErrorHandler(dispatch, err))
}


export const authUserTC = () => (dispatch: Dispatch) => {
    dispatch(setRequestStatus({status:'loading'}))
    authAPI.getAuthData().then((data) => {
        if (data.resultCode === ResultCodes.success) {
            dispatch(setIsLoggedInAC({value:true}))
            dispatch(setRequestStatus({status:'succeeded'}))
        } else {
            errorHandler(dispatch, data)
        }
    })
        .catch((err: AxiosError) => catchErrorHandler(dispatch, err))
        .finally(()=>dispatch(toggleIsInitialize({value:true})))
}
// types

