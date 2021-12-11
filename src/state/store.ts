import { combineReducers} from "redux";
import {tasksReducer} from "./reducers/tasks-reducer";
import todolistsReducer from "./reducers/todolist-reducer";
import thunk from 'redux-thunk';
import {appReducer} from "./reducers/app-reducer";
import {authReducer} from "./reducers/auth-reducer";
import {configureStore} from "@reduxjs/toolkit";

export const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer,
    auth: authReducer,
});
export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .prepend(thunk)
})
/*export let store = createStore(rootReducer, applyMiddleware(thunk));*/
export type RootReducerType = ReturnType<typeof rootReducer>;

