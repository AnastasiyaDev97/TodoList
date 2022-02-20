import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootReducerType } from "../../state/store";
import { Path } from "../../enum/index";
import {
  addTodoTC,
  setTodosTC,
} from "../../state/reducers/todolistReducer/thunk";
import { tasksType } from "../../state/reducers/taskReducer/types";
import { todolistsDomainType } from "../../state/reducers/todolistReducer/types";
import { Grid, Paper } from "@material-ui/core";
import { AddItemForm } from "../AddItemForm/AddItemForm";
import { Navigate } from "react-router-dom";
import { Todolist } from "../Todolist/Todolist";

export const TodolistList = () => {

  const isLoggedIn = useSelector<RootReducerType, boolean>(
    (state) => state.auth.isLoggedIn);
  const todolists = useSelector<RootReducerType, Array<todolistsDomainType>>(
    (state) => state.todolists);
  const tasks = useSelector<RootReducerType, tasksType>((state) => state.tasks);

  const dispatch = useDispatch();

  const { LOGIN_PATH } = Path;

  useEffect(() => {
    if (!isLoggedIn) {
      return;
    }
    dispatch(setTodosTC());
  }, []);

  const addTodolist = useCallback(
    (todolistTitle: string) => {
      dispatch(addTodoTC(todolistTitle));
    },
    [dispatch]
  );

  if (!isLoggedIn) {
    return <Navigate to={LOGIN_PATH} />;
  }

  return (
    <>
      <Grid container style={{ padding: "20px" }}>
        <AddItemForm addItem={addTodolist} />
      </Grid>

      <Grid container spacing={3}>
        {todolists.map(({ id, entityStatus, title, filter }) => {
          let tasksForTodolist = tasks[id];
          return (
              
            <Grid item key={id}>
              <Paper style={{ padding: "10px" }}>
                <Todolist
                  key={id}
                  todolistId={id}
                  entityStatus={entityStatus}
                  todolistTitle={title}
                  tasks={tasksForTodolist}
                  filter={filter}
                />
              </Paper>
            </Grid>

          );
        })}
      </Grid>
    </>
  );
};
