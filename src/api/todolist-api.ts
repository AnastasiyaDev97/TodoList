import axios from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '78ba9efb-88a6-4c7f-b505-5ad3ba5a9466'
    },
})
export type TodolistResponseType = {
    id: string
    title: string
    addedDate: string
    order: number
}

type ResponseType<D={}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: D
}

export const todolistAPI = {
    GetTodolists() {
        return instance.get<Array<TodolistResponseType>>('todo-lists')
            .then(res => {
                console.log(res)
                return res.data
            })
    },
    CreateTodolist(title: string) {
        return instance.post<ResponseType<{item: TodolistResponseType }>>('todo-lists', {title})
            .then(res => {
                return res.data
            })
    },
    DeleteTodolist(todolistId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}`)
            .then(res => {
                return res.data
            })
    },

    UpdateTodolistTitle(todolistId: string, title: string) {
        debugger
        return instance.put<ResponseType>(`todo-lists/${todolistId}`, {title})
            .then(res => {
                debugger
               return res.data
            })
    },
}