import { catchErrorHandler, errorHandler } from "utils/error-utils";
import { RequestStatusType, ResultCodes } from "enums";
import { Dispatch } from "redux";
import { todolistAPI } from "api/todolist-api";
import { setRequestStatus } from "../app-reducer";
import {
  addTodolistAC,
  changeTodolistTitleAC,
  removeTodolistAC,
  setTodolistProgressStatus,
  setTodolistsAC,
} from "./todolist-reducer";
import { getTasksTC } from "../taskReducer/thunk";
import { ThunkType } from "state/store";

const { Loading, Succeeded, Failed } = RequestStatusType;
const { success } = ResultCodes;

export const setTodosTC = (): ThunkType => async (dispatch) => {
  try {
    dispatch(setRequestStatus({ status: Loading }));
    let data = await todolistAPI.GetTodolists();
    dispatch(setTodolistsAC({ todolists: data }));
    dispatch(setRequestStatus({ status: Succeeded }));
    data.forEach((todo) => dispatch(getTasksTC(todo.id)));
  } catch (err) {
    catchErrorHandler(dispatch, err);
  }
};

export const removeTodoTC =
  (todolistId: string) => async (dispatch: Dispatch) => {
    try {
      dispatch(setRequestStatus({ status: Loading }));
      dispatch(
        setTodolistProgressStatus({ entityStatus: Loading, todolistId })
      );
      let data = await todolistAPI.DeleteTodolist(todolistId);
      if (data.resultCode === success) {
        dispatch(removeTodolistAC({ id: todolistId }));
        dispatch(
          setTodolistProgressStatus({ entityStatus: Succeeded, todolistId })
        );
        dispatch(setRequestStatus({ status: Succeeded }));
      } else {
        errorHandler(dispatch, data);
        dispatch(
          setTodolistProgressStatus({ entityStatus: Failed, todolistId })
        );
      }
    } catch (err) {
      catchErrorHandler(dispatch, err);
    }
  };

export const addTodoTC = (title: string) => async (dispatch: Dispatch) => {
  try {
    dispatch(setRequestStatus({ status: Loading }));
    let data = await todolistAPI.CreateTodolist(title);
    if (data.resultCode === success) {
      dispatch(addTodolistAC({ todolist: data.data.item }));
      dispatch(setRequestStatus({ status: Succeeded }));
    } else {
      errorHandler(dispatch, data);
    }
  } catch (err) {
    catchErrorHandler(dispatch, err);
  }
};

export const updateTodoTitleTC =
  (todolistId: string, title: string) => async (dispatch: Dispatch) => {
    try {
      dispatch(setRequestStatus({ status: Loading }));
      const data = await todolistAPI.UpdateTodolistTitle(todolistId, title);

      if (data.resultCode === success) {
        dispatch(changeTodolistTitleAC({ id: todolistId, title }));
        dispatch(setRequestStatus({ status: Succeeded }));
      } else {
        errorHandler(dispatch, data);
      }
    } catch (err) {
      catchErrorHandler(dispatch, err);
    }
  };
