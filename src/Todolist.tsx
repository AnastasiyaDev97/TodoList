import React, {useCallback} from "react";
import s from './Todolist.module.css'
import {AddItemForm} from "./components/AddItemForm/AddItemForm";
import {EditableSpan} from "./components/EditableSpan/EditableSpan";
import {Button,  IconButton} from '@material-ui/core';
import {Delete} from '@material-ui/icons';
import {Task} from "./components/Task/Task";
import {filterValuesType} from "./state/reducers/todolist-reducer";
import {taskType} from "./state/reducers/tasks-reducer";

type TodolistPropsType = {
    todolistTitle: string
    tasks: Array<taskType>
    deleteTask: (todolistId: string, taskId: string) => void
    changeTodolistFilter: (filterValue: filterValuesType, todolistId: string) => void
    addTask: (todolistId: string, taskTitle: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    filter: filterValuesType
    todolistId: string
    deleteTodolist: (todolistId: string) => void
    updateTaskTitle: (todolistId: string, taskId: string, newTitle: string) => void
    updateTodoTitle: (todolistId: string, newTitle: string) => void
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
        filteredTasks = props.tasks.filter(f => f.isDone)
    }
    if (props.filter === 'active') {
        filteredTasks = props.tasks.filter(f => !f.isDone)
    }

    return (
        <div>
            <h3><EditableSpan title={props.todolistTitle} updateTitle={updateTodoTitleHandler}/>
                <IconButton aria-label="delete" size="small" onClick={deleteTodoHandler}>
                    <Delete fontSize="small"/>
                </IconButton>

            </h3>
            <AddItemForm addItem={addTaskHandler}/>
            <ul>
                {filteredTasks.map(m => {
                    return <Task deleteTask={props.deleteTask} changeTaskStatus={props.changeTaskStatus}
                                 updateTaskTitle={props.updateTaskTitle}
                                 key={m.taskId} taskId={m.taskId} todolistId={props.todolistId} isDone={m.isDone}
                                 taskTitle={m.taskTitle}/>
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



