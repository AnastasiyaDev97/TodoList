import { useCallback, useEffect } from 'react';
import { Path, RequestStatusType } from './enum/index';

import {
  AppBar,
  Button,
  CircularProgress,
  Container,
  LinearProgress,
  Toolbar,
  Typography,
} from '@material-ui/core';
import style from './App.module.css';

import { useDispatch, useSelector } from 'react-redux';
import { RootReducerType } from './state/store';

import ErrorSnackbar from './components/Snackbar/Snackbar';
import { Login } from './components/Login/Login';
import { Navigate, Route, Routes } from 'react-router-dom';
import { authUserTC, logoutTC } from './state/reducers/auth-reducer';
import { TodolistList } from './components/TodolistList/TodolistList';

function AppWithRedux() {
  const dispatch = useDispatch();

  const status = useSelector<RootReducerType, RequestStatusType>(
    (state) => state.app.status
  );
  const isInitialize = useSelector<RootReducerType, boolean>(
    (state) => state.app.isInitialize
  );
  const isLoggedIn = useSelector<RootReducerType, boolean>(
    (state) => state.auth.isLoggedIn
  );

  const { Loading } = RequestStatusType;
  const { START, LOGIN_PATH, NOT_FOUND, ANY } = Path;

  useEffect(() => {
    dispatch(authUserTC());
  }, []);

  const logoutHandler = useCallback(
    function () {
      dispatch(logoutTC());
    },
    [dispatch]
  );

  return (
    <div>
      <AppBar
        position="static"
        style={{ background: 'SkyBlue' }}
        className={style.appbar}
      >
        <Toolbar variant="dense" className={style.header}>
          <Typography variant="h6">Todolist</Typography>
          {isLoggedIn && (
            <Button
              onClick={logoutHandler}
              color={'inherit'}
              style={{ float: 'right' }}
            >
              log out
            </Button>
          )}
        </Toolbar>
      </AppBar>
      {status === Loading && <LinearProgress />}
      {!isInitialize ? (
        <div
          style={{
            position: 'fixed',
            top: '30%',
            textAlign: 'center',
            width: '100%',
          }}
        >
          <CircularProgress />
        </div>
      ) : (
        <Container fixed>
          <Routes>
            <Route path={START} element={<TodolistList />} />
            <Route path={LOGIN_PATH} element={<Login />} />
            <Route path={ANY} element={<Navigate to={ANY} />} />
            <Route path={NOT_FOUND} element={<h1>PAGE_NOT_FOUND_TEXT</h1>} />
          </Routes>
        </Container>
      )}
      <ErrorSnackbar />
    </div>
  );
}

export default AppWithRedux;
