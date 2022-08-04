import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TodolistResponseType } from '../../../api/types';
import { FilterValue, RequestStatusType } from '../../../enum';
import { todolistStateType } from './types';

const { Idle } = RequestStatusType;
const { All } = FilterValue;

let initialState: todolistStateType = [];

const slice = createSlice({
  name: 'todolists',
  initialState: initialState,
  reducers: {
    removeTodolistAC(state, action: PayloadAction<{ id: string }>) {
      let index = state.findIndex(({ id }) => id === action.payload.id);
      if (index !== -1) {
        state.splice(index, 1); //с какого индекса, сколько эл-ов
      }
    },

    addTodolistAC(
      state,
      action: PayloadAction<{ todolist: TodolistResponseType }>
    ) {
      state.unshift({
        ...action.payload.todolist,
        filter: All,
        entityStatus: Idle,
      });
    },

    changeTodolistTitleAC(
      state,
      action: PayloadAction<{ id: string; title: string }>
    ) {
      let index = state.findIndex(({ id }) => id === action.payload.id);
      state[index].title = action.payload.title;
    },

    changeTodolistFilterAC(
      state,
      action: PayloadAction<{ id: string; newFilter: FilterValue }>
    ) {
      let index = state.findIndex(({ id }) => id === action.payload.id);
      state[index] = { ...state[index], filter: action.payload.newFilter };
    },

    setTodolistsAC(
      state,
      action: PayloadAction<{ todolists: Array<TodolistResponseType> }>
    ) {
      return action.payload.todolists.map((tdl) => ({
        ...tdl,
        filter: All,
        entityStatus: Idle,
      }));
    },

    setTodolistProgressStatus(
      state,
      action: PayloadAction<{
        entityStatus: RequestStatusType;
        todolistId: string;
      }>
    ) {
      let index = state.findIndex(({ id }) => id === action.payload.todolistId);
      state[index] = {
        ...state[index],
        entityStatus: action.payload.entityStatus,
      };
    },
  },
});

export const {
  removeTodolistAC,
  addTodolistAC,
  changeTodolistTitleAC,
  changeTodolistFilterAC,
  setTodolistsAC,
  setTodolistProgressStatus,
} = slice.actions;

export const todolistsReducer = slice.reducer;
