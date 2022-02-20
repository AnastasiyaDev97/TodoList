import TextField from "@material-ui/core/TextField/TextField";
import { ChangeEvent, useState, FC, memo } from "react";

type editableSpanPropsType = {
  title: string;
  updateTitle: (newTitle: string) => void;
};

export const EditableSpan: FC<editableSpanPropsType> = memo(
  ({ title, updateTitle }) => {

    let [edit, setEdit] = useState(true);
    let [currTitle, setCurrTitle] = useState(title);

    const activateInputMode = () => {
      setEdit(false);
    };

    const activateSpanMode = () => {
      setEdit(true);
      updateTitle(currTitle);
    };

    const updateTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
      setCurrTitle(e.currentTarget.value);
    };
    
    return edit ? (
      <span onDoubleClick={activateInputMode}>{title}</span>
    ) : (
      <TextField
        id="standard-basic"
        variant="standard"
        value={currTitle}
        onBlur={activateSpanMode}
        autoFocus
        onChange={updateTitleHandler}
      />
    );
  }
);
