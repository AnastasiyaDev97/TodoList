import React, {useState} from 'react';

import {Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./components/AddItemForm/AddItemForm";
import {AppBar, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import s from './App.module.css'

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
            {taskId: v1(), taskTitle: 'apples', isDone: false}],
    })

    const deleteTask = (todolistId: string, taskId: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(f => f.taskId !== taskId)})
    }

    const changeFilter = (filterValue: filterValuesType, todolistId: string) => {
        setTodolists(todolists.map(f => f.todolistId === todolistId ? {...f, filter: filterValue} : f))
    }

    const addTask = (todolistId: string, taskTitle: string) => {
        let currTasks = [{taskId: v1(), taskTitle: taskTitle, isDone: false}, ...tasks[todolistId]]
        setTasks({...tasks, [todolistId]: currTasks})

    }
    const changeTaskStatus = (todolistId: string, taskId: string) => {
        setTasks({
            ...tasks,
            [todolistId]: tasks[todolistId].map(m => m.taskId === taskId ? {...m, isDone: !m.isDone} : m)
        })
    }

    const deleteTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(f => f.todolistId !== todolistId))
        delete tasks[todolistId]
        setTasks({...tasks})
    }
    const addTodolist = (todolistTitle: string) => {
        let newTodolistId = v1()
        setTodolists([{todolistId: newTodolistId, title: todolistTitle, filter: 'all'}, ...todolists])
        tasks[newTodolistId] = []
        setTasks({...tasks})
    }
    const updateTaskTitle = (todolistsId: string, taskId: string, newTitle: string) => {
        setTasks({
            ...tasks,
            [todolistsId]: tasks[todolistsId].map(m => m.taskId === taskId ? {...m, taskTitle: newTitle} : m)
        })
    }
    const updateTodoTitle = (todolistsId: string, newTitle: string) => {
        setTodolists(todolists.map(m => m.todolistId === todolistsId ? {...m, title: newTitle} : m))
    }
    console.log(tasks)
    return (
        <div>
            <AppBar position="static" style={{background: "SkyBlue"}} className={s.appbar}>
                <Toolbar variant="dense">
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        Todolist
                    </Typography>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "20px"}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>

                    {todolists.map(m => {
                        let filteredTasks = m.filter === 'completed' ? tasks[m.todolistId].filter(f => f.isDone) :
                            m.filter === 'active' ? tasks[m.todolistId].filter(f => !f.isDone)
                                : tasks[m.todolistId]

                        const changeTodolistFilter = (filterValue: filterValuesType) => {
                            changeFilter(filterValue, m.todolistId)
                        }

                        return (<Grid item>
                                <Paper style={{padding: "10px"}}>
                                    <Todolist key={m.todolistId}
                                              todolistId={m.todolistId}
                                              todolistTitle={m.title} tasks={filteredTasks} deleteTask={deleteTask}
                                              changeTodolistFilter={changeTodolistFilter} addTask={addTask}
                                              changeTaskStatus={changeTaskStatus}
                                              filter={m.filter}
                                              deleteTodolist={deleteTodolist}
                                              updateTaskTitle={updateTaskTitle}
                                              updateTodoTitle={(newTitle) => {
                                                  updateTodoTitle(m.todolistId, newTitle)
                                              }}/>
                                </Paper>
                            </Grid>
                        )
                    })}
                </Grid>
            </Container>
        </div>
    );
}

export default App;

