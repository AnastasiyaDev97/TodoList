import React, {useCallback, useEffect} from "react";
import s from './Todolist.module.css'

import {EditableSpan} from "./components/EditableSpan/EditableSpan";
import {Button, IconButton} from '@material-ui/core';
import {Delete} from '@material-ui/icons';
import {Task} from "./components/Task/Task";
import {filterValuesType} from "./state/reducers/todolist-reducer";
import {TaskResponseType, TaskStatuses} from "./api/tasks-api";
import {AddItemForm} from "./components/AddItemForm/AddItemForm";
import {RequestStatusType} from "./state/reducers/app-reducer";


type TodolistPropsType = {
    todolistTitle: string
    tasks: Array<TaskResponseType>
    deleteTask: (todolistId: string, taskId: string) => any
    changeTodolistFilter: (filterValue: filterValuesType, todolistId: string) => void
    addTask: (todolistId: string, taskTitle: string) => any
    changeTaskStatus: (taskId: string, status: TaskStatuses, todolistId: string) => any
    filter: filterValuesType
    todolistId: string
    deleteTodolist: (todolistId: string) => any
    updateTaskTitle: (todolistId: string, taskId: string, title: string) => any
    updateTodoTitle: (todolistId: string, newTitle: string) => any
    entityStatus: RequestStatusType
}

export const Todolist = React.memo((props: TodolistPropsType) => {

    console.log('todo')
    const changeAllFilterHandler = useCallback(() => {
        props.changeTodolistFilter('all', props.todolistId)
    }, [props.changeTodolistFilter, props.todolistId])

    const changeCompletedFilterHandler = useCallback(() => {
        props.changeTodolistFilter('completed', props.todolistId)
    }, [props.changeTodolistFilter, props.todolistId])

    const changeActiveFilterHandler = useCallback(() => {
        props.changeTodolistFilter('active', props.todolistId)
    }, [props.changeTodolistFilter, props.todolistId])

    const deleteTodoHandler = useCallback(() => {
        props.deleteTodolist(props.todolistId)
    }, [props.deleteTodolist, props.todolistId])

    const addTaskHandler = useCallback((taskTitle: string) => {
        props.addTask(props.todolistId, taskTitle)
    }, [props.addTask, props.todolistId])

    const updateTodoTitleHandler = useCallback((newTitle: string) => {
        props.updateTodoTitle(props.todolistId, newTitle)
    }, [props.updateTodoTitle, props.todolistId])

    let filteredTasks = props.tasks
    if (props.filter === 'completed') {
        filteredTasks = props.tasks.filter(f => f.status === TaskStatuses.Completed)
    }
    if (props.filter === 'active') {
        filteredTasks = props.tasks.filter(f => f.status === TaskStatuses.New)
    }

    return (
        <div>
            <h3><EditableSpan title={props.todolistTitle} updateTitle={updateTodoTitleHandler}/>
                <IconButton aria-label="delete" size="small" onClick={deleteTodoHandler}
                            disabled={props.entityStatus === 'loading'}>
                    <Delete fontSize="small"/>
                </IconButton>

            </h3>
            <AddItemForm addItem={addTaskHandler}/>
            <ul>
                {filteredTasks.map(m => {
                    return <Task deleteTask={props.deleteTask} changeTaskStatus={props.changeTaskStatus}
                                 updateTaskTitle={props.updateTaskTitle}
                                 key={m.id} taskId={m.id} todolistId={props.todolistId} status={m.status}
                                 taskTitle={m.title}/>
                })}
            </ul>
            <div>
                <Button variant="text" size="small"
                        color="primary" onClick={changeAllFilterHandler}
                        className={s.btn}
                >all</Button>
                <Button variant="text" size="small"
                        color="primary" onClick={changeCompletedFilterHandler}
                        className={s.btn}
                >completed</Button>
                <Button variant="text" size="small"
                        color="primary" onClick={changeActiveFilterHandler}
                        className={s.btn}
                >active</Button>
            </div>
        </div>
    )
})



