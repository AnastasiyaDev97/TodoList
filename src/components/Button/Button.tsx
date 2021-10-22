import s from './Button.module.css'
import React from "react";
import {Button} from "@material-ui/core";

type ButtonPropsType = {
    callback: () => void
    title: string
}
export const UniversalButton = (props: ButtonPropsType) => {
    return (
        <Button variant="text" size="small"
                color="primary" onClick={props.callback}
                className={s.btn}
        >{props.title}</Button>
    )
}