import { v1 } from 'uuid';
import { FilterValue, RequestStatusType } from '../../../enum';
import { getCurrentDate } from '../../../utils/handlers';
import {
  addTodolistAC,
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  removeTodolistAC,
  todolistsReducer,
} from './todolist-reducer';
import { todolistsDomainType } from './types';

const { All } = FilterValue;
const { Idle } = RequestStatusType;

let todolistId1: string;
let todolistId2: string;
let newTodolistTitle: string;
let startState: Array<todolistsDomainType>;
beforeEach(() => {
  todolistId1 = v1();
  todolistId2 = v1();
  newTodolistTitle = 'New Todolist';
  startState = [
    {
      id: todolistId1,
      title: 'What to learn',
      filter: All,
      addedDate: getCurrentDate,
      order: 1,
      entityStatus: Idle,
    },
    {
      id: todolistId2,
      title: 'What to buy',
      filter: All,
      addedDate: getCurrentDate,
      order: 1,
      entityStatus: Idle,
    },
  ];
});

test('correct todolist should be removed', () => {
  const endState = todolistsReducer(
    startState,
    removeTodolistAC({ id: todolistId1 })
  );

  expect(endState.length).toBe(1);
  expect(endState[0].id).toBe(todolistId2);
});

test('correct todolist should be added', () => {
  const todolistId3 = v1();
  const newTodolist = {
    id: todolistId3,
    title: 'What to eat',
    filter: All,
    addedDate: getCurrentDate,
    order: 1,
    entityStatus: Idle,
  };
  const endState = todolistsReducer(
    startState,
    addTodolistAC({ todolist: newTodolist })
  );

  expect(endState.length).toBe(3);
  expect(endState[0].title).toBe('What to eat');
});

test('correct todolist should change its name', () => {
  const endState = todolistsReducer(
    startState,
    changeTodolistTitleAC({ id: todolistId2, title: newTodolistTitle })
  );

  expect(endState[0].title).toBe('What to learn');
  expect(endState[1].title).toBe(newTodolistTitle);
});

test('correct filter of todolist should be changed', () => {
  const endState = todolistsReducer(
    startState,
    changeTodolistFilterAC({
      id: todolistId2,
      newFilter: 'completed' as FilterValue,
    })
  );

  expect(endState[0].filter).toBe('all');
  expect(endState[1].filter).toBe('completed');
});
