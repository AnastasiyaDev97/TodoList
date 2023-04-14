import { setErrorText, setRequestStatus } from "state/reducers/app-reducer";
import { Dispatch } from "redux";
import { ResponseT } from "api/types";
import { RequestStatusType } from "enums";
import { setErrorTextType, setRequestStatusType } from "state/reducers/types";
import { FIRST_INDEX, SOME_ERROR } from "constants/index";

const { Failed } = RequestStatusType;

export const catchErrorHandler = (
  dispatch: ErrorUtilsDispatchType,
  err: any
) => {
  dispatch(setErrorText({ error: err.message }));
  dispatch(setRequestStatus({ status: Failed }));
};

export const errorHandler = <T>(
  dispatch: ErrorUtilsDispatchType,
  data: ResponseT<T>
) => {
  const { messages } = data;
  if (messages) {
    dispatch(setErrorText({ error: messages[FIRST_INDEX] }));
  } else {
    dispatch(setErrorText({ error: SOME_ERROR }));
  }
  dispatch(setRequestStatus({ status: Failed }));
};

type ErrorUtilsDispatchType = Dispatch<setErrorTextType | setRequestStatusType>;
