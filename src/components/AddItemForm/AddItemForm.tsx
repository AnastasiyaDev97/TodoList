import s from "./AddItemForm.module.css";
import React, {ChangeEvent, KeyboardEvent,  useState} from "react";
import {IconButton, TextField} from "@material-ui/core";
import {AddBoxOutlined} from "@material-ui/icons";

type addItemFormPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm = React.memo((props: addItemFormPropsType) => {
    let [title, setTitle] = useState<string>('')
    let [error, setError] = useState<string | null>(null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        if (e.currentTarget.value.length > 0) {
            setError(null)
        }
    }
    const addTaskHandler = () => {
        if (title.trim() !== '') {
            props.addItem(title)
            setTitle('')
        } else {
            setError('name required')
        }
    }

    const onKeyPressAddTaskHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            addTaskHandler()
        }
    }
    console.log('addItem')
    return (
        <div className={s.wrapper}>
            <TextField
                error={!!error}
                id={error ? "outlined-error" : "standard-basic"}
                label={error ? "Error" : "write title"}
                onChange={onChangeHandler} onKeyPress={onKeyPressAddTaskHandler}
                value={title}
                size="small"
            />

            <IconButton size="small" onClick={addTaskHandler}>
                <AddBoxOutlined style={{color: "LightGreen"}}/>
            </IconButton>

        </div>
    )
})


