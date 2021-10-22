import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";

export type taskType = {
    taskId: string
    taskTitle: string
    isDone: boolean
}
export type tasksType = {
    [key: string]: Array<taskType>
}
export type filterValuesType = 'all' | 'completed' | 'active'
export type todolistsType = {
    todolistId: string
    title: string
    filter: filterValuesType
}

function App() {
    let todolistId1 = v1()
    let todolistId2 = v1()

    let [todolists, setTodolists] = useState<Array<todolistsType>>([
        {todolistId: todolistId1, title: 'What to learn', filter: 'all'},
        {todolistId: todolistId2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState<tasksType>({
        [todolistId1]: [{taskId: v1(), taskTitle: 'HTML&CSS', isDone: true},
            {taskId: v1(), taskTitle: 'TS', isDone: false},
            {taskId: v1(), taskTitle: 'React', isDone: true}],
        [todolistId2]: [{taskId: v1(), taskTitle: 'milk', isDone: true},
            {taskId: v1(), taskTitle: 'salt', isDone: false},
            {taskId: v1(), taskTitle: 'apples', isDone: true}],
    })

    const deleteTask = (todolistId: string, taskId: string) => {
        let currentTask = tasks[todolistId].filter(f => f.taskId !== taskId)
        setTasks({...tasks, [todolistId]: currentTask})

    }


    const changeFilter = (filterValue: filterValuesType, todolistId: string) => {
        setTodolists(todolists.map(f => f.todolistId === todolistId ? {...f, filter: filterValue} : f))
    }


    const addTask = (todolistId: string, taskTitle: string) => {
        let newTask = {taskId: v1(), taskTitle: taskTitle, isDone: false}
        let currTasks = [newTask, ...tasks[todolistId]]
        setTasks({...tasks, [todolistId]: currTasks})

    }
    const changeTaskStatus = (todolistId: string, taskId: string) => {
        let currentTask = tasks[todolistId].map(m => m.taskId === taskId ? {...m, isDone: !m.isDone} : m)
        setTasks({...tasks, [todolistId]: currentTask})
    }

    const deleteTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(f => f.todolistId !== todolistId))
        delete tasks[todolistId]
        setTasks({...tasks})
    }
    return (
        <div className="App">
            {todolists.map(m => {
                let filteredTasks = m.filter === 'completed' ? tasks[m.todolistId].filter(f => f.isDone) :
                    m.filter === 'active' ? tasks[m.todolistId].filter(f => !f.isDone)
                        : tasks[m.todolistId]

                const changeTodolistFilter = (filterValue: filterValuesType) => {
                    changeFilter(filterValue, m.todolistId)
                }

                return (
                    <Todolist key={m.todolistId}
                              todolistId={m.todolistId}
                              title={m.title} tasks={filteredTasks} deleteTask={deleteTask}
                              changeTodolistFilter={changeTodolistFilter} addTask={addTask}
                              changeTaskStatus={changeTaskStatus}
                              filter={m.filter}
                              deleteTodolist={deleteTodolist}/>
                )
            })}

        </div>
    );
}

export default App;

