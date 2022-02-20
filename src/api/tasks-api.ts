import { instance } from "./apiCongig";
import {
  GetTasksResponseType,
  ResponseT,
  TaskResponseType,
  updateTaskType,
} from "./types";
import { URL_String } from "./../enum/index";
const { Todolists, Tasks } = URL_String;

export const tasksAPI = {
  GetTasks(todolistId: string) {
    return instance
      .get<GetTasksResponseType>(`${Todolists}/${todolistId}/${Tasks}`)
      .then((res) => {
        return res.data;
      });
  },
  CreateTask(todolistId: string, title: string) {
    return instance
      .post<ResponseT<{ item: TaskResponseType }>>(
        `${Todolists}/${todolistId}/${Tasks}`,
        { title }
      )
      .then((res) => {
        return res.data;
      });
  },
  DeleteTask(todolistId: string, taskId: string) {
    return instance
      .delete<ResponseT>(`${Todolists}/${todolistId}/${Tasks}/${taskId}`)
      .then((res) => {
        return res.data;
      });
  },

  UpdateTask(todolistId: string, taskId: string, updateTask: updateTaskType) {
    let { title, description, status, priority, startDate, deadline } =
      updateTask;
    return instance
      .put<ResponseT<{ item: TaskResponseType }>>(
        `${Todolists}/${todolistId}/${Tasks}/${taskId}`,
        {
          title,
          description,
          status,
          priority,
          startDate,
          deadline,
        }
      )
      .then((res) => {
        return res.data;
      });
  },
};
