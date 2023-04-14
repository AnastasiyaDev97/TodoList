import { instance } from "./apiConfig";
import {
  GetTasksResponseType,
  ResponseT,
  TaskResponseType,
  updateTaskType,
} from "./types";
import { URL_String } from "enums/index";
const { Todolists, Tasks } = URL_String;

export const tasksAPI = {
  async GetTasks(todolistId: string) {
    const res = await instance.get<GetTasksResponseType>(
      `${Todolists}/${todolistId}/${Tasks}`
    );
    return res.data;
  },
  async CreateTask(todolistId: string, title: string) {
    const res = await instance.post<ResponseT<{ item: TaskResponseType }>>(
      `${Todolists}/${todolistId}/${Tasks}`,
      { title }
    );
    return res.data;
  },
  async DeleteTask(todolistId: string, taskId: string) {
    const res = await instance.delete<ResponseT>(
      `${Todolists}/${todolistId}/${Tasks}/${taskId}`
    );
    return res.data;
  },

  async UpdateTask(
    todolistId: string,
    taskId: string,
    updateTask: updateTaskType
  ) {
    let { title, description, status, priority, startDate, deadline } =
      updateTask;
    const res = await instance.put<ResponseT<{ item: TaskResponseType }>>(
      `${Todolists}/${todolistId}/${Tasks}/${taskId}`,
      {
        title,
        description,
        status,
        priority,
        startDate,
        deadline,
      }
    );
    return res.data;
  },
};
