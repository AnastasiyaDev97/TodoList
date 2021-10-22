import s from "./AddItemForm.module.css";
import React, {ChangeEvent, KeyboardEvent, useState} from "react";
type addItemFormPropsType={
    addItem: (title: string) => void
}

export const AddItemForm=(props:addItemFormPropsType)=>{
    let [title, setTitle] = useState('')
    let [error, setError] = useState('')

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        if (e.currentTarget.value.length > 0) {
            setError('')
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
    return(
        <div>
            <input value={title} onChange={onChangeHandler} onKeyPress={onKeyPressAddTaskHandler}
                   className={error ? s.errorInput : ''}/>
            <button onClick={addTaskHandler}>+</button>
            {error && <div className={s.error}>{error}</div>}
        </div>
    )
}