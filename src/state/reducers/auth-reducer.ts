import { Dispatch } from "redux";
import { setRequestStatus, toggleIsInitialize } from "./app-reducer";
import { authAPI } from "../../api/todolist-api";
import { catchErrorHandler, errorHandler } from "../../utils/error-utils";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Nullable } from "../../type/Nullable";
import { RequestStatusType, ResultCodes } from "../../enum/index";
import { AuthUserDataType, loginParamsType } from "../../api/types";

const { Loading, Succeeded } = RequestStatusType;
const { success } = ResultCodes;

const initialState = {
  isLoggedIn: false,
  data: {
    id: null as Nullable<number>,
    login: null as Nullable<string>,
    email: null as Nullable<string>,
  },
};

const slice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setIsLoggedInAC(state, action: PayloadAction<{ value: boolean }>) {
      state.isLoggedIn = action.payload.value;
    },
    setAuthUserData(state, action: PayloadAction<{ data: AuthUserDataType }>) {
      state.data = action.payload.data;
    },
  },
});

export const { setIsLoggedInAC, setAuthUserData } = slice.actions;
export const authReducer = slice.reducer;

export const loginTC =
  (data: loginParamsType) => async (dispatch: Dispatch) => {
    try {
      dispatch(setRequestStatus({ status: Loading }));
      let dataResponse = await authAPI.login(data);
      if (dataResponse.resultCode === success) {
        dispatch(setIsLoggedInAC({ value: true }));
        dispatch(setRequestStatus({ status: Succeeded }));
      } else {
        errorHandler(dispatch, dataResponse);
      }
    } catch (err) {
      catchErrorHandler(dispatch, err);
    }
  };

export const logoutTC = () => async (dispatch: Dispatch) => {
  try {
    dispatch(setRequestStatus({ status: Loading }));
    let data = await authAPI.logout();
    if (data.resultCode === success) {
      dispatch(setIsLoggedInAC({ value: false }));
      dispatch(setRequestStatus({ status: Succeeded }));
    } else {
      errorHandler(dispatch, data);
    }
  } catch (err) {
    catchErrorHandler(dispatch, err);
  }
};

export const authUserTC = () => async (dispatch: Dispatch) => {
  try {
    dispatch(setRequestStatus({ status: Loading }));
    let data = await authAPI.getAuthData();
    if (data.resultCode === success) {
      dispatch(setIsLoggedInAC({ value: true }));
    }
  } catch (err) {
    catchErrorHandler(dispatch, err);
  } finally {
    dispatch(toggleIsInitialize({ value: true }));
    dispatch(setRequestStatus({ status: Succeeded }));
  }
};
