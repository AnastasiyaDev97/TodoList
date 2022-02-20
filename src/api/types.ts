import { TaskPriorities, TaskStatuses } from "../enum/index";
import { Nullable } from "../type/Nullable";

export type GetTasksResponseType = {
  items: Array<TaskResponseType>;
  totalCount: number;
  error: null;
};

export type TaskResponseType = {
  id: string;
  title: string;
  description: Nullable<string>;
  todoListId: string;
  order: number;
  status: TaskStatuses;
  priority: TaskPriorities;
  startDate: Nullable<string>;
  deadline: Nullable<string>;
  addedDate: Nullable<string>;
};
export type updateTaskType = {
  title: string;
  description: Nullable<string>;
  status: TaskStatuses;
  priority: TaskPriorities;
  startDate: Nullable<string>;
  deadline: Nullable<string>;
};

export type TodolistResponseType = {
  id: string;
  title: string;
  addedDate: string;
  order: number;
};

export type ResponseT<D = {}> = {
  resultCode: number;
  messages: Array<string>;
  fieldsErrors: Array<string>;
  data: D;
};
export type AuthUserDataType = {
  id: number;
  login: string;
  email: string;
};

export type loginParamsType = {
  email: string;
  password: string;
  rememberMe?: boolean;
  captcha?: string;
};
