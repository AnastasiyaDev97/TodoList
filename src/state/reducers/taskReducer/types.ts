import { Nullable } from "../../../type/Nullable";
import { TaskPriorities, TaskStatuses } from "../../../enum/index";
import { TaskResponseType } from "../../../api/types";

export type updateElemInTaskType = {
  title?: string;
  description?: Nullable<string>;
  status?: TaskStatuses;
  priority?: TaskPriorities;
  startDate?: Nullable<string>;
  deadline?: Nullable<string>;
};

export type tasksType = {
  [key: string]: Array<TaskResponseType>;
};
