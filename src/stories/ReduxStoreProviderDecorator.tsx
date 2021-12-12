import {combineReducers, createStore} from "redux";
import React from 'react';
import {tasksReducer} from "../state/reducers/tasks-reducer";

import {Provider} from "react-redux";
import {todolistsReducer} from "../state/reducers/todolist-reducer";
const rootReducerStory=combineReducers({
    tasks:tasksReducer,
    todolists:todolistsReducer
})

/*export const initialStoryState={
    todolists:[
        {id: 'todolistId1', title: 'What to learn', filter: 'all'},
        {id: 'todolistId2', title: 'What to buy', filter: 'all'},
    ],
    tasks:{
        ['todolistId1']: [{taskId: v1(), taskTitle: 'HTML&CSS', isDone: true},
            {taskId: v1(), taskTitle: 'TS', isDone: false},
            {taskId: v1(), taskTitle: 'React', isDone: true}],
        ['todolistId2']: [{taskId: v1(), taskTitle: 'milk', isDone: true},
            {taskId: v1(), taskTitle: 'salt', isDone: false},
            {taskId: v1(), taskTitle: 'apples', isDone: false}],
    }
}*/

export const storeStory=createStore(rootReducerStory/*,initialStoryState as RootReducerType*/)
export type RootReducerType=ReturnType<typeof rootReducerStory>

export const ReduxStoreProviderDecorator=(storyFn:()=>React.ReactNode)=>{
    return <Provider
        store={storeStory}>{storyFn()}
    </Provider>
}