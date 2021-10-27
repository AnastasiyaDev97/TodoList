import {combineReducers, createStore} from "redux";
import {tasksReducer} from "./reducers/tasks-reducer";
import todolistsReducer from "./reducers/todolist-reducer";

export const rootReducer=combineReducers({
    tasks:tasksReducer,
    todolists:todolistsReducer
})
export const store=createStore(rootReducer)
export type RootReducerType=ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store;