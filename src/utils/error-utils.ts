import {setErrorText, setErrorTextType, setRequestStatus, setRequestStatusType} from "../state/reducers/app-reducer";
import {Dispatch} from "redux";

import {ResponseType} from "../api/todolist-api";

export const catchErrorHandler = (dispatch: ErrorUtilsDispatchType, err: any) => {
    dispatch(setErrorText({error: err.message}))
    dispatch(setRequestStatus({status: 'failed'}))
}
export const errorHandler = <T>(dispatch: ErrorUtilsDispatchType, data: ResponseType<T>) => {
    if (data.messages) {
        dispatch(setErrorText({error: data.messages[0]}))
    } else {
        dispatch(setErrorText({error:'Some error occurred'}))
    }
    dispatch(setRequestStatus({status: 'failed'}))
}



type ErrorUtilsDispatchType = Dispatch<setErrorTextType | setRequestStatusType>;