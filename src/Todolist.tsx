import React, {ChangeEvent, useState, KeyboardEvent} from "react";
import {filterValuesType, tasksType} from "./App";
import s from './Todolist.module.css'

type TodolistPropsType = {
    title: string
    tasks: Array<tasksType>
    deleteTask: (taskId: string) => void
    changeFilter: (filterValue: filterValuesType) => void
    addTask: (taskTitle: string) => void
    changeTaskStatus: (taskId: string) => void
    filter: filterValuesType
}

export const Todolist = (props: TodolistPropsType) => {
    let [title, setTitle] = useState('')
    let [error, setError] = useState('')

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        if (e.currentTarget.value.length > 0) {
            setError('')
        }
    }
    const addTaskHandler = () => {
        if (title.trim() !== '') {
            props.addTask(title)
            setTitle('')
        } else {
            setError('name required')
        }
    }
    const onKeyPressAddTaskHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            addTaskHandler()
        }
    }
    const changeAllFilterHandler = () => {
        props.changeFilter('all')
    }
    const changeCompletedFilterHandler = () => {
        props.changeFilter('completed')
    }
    const changeActiveFilterHandler = () => {
        props.changeFilter('active')
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={title} onChange={onChangeHandler} onKeyPress={onKeyPressAddTaskHandler}
                       className={error ? s.errorInput : ''}/>
                <button onClick={addTaskHandler}>+</button>
                {error && <div className={s.error}>{error}</div>}
            </div>
            <ul>
                {props.tasks.map(m => {
                    const deleteTaskHandler = () => {
                        props.deleteTask(m.taskId)
                    }
                    const changeTaskStatusHandler = () => {
                        props.changeTaskStatus(m.taskId)
                    }
                    return (
                        <li key={m.taskId} className={m.isDone ? s.completedTask : ''}>
                            <button onClick={
                                deleteTaskHandler}>x
                            </button>
                            <input type="checkbox" checked={m.isDone} onClick={changeTaskStatusHandler}/>
                            <span>{m.taskTitle}</span></li>
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