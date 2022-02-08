import React, {useCallback, useEffect} from 'react';
import {Todolist} from "./Todolist";
import {
    AppBar, Button,
    CircularProgress,
    Container,
    Grid,
    IconButton,
    LinearProgress,
    Paper,
    Toolbar,
    Typography
} from "@material-ui/core";
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
import {RequestStatusType} from "./state/reducers/app-reducer";
import {AddItemForm} from "./components/AddItemForm/AddItemForm";
import ErrorSnackbar from "./components/Snackbar/Snackbar";
import {Login} from "./components/Login/Login";
import {Navigate, Route, Routes} from "react-router-dom";
import {authUserTC, logoutTC} from "./state/reducers/auth-reducer";


function AppWithRedux() {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(authUserTC())
    }, [])

    const status = useSelector<RootReducerType, RequestStatusType>(state => state.app.status)
    const isInitialize = useSelector<RootReducerType, boolean>(state => state.app.isInitialize)
    const isLoggedIn = useSelector<RootReducerType, boolean>(state => state.auth.isLoggedIn)

    const logoutHandler = useCallback(function () {
        dispatch(logoutTC())
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
                {isLoggedIn && <Button onClick={logoutHandler}  color={'inherit'} style={{float:'right'}}>log out</Button>}
            </Toolbar>
        </AppBar>
        {status === 'loading' && <LinearProgress/>}
        {!isInitialize ? <div
                style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
                <CircularProgress/>
            </div>
            :
            <Container fixed>
                <Routes>
                    <Route path={'/'} element={<TodolistList/>}/>
                    <Route path={'/login'} element={<Login/>}/>
                    <Route path={'*'} element={<Navigate to={'/404'}/>}/> //красивый url
                    <Route path={'/404'} element={<h1>404: Page not found</h1>}/>
                </Routes>
            </Container>}
        <ErrorSnackbar/>
    </div>
)
}

export default AppWithRedux;

export const TodolistList = () => {

    const isLoggedIn = useSelector<RootReducerType, boolean>(state => state.auth.isLoggedIn)
    const todolists = useSelector<RootReducerType, Array<todolistsDomainType>>(state => state.todolists)
    const tasks = useSelector<RootReducerType, tasksType>(state => state.tasks)
    const dispatch = useDispatch()

    useEffect(() => {

        if (!isLoggedIn) {
            return
        }
        dispatch(setTodosTC())
    }, [])
    const deleteTask = useCallback(function (todolistId: string, taskId: string) {
        dispatch(deleteTaskTC(todolistId, taskId))
    }, [dispatch])

    const changeFilter = useCallback(function (filterValue: filterValuesType, todolistId: string) {
        const action = changeTodolistFilterAC({id:todolistId, newFilter:filterValue})
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

    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>
    }
    return (
        <>
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
                                          todolistTitle={m.title}
                                          tasks={tasksForTodolist}
                                          deleteTask={deleteTask}
                                          changeTodolistFilter={changeFilter}
                                          addTask={addTask}
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
        </>
    )
}