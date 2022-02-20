import { RequestStatusType, ResultCodes } from "../../../enum/index";
import { tasksAPI } from "../../../api/tasks-api";
import { Dispatch } from "redux";
import { RootReducerType } from "../../store";
import { setRequestStatus } from "../app-reducer";
import { catchErrorHandler, errorHandler } from "../../../utils/error-utils";
import {
  addTaskAC,
  removeTaskAC,
  setTasksAC,
  updateTaskAC,
} from "./tasks-reducer";
import { updateElemInTaskType } from "./types";
import { updateTaskType } from "../../../api/types";

const { Succeeded, Loading } = RequestStatusType;
const { success } = ResultCodes;

export const getTasksTC =
  (todolistId: string) => async (dispatch: Dispatch) => {
    try {
      dispatch(setRequestStatus({ status: Loading }));
      let data = await tasksAPI.GetTasks(todolistId);
      dispatch(setTasksAC({ tasks: data.items, todolistId }));
      dispatch(setRequestStatus({ status: Succeeded }));
    } catch (err) {
      catchErrorHandler(dispatch, err);
    }
  };

export const deleteTaskTC =
  (todolistId: string, taskId: string) => async (dispatch: Dispatch) => {
    try {
      dispatch(setRequestStatus({ status: Loading }));
      let data = await tasksAPI.DeleteTask(todolistId, taskId);
      if (data.resultCode === success) {
        dispatch(removeTaskAC({ taskId, id: todolistId }));
        dispatch(setRequestStatus({ status: Succeeded }));
      } else {
        errorHandler(dispatch, data);
      }
    } catch (err) {
      catchErrorHandler(dispatch, err);
    }
  };

export const addTaskTC =
  (todolistId: string, title: string) => async (dispatch: Dispatch) => {
    try {
      dispatch(setRequestStatus({ status: Loading }));
      let data = await tasksAPI.CreateTask(todolistId, title);
      if (data.resultCode === success) {
        let task = data.data.item;
        dispatch(addTaskAC({ task, id: todolistId }));
        dispatch(setRequestStatus({ status: Succeeded }));
      } else {
        errorHandler(dispatch, data);
      }
    } catch (err) {
      catchErrorHandler(dispatch, err);
    }
  };

export const updateTaskTC =
(
    todolistId: string,
    taskId: string,
    updateElemInTask: updateElemInTaskType
  ) =>
  async (dispatch: Dispatch, getState: () => RootReducerType) => {
    let tasks = getState().tasks;
    let currTask = tasks[todolistId].find(({ id }) => id === taskId);
    try {
      if (currTask) {
        let updateTask: updateTaskType = currTask;
        let updateTaskForAPI = { ...updateTask, ...updateElemInTask };
        dispatch(setRequestStatus({ status: Loading }));
        let data = await tasksAPI.UpdateTask(
          todolistId,
          taskId,
          updateTaskForAPI
        );
        if (data.resultCode === success) {
          let task = data.data.item;
          dispatch(updateTaskAC({ task, taskId }));
          dispatch(setRequestStatus({ status: Succeeded }));
        } else {
          errorHandler(dispatch, data);
        }
      }
    } catch (err) {
      catchErrorHandler(dispatch, err);
    }
  };
