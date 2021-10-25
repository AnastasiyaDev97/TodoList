import React, {ChangeEvent, useState} from "react";
import {TextField} from "@material-ui/core";

type editableSpanPropsType = {
    title: string
    updateTitle: (newTitle: string) => void
}
export const EditableSpan = React.memo((props: editableSpanPropsType) => {
    console.log('editableSpan')
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
            : <TextField id="standard-basic" variant="standard"
                         value={title} onBlur={activateSpanMode} autoFocus onChange={updateTitleHandler}/>
    )
})