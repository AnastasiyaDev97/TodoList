import {setTodolistStatusType} from "./todolist-reducer";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    status: 'idle' as RequestStatusType,
    error: null
}
export type appInitialStateType = {
    status: RequestStatusType
    error: string | null
}
type ActionType = setRequestStatusType | setErrorTextType | setTodolistStatusType

export const appReducer = (state: appInitialStateType = initialState, action: ActionType) => {
    switch (action.type) {
        case 'SET-REQUEST-STATUS':
            return {...state, status: action.status};
        case 'SET-ERROR-TEXT':

            return {...state, error: action.error};
        default:
            return state
    }
}

export const setRequestStatus = (status: RequestStatusType) => ({
    type: 'SET-REQUEST-STATUS',
    status,
} as const)

export const setErrorText = (error: string | null) => ({
    type: 'SET-ERROR-TEXT',
    error,
} as const)

export type setRequestStatusType = ReturnType<typeof setRequestStatus>
export type setErrorTextType = ReturnType<typeof setErrorText>