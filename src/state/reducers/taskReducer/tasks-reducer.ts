import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  addTodolistAC,
  removeTodolistAC,
  setTodolistsAC,
} from '../todolistReducer/todolist-reducer';
import { TaskResponseType } from '../../../api/types';
import { tasksType } from './types';

let initialState: tasksType = {
  /* 'todoid1':[{id:string,title:string,description:null,todoListId:string, order:number,status:null|number
    priority:number,startDate:null,deadline:null],
    */
};

const slice = createSlice({
  name: 'tasks',
  initialState: initialState,
  reducers: {
    removeTaskAC(state, action: PayloadAction<{ taskId: string; id: string }>) {
      let index = state[action.payload.id].findIndex(
        (tl) => tl.id === action.payload.taskId
      );
      if (index !== -1) {
        state[action.payload.id].splice(index, 1); //с какого индекса, сколько эл-ов
      }
    },

    addTaskAC(
      state,
      action: PayloadAction<{ task: TaskResponseType; id: string }>
    ) {
      state[action.payload.id].unshift(action.payload.task);
    },

    updateTaskAC(
      state,
      action: PayloadAction<{ task: TaskResponseType; taskId: string }>
    ) {
      let index = state[action.payload.task.todoListId].findIndex(
        (t) => t.id === action.payload.taskId
      );
      state[action.payload.task.todoListId][index] = {
        ...state[action.payload.task.todoListId][index],
        ...action.payload.task,
      };
    },

    setTasksAC(
      state,
      action: PayloadAction<{
        tasks: Array<TaskResponseType>;
        todolistId: string;
      }>
    ) {
      state[action.payload.todolistId] = action.payload.tasks;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(addTodolistAC, (state, action) => {
      state[action.payload.todolist.id] = [];
    });

    builder.addCase(setTodolistsAC, (state, action) => {
      action.payload.todolists.forEach((f) => {
        state[f.id] = [];
      });
    });

    builder.addCase(removeTodolistAC, (state, action) => {
      delete state[action.payload.id];
    });
  },
});

export const { removeTaskAC, addTaskAC, updateTaskAC, setTasksAC } =
  slice.actions;
export const tasksReducer = slice.reducer;
