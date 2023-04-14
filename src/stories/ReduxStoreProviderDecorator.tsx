import { combineReducers } from "redux";
import { ReducerType } from "../state/store";
import { FilterValue, RequestStatusType } from "../enums";
import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { v1 } from "uuid";
import { getCurrentDate } from "../utils/handlers";
import { HashRouter } from "react-router-dom";

import { Provider } from "react-redux";
import { todolistsReducer } from "../state/reducers/todolistReducer/todolist-reducer";
import { tasksReducer } from "../state/reducers/taskReducer/tasks-reducer";
import { ReactNode } from "react";
import { authReducer } from "../state/reducers/auth-reducer";
import { appReducer } from "./../state/reducers/app-reducer";

const { All } = FilterValue;
const { Idle, Succeeded } = RequestStatusType;

const rootReducerStory: ReducerType = combineReducers({
  tasks: tasksReducer,
  todolists: todolistsReducer,
  auth: authReducer,
  app: appReducer,
});
let todolistId1 = v1();
let todolistId2 = v1();
export const initialStoryState = {
  todolists: [
    {
      id: todolistId1,
      title: "What to learn",
      filter: All,
      addedDate: getCurrentDate,
      order: 1,
      entityStatus: Idle,
    },
    {
      id: todolistId2,
      title: "What to buy",
      filter: All,
      addedDate: getCurrentDate,
      order: 1,
      entityStatus: Idle,
    },
  ],
  tasks: {
    todolistId1: [
      {
        id: "1",
        title: "CSS",
        description: "",
        todoListId: todolistId1,
        status: 0,
        priority: 1,
        startDate: "",
        deadline: "",
        order: 2,
        addedDate: "",
      },
      {
        id: "2",
        title: "JS",
        description: "",
        todoListId: todolistId1,
        status: 0,
        priority: 1,
        startDate: "",
        deadline: "",
        order: 2,
        addedDate: "",
      },
      {
        id: "3",
        title: "React",
        description: "",
        todoListId: todolistId1,
        status: 0,
        priority: 1,
        startDate: "",
        deadline: "",
        order: 2,
        addedDate: "",
      },
    ],
    todolistId2: [
      {
        id: "1",
        title: "bread",
        description: "",
        todoListId: todolistId2,
        status: 0,
        priority: 1,
        startDate: "",
        deadline: "",
        order: 2,
        addedDate: "",
      },
      {
        id: "2",
        title: "milk",
        description: "",
        todoListId: todolistId2,
        status: 0,
        priority: 1,
        startDate: "",
        deadline: "",
        order: 2,
        addedDate: "",
      },
      {
        id: "3",
        title: "tea",
        description: "",
        todoListId: todolistId2,
        status: 0,
        priority: 1,
        startDate: "",
        deadline: "",
        order: 2,
        addedDate: "",
      },
    ],
  },
  auth: {
    isLoggedIn: true,
    data: {
      id: 3,
      login: "nastya",
      email: "nastyh1233@gmail.com",
    },
  },
  app: { isInitialize: true, error: null, status: Succeeded },
};

export const storeStory = configureStore({
  reducer: rootReducerStory,
  preloadedState: initialStoryState,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunk),
});
export type RootReducerType = ReturnType<typeof rootReducerStory>;

export const ReduxStoreProviderDecorator = (storyFn: () => ReactNode) => {
  return <Provider store={storeStory}>{storyFn()}</Provider>;
};

export const HashRouterDecorator = (Story: any) => (
  <HashRouter>
    <Story />
  </HashRouter>
);
