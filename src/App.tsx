import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";

export type tasksType = {
    taskId: string
    taskTitle: string
    isDone: boolean
}
export type filterValuesType = 'all' | 'completed' | 'active'

function App() {
    let [filter, setFilter] = useState<filterValuesType>('all')
    let [tasks, setTasks] = useState<Array<tasksType>>([
        {taskId: v1(), taskTitle: 'HTML&CSS', isDone: true},
        {taskId: v1(), taskTitle: 'TS', isDone: false},
        {taskId: v1(), taskTitle: 'React', isDone: true},
    ])

    const deleteTask = (taskId: string) => {
        setTasks(tasks.filter(f => f.taskId !== taskId))
    }

    let filteredTasks = filter === 'completed' ? tasks.filter(f => f.isDone)
        : filter === 'active' ? tasks.filter(f => !f.isDone)
            : tasks

    const changeFilter = (filterValue: filterValuesType) => {
        setFilter(filterValue)
    }

    const addTask = (taskTitle: string) => {
        setTasks([{taskId: v1(), taskTitle: taskTitle, isDone: false}, ...tasks])
    }
    const changeTaskStatus = (taskId: string) => {
        setTasks(tasks.map(m => m.taskId === taskId ? {...m, isDone: !m.isDone} : m))
    }
    return (
        <div className="App">
            <Todolist title={'What to learn'} tasks={filteredTasks} deleteTask={deleteTask}
                      changeFilter={changeFilter} addTask={addTask}
                      changeTaskStatus={changeTaskStatus}
                      filter={filter}/>
        </div>
    );
}

export default App;

