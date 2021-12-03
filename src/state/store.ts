import {applyMiddleware, combineReducers, createStore} from "redux";
import { tasksReducer} from "./reducers/tasks-reducer";
import todolistsReducer from "./reducers/todolist-reducer";
import thunk from 'redux-thunk';
import {appReducer} from "./reducers/app-reducer";
import {authReducer} from "./reducers/auth-reducer";

export const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer,
    auth:authReducer,
});
export let store = createStore(rootReducer, applyMiddleware(thunk));
export type RootReducerType = ReturnType<typeof rootReducer>;

