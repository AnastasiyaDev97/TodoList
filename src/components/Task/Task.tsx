import { ChangeEvent, useCallback, FC, memo } from "react";
import style from "./Task.module.css";
import { Checkbox, IconButton } from "@material-ui/core";
import { Delete } from "@material-ui/icons";

import { TaskStatuses } from "enums/index";

import { deleteTaskTC, updateTaskTC } from "state/reducers/taskReducer/thunk";
import { useDispatch } from "react-redux";

import { EditableSpan } from "components/EditableSpan/EditableSpan";
import { EMPTY_STRING } from "constants/index";

type TaskPropsType = {
  taskId: string;
  todolistId: string;
  status: TaskStatuses;
  taskTitle: string;
};

export const Task: FC<TaskPropsType> = memo(
  ({ taskId, todolistId, status, taskTitle }) => {
    const dispatch = useDispatch();

    const { Completed, New } = TaskStatuses;

    const onDeleteTaskButton = () => {
      dispatch(deleteTaskTC(todolistId, taskId));
    };

    const handleUpdateTaskTitleSpan = useCallback(
      (newTitle: string) => {
        dispatch(updateTaskTC(todolistId, taskId, { title: newTitle }));
      },
      [dispatch, todolistId, taskId]
    );

    const onChangeTaskStatusBox = (e: ChangeEvent<HTMLInputElement>) => {
      let newIsDoneValue = e.currentTarget.checked;
      dispatch(
        updateTaskTC(todolistId, taskId, {
          status: newIsDoneValue ? Completed : New,
        })
      );
    };

    return (
      <li className={status === Completed ? style.completedTask : EMPTY_STRING}>
        <IconButton
          aria-label="delete"
          size="small"
          onClick={onDeleteTaskButton}
        >
          <Delete fontSize="small" />
        </IconButton>
        <Checkbox
          checked={status === Completed}
          onChange={onChangeTaskStatusBox}
          color="secondary"
          size="small"
        />
        <EditableSpan
          title={taskTitle}
          updateTitle={handleUpdateTaskTitleSpan}
        />
      </li>
    );
  }
);
