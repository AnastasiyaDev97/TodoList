import React, {ChangeEvent, useState} from "react";

type editableSpanPropsType = {
    title: string
    updateTitle: (newTitle: string) => void
}
export const EditableSpan = (props: editableSpanPropsType) => {
    let [edit, setEdit] = useState(true)
    let [title, setTitle] = useState(props.title)

    const activateInputMode = () => {
        setEdit(false)

    }
    const activateSpanMode = () => {
        setEdit(true)
        props.updateTitle(title)
    }
    const updateTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)

    }
    return (
        edit ?
            <span onDoubleClick={activateInputMode}>{title}</span>
            : <input type={'text'} value={title} onBlur={activateSpanMode} autoFocus onChange={updateTitleHandler}/>
    )
}