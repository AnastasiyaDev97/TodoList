import axios from "axios";
import internal from "stream";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '78ba9efb-88a6-4c7f-b505-5ad3ba5a9466'
    },
})
type TasksType = {
    items: Array<TaskType>
    totalCount: number
    error: null
}
type TaskType={
    id:string
    title:string
    description:null
    todoListId:string
    order:number
    status:null|number
    priority:number
    startDate:null
    deadline:null
    addedDate:string
}
type updateTaskType={
title: string
description: string
completed: boolean
status: null|number
priority: number
startDate: null
deadline: null}

type ResponseType<D={}> = {
    data:D
    messages:Array<string>
    fieldsErrors:Array<string>
    resultCode:number
}

export const tasksAPI = {
    GetTasks(todolistId:string) {
        return instance.get<TasksType>(`todo-lists/${todolistId}/tasks`)
            .then(res => res.data)
    },
    CreateTask(todolistId:string,title: string) {
        return instance.post<ResponseType<{ item:TasksType }>>(`todo-lists/${todolistId}/tasks`, {title})
            .then(res => {
                console.log(res)
                return res.data
            })
    },
    DeleteTask(todolistId: string,taskId:string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
            .then(res => {
                console.log(res)
                return res.data
            })
    },

    UpdateTaskTitle(todolistId: string,taskId:string, updateTask:updateTaskType) {
        let {title, description, completed, status, priority, startDate, deadline}=updateTask
        return instance.put<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`, {title,
            description,
            completed,
            status,
            priority,
            startDate,
            deadline})
            .then(res => {
                console.log(res)
               return res.data
            })
    },
}