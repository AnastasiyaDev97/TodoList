import React, {useCallback} from 'react';

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
import {
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
    console.log('app')
    const tasks = useSelector<RootReducerType, tasksType>(state => state.tasks)
    const todolists = useSelector<RootReducerType, Array<todolistsType>>(state => state.todolists)
    const dispatch = useDispatch()


    const deleteTask = useCallback(function (todolistId: string, taskId: string) {
        const action = removeTaskAC(taskId, todolistId);
        dispatch(action)
    }, [dispatch])

    const changeFilter = useCallback(function (filterValue: filterValuesType, todolistId: string) {
        const action = changeTodolistFilterAC(todolistId, filterValue)
        dispatch(action)
    }, [dispatch])

    const addTask = useCallback(function (todolistId: string, taskTitle: string) {
        const action = addTaskAC(taskTitle, todolistId)
        dispatch(action)
    }, [dispatch])

    const changeTaskStatus = useCallback(function (taskId: string, isDone: boolean, todolistId: string) {
        const action = changeTaskStatusAC(taskId, isDone, todolistId)
        dispatch(action)
    }, [dispatch])

    const deleteTodolist = useCallback(function (todolistId: string) {
        let action = removeTodolistAC(todolistId)
        dispatch(action)
    }, [dispatch])

    const addTodolist = useCallback(function (todolistTitle: string) {
        let action = addTodolistAC(todolistTitle)
        dispatch(action)
    }, [dispatch])

    const updateTaskTitle = useCallback(function (todolistId: string, taskId: string, newTitle: string) {
        const action = changeTaskTitleAC(taskId, newTitle, todolistId)
        dispatch(action)
    }, [dispatch])

    const updateTodoTitle = useCallback(function (todolistId: string, newTitle: string) {
        const action = changeTodolistTitleAC(todolistId, newTitle)
        dispatch(action)
    }, [dispatch])

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
                        let tasksForTodolist = tasks[m.todolistId]

                        return (<Grid item key={m.todolistId}>
                                <Paper style={{padding: "10px"}}>
                                    <Todolist key={m.todolistId}
                                              todolistId={m.todolistId}
                                              todolistTitle={m.title} tasks={tasksForTodolist} deleteTask={deleteTask}
                                              changeTodolistFilter={changeFilter} addTask={addTask}
                                              changeTaskStatus={changeTaskStatus}
                                              filter={m.filter}
                                              deleteTodolist={deleteTodolist}
                                              updateTaskTitle={updateTaskTitle}
                                              updateTodoTitle={updateTodoTitle}/>
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

