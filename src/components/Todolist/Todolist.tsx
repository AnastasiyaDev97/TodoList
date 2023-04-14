import { FC, useCallback, memo } from "react";
import { useDispatch } from "react-redux";
import {
  removeTodoTC,
  updateTodoTitleTC,
} from "state/reducers/todolistReducer/thunk";
import { changeTodolistFilterAC } from "state/reducers/todolistReducer/todolist-reducer";
import { addTaskTC } from "state/reducers/taskReducer/thunk";
import { EditableSpan } from "../EditableSpan/EditableSpan";
import { Task } from "../Task/Task";
import { AddItemForm } from "../AddItemForm/AddItemForm";
import { RequestStatusType, FilterValue, TaskStatuses } from "enums";
import { TaskResponseType } from "api/types";
import IconButton from "@material-ui/core/IconButton/IconButton";
import { Delete } from "@material-ui/icons";
import { UniversalButton } from "../Button/Button";

type TodolistPropsType = {
  todolistTitle: string;
  tasks: Array<TaskResponseType>;
  filter: FilterValue;
  todolistId: string;
  entityStatus: RequestStatusType;
};

export const Todolist: FC<TodolistPropsType> = memo(
  ({ todolistTitle, tasks, filter, todolistId, entityStatus }) => {
    const dispatch = useDispatch();

    const { All, CompletedFilter, Active } = FilterValue;
    const { Completed, New } = TaskStatuses;
    const { Loading } = RequestStatusType;

    const onChangeAllFilterButton = useCallback(() => {
      dispatch(changeTodolistFilterAC({ id: todolistId, newFilter: All }));
    }, [dispatch, todolistId, All]);

    const onChangeCompletedFilterButton = useCallback(() => {
      dispatch(
        changeTodolistFilterAC({ id: todolistId, newFilter: CompletedFilter })
      );
    }, [dispatch, todolistId, CompletedFilter]);

    const onChangeActiveFilterButton = useCallback(() => {
      dispatch(changeTodolistFilterAC({ id: todolistId, newFilter: Active }));
    }, [dispatch, todolistId, Active]);

    const onDeleteTodoIcon = () => {
      dispatch(removeTodoTC(todolistId));
    };

    const handleAddTaskForm = useCallback(
      (taskTitle: string) => {
        dispatch(addTaskTC(todolistId, taskTitle));
      },
      [dispatch, todolistId]
    );

    const handleUpdateTodoTitleSpan = useCallback(
      (newTitle: string) => {
        dispatch(updateTodoTitleTC(todolistId, newTitle));
      },
      [todolistId, dispatch]
    );

    const buttonsArr = [
      { callback: onChangeAllFilterButton, name: All },
      { callback: onChangeCompletedFilterButton, name: CompletedFilter },
      { callback: onChangeActiveFilterButton, name: Active },
    ];

    let filteredTasks = tasks;

    if (filter === CompletedFilter) {
      filteredTasks = tasks.filter(({ status }) => status === Completed);
    }
    if (filter === Active) {
      filteredTasks = tasks.filter(({ status }) => status === New);
    }

    return (
      <div>
        <h3>
          <EditableSpan
            title={todolistTitle}
            updateTitle={handleUpdateTodoTitleSpan}
          />
          <IconButton
            aria-label="delete"
            size="small"
            onClick={onDeleteTodoIcon}
            disabled={entityStatus === Loading}
          >
            <Delete fontSize="small" />
          </IconButton>
        </h3>
        <AddItemForm addItem={handleAddTaskForm} />
        <ul>
          {filteredTasks?.map(({ id, status, title }) => {
            return (
              <Task
                key={id}
                taskId={id}
                todolistId={todolistId}
                status={status}
                taskTitle={title}
              />
            );
          })}
        </ul>
        <div>
          {buttonsArr.map(({ callback, name }) => (
            <UniversalButton title={name} callback={callback} />
          ))}
        </div>
      </div>
    );
  }
);
