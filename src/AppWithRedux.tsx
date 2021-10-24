import React from 'react';

import {Todolist} from "./Todolist";
import {AddItemForm} from "./components/AddItemForm/AddItemForm";
import {AppBar, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import s from './App.module.css'
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
} from "./state/reducers/tasks-reducer";
import  {
    addTodolistAC,
    changeTodolistFilterAC, changeTodolistTitleAC,
    removeTodolistAC,

} from "./state/reducers/todolist-reducer";
import {useDispatch, useSelector} from "react-redux";
import {RootReducerType} from "./state/store";

export type taskType = {
    taskId: string
    taskTitle: string
    isDone: boolean
}
export type tasksType = {
    [key: string]: Array<taskType>
}
export type filterValuesType = "all" | "completed" | "active"
export type todolistsType = {
    todolistId: string
    title: string
    filter: filterValuesType
}

function AppWithRedux() {

    const tasks = useSelector<RootReducerType, tasksType>(state => state.tasks)
    const todolists = useSelector<RootReducerType, Array<todolistsType>>(state => state.todolists)
    const dispatch = useDispatch()


    const deleteTask = (todolistId: string, taskId: string) => {
        dispatch(removeTaskAC(taskId, todolistId))
    }

    const changeFilter = (filterValue: filterValuesType, todolistId: string) => {
        dispatch(changeTodolistFilterAC(todolistId, filterValue))
    }

    const addTask = (todolistId: string, taskTitle: string) => {
        dispatch(addTaskAC(taskTitle, todolistId))
    }

    const changeTaskStatus = (taskId: string, isDone: boolean, todolistId: string) => {
        dispatch(changeTaskStatusAC(taskId, isDone, todolistId))
    }

    const deleteTodolist = (todolistId: string) => {
        let action = removeTodolistAC(todolistId)
        dispatch(action)
    }

    const addTodolist = (todolistTitle: string) => {
        let action = addTodolistAC(todolistTitle)
        dispatch(action)
    }

    const updateTaskTitle = (todolistId: string, taskId: string, newTitle: string) => {
        dispatch(changeTaskTitleAC(taskId, newTitle, todolistId))
    }

    const updateTodoTitle = (todolistId: string, newTitle: string) => {
        dispatch(changeTodolistTitleAC(todolistId, newTitle))
    }

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
                <Grid container spacing={3} >

                    {todolists.map(m => {
                        let filteredTasks = m.filter === 'completed' ? tasks[m.todolistId].filter(f => f.isDone) :
                            m.filter === 'active' ? tasks[m.todolistId].filter(f => !f.isDone)
                                : tasks[m.todolistId]

                        const changeTodolistFilter = (filterValue: filterValuesType) => {
                            changeFilter(filterValue, m.todolistId)
                        }

                        return (<Grid item key={m.todolistId}>
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

export default AppWithRedux;

