import React from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";
export type tasksType={
    taskId:string
    taskTitle:string
    isDone:boolean
}

function App() {
    let tasks:Array<tasksType>=[
        {taskId:v1(),taskTitle:'HTML&CSS',isDone:true},
        {taskId:v1(),taskTitle:'TS',isDone:false},
        {taskId:v1(),taskTitle:'React',isDone:true},
    ]
    return (
        <div className="App">
          <Todolist title={'What to learn'} tasks={tasks}/>

        </div>
    );
}

export default App;

