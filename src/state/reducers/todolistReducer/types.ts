import { TodolistResponseType } from "../../../api/types";
import { RequestStatusType, FilterValue } from "../../../enum";
import { setTodolistProgressStatus } from "./todolist-reducer";

export type todolistsDomainType = TodolistResponseType & {
  filter: FilterValue;
  entityStatus: RequestStatusType;
};

export type todolistStateType = Array<todolistsDomainType>;

export type setTodolistStatusType = ReturnType<
  typeof setTodolistProgressStatus
>;
