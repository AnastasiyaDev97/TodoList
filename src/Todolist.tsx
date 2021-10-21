import React from "react";
import {filterValuesType, tasksType} from "./App";

type TodolistPropsType = {
    title: string
    tasks: Array<tasksType>
    deleteTask: (taskId: string) => void
    changeFilter: (filterValue: filterValuesType) => void
}

export const Todolist = (props: TodolistPropsType) => {
    const deleteTaskOnclickHandler = (taskId: string) => {
        props.deleteTask(taskId)
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {props.tasks.map(m =>

                    <li key={m.taskId}>
                        <button onClick={() => {
                            deleteTaskOnclickHandler(m.taskId)
                        }}>x
                        </button>
                        <input type="checkbox" checked={m.isDone}/> <span>{m.taskTitle}</span></li>
                )}
            </ul>
            <div>
                <button onClick={() => {
                    props.changeFilter('all')
                }}>All
                </button>
                <button onClick={() => {
                    props.changeFilter('active')
                }}>Active
                </button>
                <button onClick={() => {
                    props.changeFilter('completed')
                }}>Completed
                </button>
            </div>
        </div>
    )
}