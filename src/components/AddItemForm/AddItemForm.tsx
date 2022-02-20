import s from "./AddItemForm.module.css";
import { ChangeEvent, KeyboardEvent, useState,FC,memo } from "react";
import { IconButton, TextField } from "@material-ui/core";
import { AddBoxOutlined } from "@material-ui/icons";
import { EMPTY_STRING } from "../../constants";
import { Nullable } from "../../type/Nullable";

type addItemFormPropsType = {
  addItem: (title: string) => void;
};

export const AddItemForm:FC<addItemFormPropsType> = memo(({addItem}) => {
  let [title, setTitle] = useState<string>(EMPTY_STRING);
  let [error, setError] = useState<Nullable<string>>(null);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
    if (e.currentTarget.value.length > 0) {
      setError(null);
    }
  };
  const addTaskHandler = () => {
    if (title.trim() !== EMPTY_STRING) {
      addItem(title);
      setTitle(EMPTY_STRING);
    } else {
      setError("name required");
    }
  };

  const onKeyPressAddTaskHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      addTaskHandler();
    }
  };
  console.log("addItem");
  return (
    <div className={s.wrapper}>
      <TextField
        error={!!error}
        id={error ? "outlined-error" : "standard-basic"}
        label={error ? "Error" : "write title"}
        onChange={onChangeHandler}
        onKeyPress={onKeyPressAddTaskHandler}
        value={title}
        size="small"
      />

      <IconButton size="small" onClick={addTaskHandler}>
        <AddBoxOutlined style={{ color: "LightGreen" }} />
      </IconButton>
    </div>
  );
});
