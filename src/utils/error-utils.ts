import { setErrorText, setRequestStatus} from "../state/reducers/app-reducer";
import {Dispatch} from "redux";

import {AxiosError} from "axios";
import {ResponseType} from "../api/todolist-api";

export const catchErrorHandler = (dispatch: Dispatch, err: AxiosError) => {
    dispatch(setErrorText({error:err.message}))
    dispatch(setRequestStatus({status:'failed'}))
}
export const errorHandler = <T>(dispatch: Dispatch, data: ResponseType<T>) => {
    dispatch(setErrorText({error:data.messages[0]}))
    dispatch(setRequestStatus({status:'failed'}))
}