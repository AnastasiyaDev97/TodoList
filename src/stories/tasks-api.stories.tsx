import React, {useEffect, useState} from 'react'
import {tasksAPI} from "../api/tasks-api";


export default {
    title: 'API-TASKS'
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        let todolistId='d61cc712-9ff0-48e7-8ed9-75b480975910'
        tasksAPI.GetTasks(todolistId)
            .then((data) => {
                setState(data);
            })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        let todolistId='d61cc712-9ff0-48e7-8ed9-75b480975910'
        let title='newTask2'
        tasksAPI.CreateTask(todolistId,title)
            .then ((data) => {
                setState(data);
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const todolistId='d61cc712-9ff0-48e7-8ed9-75b480975910';
    const taskId='1910a461-21ca-475a-a29b-71527fff37e0'
    useEffect(() => {
        tasksAPI.DeleteTask(todolistId,taskId)
            .then(data=>setState(data))
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTaskTitle = () => {
    const [state, setState] = useState<any>(null)
    const todolistId='d61cc712-9ff0-48e7-8ed9-75b480975910';
    const tasksId='0ecbe4de-2d4c-4dea-b46a-90c3a173d76a'
    const updateTask={
        title: 'nnnn',
        description: 'string',
        completed: true,
        status: 3,
        priority: 2,
        startDate: null,
        deadline: null,}
    useEffect(() => {

        tasksAPI.UpdateTaskTitle(todolistId,tasksId,  updateTask)
            .then(data=>setState(data))
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

