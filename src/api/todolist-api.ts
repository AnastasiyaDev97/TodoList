import { instance } from "./apiConfig";
import {
  AuthUserDataType,
  loginParamsType,
  ResponseT,
  TodolistResponseType,
} from "./types";
import { URL_String } from "enums/index";
const { Todolists, Login, Me } = URL_String;

export const todolistAPI = {
  async GetTodolists() {
    const res = await instance.get<Array<TodolistResponseType>>(Todolists);
    return res.data;
  },

  async CreateTodolist(
    title: string
  ): Promise<ResponseT<{ item: TodolistResponseType }>> {
    const res = await instance.post<ResponseT<{ item: TodolistResponseType }>>(
      Todolists,
      { title }
    );
    return res.data;
  },

  async DeleteTodolist(todolistId: string) {
    const res = await instance.delete<ResponseT>(`${Todolists}/${todolistId}`);
    return res.data;
  },

  async UpdateTodolistTitle(todolistId: string, title: string) {
    const res = await instance.put<ResponseT>(`${Todolists}/${todolistId}`, {
      title,
    });
    return res.data;
  },
};

export const authAPI = {
  async login(loginParams: loginParamsType) {
    let { email, password, rememberMe, captcha } = loginParams;
    const res = await instance.post<ResponseT<{ userId: number }>>(Login, {
      email,
      password,
      rememberMe,
      captcha,
    });
    return res.data;
  },

  async logout() {
    const res = await instance.delete<ResponseT>(Login);
    return res.data;
  },

  async getAuthData() {
    const res = await instance.get<ResponseT<AuthUserDataType>>(Me);
    return res.data;
  },
};
