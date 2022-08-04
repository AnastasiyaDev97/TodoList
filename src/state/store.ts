import { combineReducers, applyMiddleware } from 'redux';

import { tasksReducer } from './reducers/taskReducer/tasks-reducer';

import thunk, { ThunkAction } from 'redux-thunk';
import { appReducer } from './reducers/app-reducer';
import { authReducer } from './reducers/auth-reducer';
import { configureStore } from '@reduxjs/toolkit';
import { todolistsReducer } from './reducers/todolistReducer/todolist-reducer';
import { AppActionType } from './reducers/types';

export type ThunkType = ThunkAction<
  void,
  RootReducerType,
  unknown,
  AppActionType
>;

export const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolists: todolistsReducer,
  app: appReducer,
  auth: authReducer,
});
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(thunk),
});
/*export let store = createStore(rootReducer, applyMiddleware(thunk));*/
export type RootReducerType = ReturnType<typeof rootReducer>;
