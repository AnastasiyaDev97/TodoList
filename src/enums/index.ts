export enum TaskPriorities {
  Low = 0,
  Middle = 1,
  Hi = 2,
  Urgently = 3,
  Later = 4,
}

export enum TaskStatuses {
  New = 0,
  InProgress = 1,
  Completed = 2,
  Draft = 3,
}

export enum URL_String {
  Todolists = "todo-lists",
  Tasks = "tasks",
  Login = "auth/login",
  Me = "auth/me",
}

export enum Path {
  START = "/",
  LOGIN_PATH = "/login",
  NOT_FOUND = "/404",
  ANY = "*",
}

export enum FilterValue {
  All = "all",
  CompletedFilter = "completed",
  Active = "active",
}

export enum RequestStatusType {
  Idle = "idle",
  Loading = "loading",
  Succeeded = "succeeded",
  Failed = "failed",
}

export enum ResultCodes {
  success = 0,
  error = 1,
  captcha = 10,
}
