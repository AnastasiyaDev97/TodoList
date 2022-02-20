import { instance } from "./apiCongig";
import {
  AuthUserDataType,
  loginParamsType,
  ResponseT,
  TodolistResponseType,
} from "./types";
import { URL_String } from "./../enum/index";
const { Todolists, Login, Me } = URL_String;

export const todolistAPI = {
  GetTodolists() {
    return instance.get<Array<TodolistResponseType>>(Todolists).then((res) => {
      return res.data;
    });
  },
  
  CreateTodolist(title: string) {
    return instance
      .post<ResponseT<{ item: TodolistResponseType }>>(Todolists, { title })
      .then((res) => {
        return res.data;
      });
  },

  DeleteTodolist(todolistId: string) {
    return instance
      .delete<ResponseT>(`${Todolists}/${todolistId}`)
      .then((res) => {
        return res.data;
      });
  },

  UpdateTodolistTitle(todolistId: string, title: string) {
    return instance
      .put<ResponseT>(`${Todolists}/${todolistId}`, { title })
      .then((res) => {
        return res.data;
      });
  },
};

export const authAPI = {
  login(loginParams: loginParamsType) {
    let { email, password, rememberMe, captcha } = loginParams;
    return instance
      .post<ResponseT<{ userId: number }>>(Login, {
        email,
        password,
        rememberMe,
        captcha,
      })
      .then((res) => {
        return res.data;
      });
  },

  logout() {
    return instance.delete<ResponseT>(Login).then((res) => {
      return res.data;
    });
  },

  getAuthData() {
    return instance
      .get<ResponseT<AuthUserDataType>>(Me)
      .then((res) => res.data);
  },
};
