import React, {ChangeEvent, useState, KeyboardEvent} from "react";
import {filterValuesType, tasksType} from "./App";

type TodolistPropsType = {
    title: string
    tasks: Array<tasksType>
    deleteTask: (taskId: string) => void
    changeFilter: (filterValue: filterValuesType) => void
    addTask: (taskTitle: string) => void
}

export const Todolist = (props: TodolistPropsType) => {
    let [title, setTitle] = useState('')


    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const addTaskHandler = () => {
        props.addTask(title)
        setTitle('')
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
                <input value={title} onChange={onChangeHandler} onKeyPress={onKeyPressAddTaskHandler}/>
                <button onClick={addTaskHandler}>+</button>
            </div>
            <ul>
                {props.tasks.map(m => {
                    const deleteTaskHandler = () => {
                        props.deleteTask(m.taskId)
                    }
                    return (
                        <li key={m.taskId}>
                            <button onClick={
                                deleteTaskHandler}>x
                            </button>
                            <input type="checkbox" checked={m.isDone}/> <span>{m.taskTitle}</span></li>
                    )
                })}
            </ul>
            <div>
                <button onClick={changeAllFilterHandler}>All
                </button>
                <button onClick={changeActiveFilterHandler}>Active
                </button>
                <button onClick={changeCompletedFilterHandler}>Completed
                </button>
            </div>
        </div>
    )
}