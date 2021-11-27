import axios from "axios";
import {ResponseType} from "./todolist-api";


const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '78ba9efb-88a6-4c7f-b505-5ad3ba5a9466'
    },
})
type GetTasksResponseType = {
    items: Array<TaskResponseType>
    totalCount: number
    error: null
}

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}

export type TaskResponseType = {
    id: string
    title: string
    description: string|null
    todoListId: string
    order: number
    status: TaskStatuses
    priority: TaskPriorities
    startDate: null | string
    deadline: null | string
    addedDate: null | string
}
export type updateTaskType = {
    title: string
    description: string|null
    status: TaskStatuses
    priority: TaskPriorities
    startDate: null | string
    deadline: null | string
}


export const tasksAPI = {
    GetTasks(todolistId: string) {
        return instance.get<GetTasksResponseType>(`todo-lists/${todolistId}/tasks`)
            .then(res =>{
                return res.data
            })
    },
    CreateTask(todolistId: string, title: string) {
        return instance.post<ResponseType<{ item: TaskResponseType }>>(`todo-lists/${todolistId}/tasks`, {title})
            .then(res => {
                return res.data
            })
    },
    DeleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
            .then(res => {
                return res.data
            })
    },

    UpdateTask(todolistId: string, taskId: string, updateTask: updateTaskType) {
        let {title, description, status, priority, startDate, deadline} = updateTask
        return instance.put<ResponseType<{ item: TaskResponseType }>>(`todo-lists/${todolistId}/tasks/${taskId}`, {
            title,
            description,
            status,
            priority,
            startDate,
            deadline
        })
            .then(res => {
                return res.data
            })
    },
}