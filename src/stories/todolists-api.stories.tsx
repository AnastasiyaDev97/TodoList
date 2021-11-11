import React, {useEffect, useState} from 'react'
import {todolistAPI} from "../api/todolist-api";

export default {
    title: 'API'
}


export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.GetTodolists()
            .then((data) => {
                setState(data);
            })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        let title='newTodolist'
        todolistAPI.CreateTodolist(title)
            .then ((data) => {
                setState(data);
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    const todolistId='';
    useEffect(() => {
        todolistAPI.DeleteTodolist(todolistId)
            .then(data=>setState(data))
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    const todolistId='624ffa53-7676-480c-b8e2-6fcee3b13d37';
    useEffect(() => {
        let title='update Title mya'
        todolistAPI.UpdateTodolistTitle(todolistId,title)
            .then(data=>setState(data))
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

