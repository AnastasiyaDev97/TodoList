import React, {useReducer} from 'react';

import {Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./components/AddItemForm/AddItemForm";
import {AppBar, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import s from './App.module.css'
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    tasksReducer
} from "./state/reducers/tasks-reducer";
import  {
    addTodolistAC,
    changeTodolistFilterAC, changeTodolistTitleAC,
    removeTodolistAC,

} from "./state/reducers/todolist-reducer";
import todolistsReducer from "./state/reducers/todolist-reducer";

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

function AppWithReducer() {
    let todolistId1 = v1()
    let todolistId2 = v1()

    let [todolists, dispatchToTodolists] = useReducer(todolistsReducer, [
        {todolistId: todolistId1, title: "What to learn", filter: "all"},
        {todolistId: todolistId2, title: "What to buy", filter: "all"}
    ])

    let [tasks, dispatchToTasks] = useReducer(tasksReducer,{
        [todolistId1]: [{taskId: v1(), taskTitle: 'HTML&CSS', isDone: true},
            {taskId: v1(), taskTitle: 'TS', isDone: false},
            {taskId: v1(), taskTitle: 'React', isDone: true}],
        [todolistId2]: [{taskId: v1(), taskTitle: 'milk', isDone: true},
            {taskId: v1(), taskTitle: 'salt', isDone: false},
            {taskId: v1(), taskTitle: 'apples', isDone: false}],
    })

    const deleteTask = (todolistId: string, taskId: string) => {
        dispatchToTasks(removeTaskAC(taskId,todolistId))
    }

    const changeFilter = (filterValue: filterValuesType, todolistId: string) => {
        dispatchToTodolists(changeTodolistFilterAC(todolistId,filterValue))
    }

    const addTask = (todolistId: string, taskTitle: string) => {
        dispatchToTasks(addTaskAC(taskTitle,todolistId))
    }

    const changeTaskStatus = (taskId: string, isDone: boolean, todolistId: string) => {
        dispatchToTasks(changeTaskStatusAC(taskId, isDone,todolistId))
    }

    const deleteTodolist = (todolistId: string) => {
        let action = removeTodolistAC(todolistId)
        dispatchToTodolists(action)
        dispatchToTasks(action)
           }

    const addTodolist = (todolistTitle: string) => {
        let action=addTodolistAC(todolistTitle)
        dispatchToTodolists(action)
        dispatchToTasks(action)
    }

    const updateTaskTitle = (todolistId: string, taskId: string, newTitle: string) => {
        dispatchToTasks(changeTaskTitleAC(taskId,newTitle,todolistId))
    }

    const updateTodoTitle = (todolistId: string, newTitle: string) => {
        dispatchToTodolists(changeTodolistTitleAC(todolistId, newTitle))
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

export default AppWithReducer;

