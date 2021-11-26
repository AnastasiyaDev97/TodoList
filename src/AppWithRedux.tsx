import React, {useCallback, useEffect} from 'react';

import {Todolist} from "./Todolist";

import {AppBar, Container, Grid, IconButton, LinearProgress, Paper, Toolbar, Typography} from "@material-ui/core";

import {Menu} from "@material-ui/icons";
import s from './App.module.css'
import {
    addTaskTC,
    deleteTaskTC, tasksType, updateTaskTC
} from "./state/reducers/tasks-reducer";
import {
    addTodoTC,
    changeTodolistFilterAC, filterValuesType,
    removeTodoTC, setTodosTC, todolistsDomainType, updateTodoTitleTC,

} from "./state/reducers/todolist-reducer";
import {useDispatch, useSelector} from "react-redux";
import {RootReducerType} from "./state/store";
import {TaskStatuses} from "./api/tasks-api";


import { RequestStatusType} from "./state/reducers/app-reducer";
import {AddItemForm} from "./components/AddItemForm/AddItemForm";
import ErrorSnackbar from "./components/Snackbar/Snackbar";




function AppWithRedux() {

    useEffect(() => {
        dispatch(setTodosTC())
    }, [])

    console.log('app')
    const tasks = useSelector<RootReducerType, tasksType>(state => state.tasks)
    const todolists = useSelector<RootReducerType, Array<todolistsDomainType>>(state => state.todolists)
    const dispatch = useDispatch()
    const status=useSelector<RootReducerType,RequestStatusType>(state=>state.app.status)



    const deleteTask = useCallback(function (todolistId: string, taskId: string) {
        dispatch(deleteTaskTC(todolistId, taskId))
    }, [dispatch])

    const changeFilter = useCallback(function (filterValue: filterValuesType, todolistId: string) {
        const action = changeTodolistFilterAC(todolistId, filterValue)
        dispatch(action)
    }, [dispatch])

    const addTask = useCallback(function (todolistId: string, taskTitle: string) {
        dispatch(addTaskTC(todolistId, taskTitle))
    }, [dispatch])

    const changeTaskStatus = useCallback(function (taskId: string, status: TaskStatuses, todolistId: string) {
        dispatch(updateTaskTC(todolistId, taskId, {status}))
    }, [dispatch])

    const deleteTodolist = useCallback(function (todolistId: string) {
        dispatch(removeTodoTC(todolistId))
    }, [dispatch])

    const addTodolist = useCallback(function (todolistTitle: string) {
        dispatch(addTodoTC(todolistTitle))
    }, [dispatch])

    const updateTaskTitle = useCallback(function (todolistId: string, taskId: string, title: string) {
        dispatch(updateTaskTC(todolistId, taskId, {title}))
    }, [dispatch])

    const updateTodoTitle = useCallback(function (todolistId: string, newTitle: string) {
        dispatch(updateTodoTitleTC(todolistId, newTitle))
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
            {status === 'loading' &&
            <LinearProgress />
            }
            <Container fixed>
                <Grid container style={{padding: "20px"}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {todolists.map(m => {
                        let tasksForTodolist = tasks[m.id]
                        return (<Grid item key={m.id}>
                                <Paper style={{padding: "10px"}}>
                                    <Todolist key={m.id}
                                              todolistId={m.id}
                                              entityStatus={m.entityStatus}
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
            <ErrorSnackbar />
        </div>
    );
}

export default AppWithRedux;

