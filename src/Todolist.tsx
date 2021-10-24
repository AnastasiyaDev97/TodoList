import React from "react";
import {filterValuesType, taskType} from "./AppWithReducer";
import s from './Todolist.module.css'
import {AddItemForm} from "./components/AddItemForm/AddItemForm";
import {EditableSpan} from "./components/EditableSpan/EditableSpan";
import {UniversalButton} from "./components/Button/Button";
import {Checkbox, IconButton} from '@material-ui/core';
import {Delete} from '@material-ui/icons';

type TodolistPropsType = {
    todolistTitle: string
    tasks: Array<taskType>
    deleteTask: (todolistId: string, taskId: string) => void
    changeTodolistFilter: (filterValue: filterValuesType) => void
    addTask: (todolistId: string, taskTitle: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string ) => void
    filter: filterValuesType
    todolistId: string
    deleteTodolist: (todolistsId: string) => void
    updateTaskTitle: (todolistsId: string, taskId: string, newTitle: string) => void
    updateTodoTitle: (newTitle: string) => void
}

export const Todolist = (props: TodolistPropsType) => {

    const changeAllFilterHandler = () => {
        props.changeTodolistFilter('all')
    }
    const changeCompletedFilterHandler = () => {
        props.changeTodolistFilter('completed')
    }
    const changeActiveFilterHandler = () => {
        props.changeTodolistFilter('active')
    }
    const deleteTodoHandler = () => {
        props.deleteTodolist(props.todolistId)
    }
    const addTaskHandler = (taskTitle: string) => {
        props.addTask(props.todolistId, taskTitle)
    }

    return (
        <div>
            <h3><EditableSpan title={props.todolistTitle} updateTitle={props.updateTodoTitle}/>
                <IconButton aria-label="delete" size="small" onClick={deleteTodoHandler}>
                    <Delete fontSize="small"/>
                </IconButton>

            </h3>
            <AddItemForm addItem={addTaskHandler}/>
            <ul>
                {props.tasks.map(m => {
                    const deleteTaskHandler = () => {
                        props.deleteTask(props.todolistId, m.taskId)
                    }
                    const changeTaskStatusHandler = () => {
                        props.changeTaskStatus(m.taskId,m.isDone,props.todolistId)
                    }
                    const updateTaskTitleHandler = (newTitle: string) => {
                        props.updateTaskTitle(props.todolistId, m.taskId, newTitle)
                    }
                    return (
                        <li key={m.taskId} className={m.isDone ? s.completedTask : ''}>
                            <IconButton aria-label="delete" size="small" onClick={deleteTaskHandler}>
                                <Delete fontSize="small"/>
                            </IconButton>
                            <Checkbox checked={m.isDone} onChange={changeTaskStatusHandler}
                                      color={"secondary"} size="small"/>
                            {/*   <input type="checkbox" checked={m.isDone} onChange={changeTaskStatusHandler}/>*/}
                            <EditableSpan title={m.taskTitle} updateTitle={updateTaskTitleHandler}/>
                        </li>
                    )
                })}
            </ul>
            <div>
                <UniversalButton callback={changeAllFilterHandler} title={'all'}/>
                <UniversalButton callback={changeActiveFilterHandler} title={'active'}/>
                <UniversalButton callback={changeCompletedFilterHandler} title={'completed'}/>
            </div>
        </div>
    )
}