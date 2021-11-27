import {AppActionType, setErrorText, setRequestStatus} from "../state/reducers/app-reducer";
import {Dispatch} from "redux";

import {AxiosError} from "axios";
import {ResponseType} from "../api/todolist-api";

export const catchErrorHandler = (dispatch: Dispatch<AppActionType>, err: AxiosError) => {
    dispatch(setErrorText(err.message))
    dispatch(setRequestStatus('failed'))
}
export const errorHandler = <T>(dispatch: Dispatch<AppActionType>, data: ResponseType<T>) => {
    dispatch(setErrorText(data.messages[0]))
    dispatch(setRequestStatus('failed'))
}