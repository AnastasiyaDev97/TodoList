import React, {ChangeEvent, useCallback} from "react";
import s from "../../Todolist.module.css";
import {Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {EditableSpan} from "../EditableSpan/EditableSpan";

type TaskPropsType = {
    taskId: string
    todolistId: string
    isDone: boolean
    taskTitle: string
    deleteTask: (todolistId: string, taskId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    updateTaskTitle: (todolistId: string, taskId: string, newTitle: string) => void
}
export const Task = React.memo((props: TaskPropsType) => {
    const deleteTaskHandler = useCallback(() => {
        props.deleteTask(props.todolistId, props.taskId)
    }, [props.deleteTask, props.todolistId, props.taskId])
    const changeTaskStatusHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        props.changeTaskStatus(props.taskId, newIsDoneValue, props.todolistId)
    }, [props.changeTaskStatus, props.taskId, props.todolistId])
    const updateTaskTitleHandler = useCallback((newTitle: string) => {
        props.updateTaskTitle(props.todolistId, props.taskId, newTitle)
    }, [props.updateTaskTitle, props.todolistId, props.taskId])

    return (
        <li className={props.isDone ? s.completedTask : ''}>
            <IconButton aria-label="delete" size="small" onClick={deleteTaskHandler}>
                <Delete fontSize="small"/>
            </IconButton>
            <Checkbox checked={props.isDone} onChange={changeTaskStatusHandler}
                      color={"secondary"} size="small"/>
            <EditableSpan title={props.taskTitle} updateTitle={updateTaskTitleHandler}/>
        </li>
    )
})
