import {
  addTodolistAC,
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  removeTodolistAC,
  setTodolistsAC,
} from "./todolistReducer/todolist-reducer";

import { setTodolistStatusType } from "./todolistReducer/types";
import { setErrorText, setRequestStatus } from "./app-reducer";
import {
  addTaskAC,
  removeTaskAC,
  setTasksAC,
  updateTaskAC,
} from "./taskReducer/tasks-reducer";

export type setErrorTextType = ReturnType<typeof setErrorText>;
export type setRequestStatusType = ReturnType<typeof setRequestStatus>;

export type AppActionType =
  | ReturnType<typeof removeTaskAC>
  | ReturnType<typeof addTaskAC>
  | ReturnType<typeof addTodolistAC>
  | ReturnType<typeof removeTodolistAC>
  | ReturnType<typeof setTodolistsAC>
  | ReturnType<typeof setTasksAC>
  | ReturnType<typeof updateTaskAC>
  | ReturnType<typeof addTodolistAC>
  | ReturnType<typeof changeTodolistTitleAC>
  | ReturnType<typeof changeTodolistFilterAC>
  | ReturnType<typeof setTodolistsAC>
  | setTodolistStatusType
  | setRequestStatusType;
