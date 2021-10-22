import s from "./Button.module.css";
import React from "react";
type ButtonPropsType={
    callback:()=>void

    title:string
}
export const Button=(props:ButtonPropsType)=>{
    return(
        <button onClick={props.callback}
                className={(props.title==='all'||'active'||'completed')? s.btn:''}>{props.title}
        </button>
    )
}