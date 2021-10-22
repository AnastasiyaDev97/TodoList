import React from "react";
import {filterValuesType, taskType} from "./App";
import s from './Todolist.module.css'
import {AddItemForm} from "./components/AddItemForm/AddItemForm";
import {EditableSpan} from "./components/EditableSpan/EditableSpan";

type TodolistPropsType = {
    todolistTitle: string
    tasks: Array<taskType>
    deleteTask: (todolistId: string, taskId: string) => void
    changeTodolistFilter: (filterValue: filterValuesType) => void
    addTask: (todolistId: string, taskTitle: string) => void
    changeTaskStatus: (todolistId: string, taskId: string) => void
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
                <button onClick={deleteTodoHandler}>x</button>
            </h3>
            <AddItemForm addItem={addTaskHandler}/>
            <ul>
                {props.tasks.map(m => {
                    const deleteTaskHandler = () => {
                        props.deleteTask(props.todolistId, m.taskId)
                    }
                    const changeTaskStatusHandler = () => {
                        props.changeTaskStatus(props.todolistId, m.taskId)
                    }
                    const updateTaskTitleHandler = (newTitle: string) => {
                        props.updateTaskTitle(props.todolistId, m.taskId, newTitle)
                    }
                    return (
                        <li key={m.taskId} className={m.isDone ? s.completedTask : ''}>
                            <button onClick={
                                deleteTaskHandler}>x
                            </button>
                            <input type="checkbox" checked={m.isDone} onChange={changeTaskStatusHandler}/>
                            <EditableSpan title={m.taskTitle} updateTitle={updateTaskTitleHandler}/>
                        </li>
                    )
                })}
            </ul>
            <div>
                <button onClick={changeAllFilterHandler} className={props.filter === 'all' ? s.activeButton : ''}>All
                </button>
                <button onClick={changeActiveFilterHandler}
                        className={props.filter === 'active' ? s.activeButton : ''}>Active
                </button>
                <button onClick={changeCompletedFilterHandler}
                        className={props.filter === 'completed' ? s.activeButton : ''}>Completed
                </button>
            </div>
        </div>
    )
}