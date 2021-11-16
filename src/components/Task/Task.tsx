import React, {ChangeEvent, useCallback} from "react";
import s from "../../Todolist.module.css";
import {Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {TaskStatuses} from "../../api/tasks-api";

type TaskPropsType = {
    taskId: string
    todolistId: string
    status: TaskStatuses
    taskTitle: string
    deleteTask: (todolistId: string, taskId: string) => any
    changeTaskStatus: (taskId: string, status: TaskStatuses, todolistId: string) => any
    updateTaskTitle: (todolistId: string, taskId: string, title: string) => any
}
export const Task = React.memo((props: TaskPropsType) => {
    const deleteTaskHandler = useCallback(() => {
        props.deleteTask(props.todolistId, props.taskId)
    }, [props.deleteTask, props.todolistId, props.taskId])
    const changeTaskStatusHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        props.changeTaskStatus(props.taskId, newIsDoneValue?TaskStatuses.Completed:TaskStatuses.New, props.todolistId)
    }, [props.changeTaskStatus, props.taskId, props.todolistId])

    const updateTaskTitleHandler = useCallback((newTitle: string) => {
        props.updateTaskTitle(props.todolistId, props.taskId, newTitle)
    }, [props.updateTaskTitle, props.todolistId, props.taskId])

    return (
        <li className={props.status===TaskStatuses.Completed ? s.completedTask : ''}>
            <IconButton aria-label="delete" size="small" onClick={deleteTaskHandler}>
                <Delete fontSize="small"/>
            </IconButton>
            <Checkbox checked={props.status===TaskStatuses.Completed} onChange={changeTaskStatusHandler}
                      color={"secondary"} size="small"/>
            <EditableSpan title={props.taskTitle} updateTitle={updateTaskTitleHandler}/>
        </li>
    )
})
