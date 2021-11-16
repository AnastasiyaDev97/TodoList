import {applyMiddleware, combineReducers, createStore} from "redux";
import {tasksReducer} from "./reducers/tasks-reducer";
import todolistsReducer from "./reducers/todolist-reducer";
import thunk from 'redux-thunk';

export const rootReducer=combineReducers({
    tasks:tasksReducer,
    todolists:todolistsReducer
});
export let store=createStore(rootReducer, applyMiddleware(thunk));
export type RootReducerType=ReturnType<typeof rootReducer>;