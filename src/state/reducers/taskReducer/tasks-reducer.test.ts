import {
  addTaskAC,
  removeTaskAC,
  tasksReducer,
  updateTaskAC,
} from './tasks-reducer';
import { v1 } from 'uuid';
import { tasksType } from './types';
import { FilterValue, RequestStatusType } from '../../../enum';
import { getCurrentDate } from '../../../utils/handlers';

import { addTodolistAC } from '../todolistReducer/todolist-reducer';

const { Idle } = RequestStatusType;
const { All } = FilterValue;

let todolistId1: string;
let todolistId2: string;
let startState: tasksType;

beforeEach(() => {
  todolistId1 = v1();
  todolistId2 = v1();
  startState = {
    todolistId1: [
      {
        id: '1',
        title: 'CSS',
        description: '',
        todoListId: todolistId1,
        status: 0,
        priority: 1,
        startDate: '',
        deadline: '',
        order: 2,
        addedDate: '',
      },
      {
        id: '2',
        title: 'JS',
        description: '',
        todoListId: todolistId1,
        status: 0,
        priority: 1,
        startDate: '',
        deadline: '',
        order: 2,
        addedDate: '',
      },
      {
        id: '3',
        title: 'React',
        description: '',
        todoListId: todolistId1,
        status: 0,
        priority: 1,
        startDate: '',
        deadline: '',
        order: 2,
        addedDate: '',
      },
    ],
    todolistId2: [
      {
        id: '1',
        title: 'bread',
        description: '',
        todoListId: todolistId2,
        status: 0,
        priority: 1,
        startDate: '',
        deadline: '',
        order: 2,
        addedDate: '',
      },
      {
        id: '2',
        title: 'milk',
        description: '',
        todoListId: todolistId2,
        status: 0,
        priority: 1,
        startDate: '',
        deadline: '',
        order: 2,
        addedDate: '',
      },
      {
        id: '3',
        title: 'tea',
        description: '',
        todoListId: todolistId2,
        status: 0,
        priority: 1,
        startDate: '',
        deadline: '',
        order: 2,
        addedDate: '',
      },
    ],
  };
});

test('correct task should be deleted from correct array', () => {
  const action = removeTaskAC({ taskId: '2', id: 'todolistId2' });

  const endState = tasksReducer(startState, action);

  expect(endState).toEqual({
    todolistId1: [
      {
        id: '1',
        title: 'CSS',
        description: '',
        todoListId: todolistId1,
        status: 0,
        priority: 1,
        startDate: '',
        deadline: '',
        order: 2,
        addedDate: '',
      },
      {
        id: '2',
        title: 'JS',
        description: '',
        todoListId: todolistId1,
        status: 0,
        priority: 1,
        startDate: '',
        deadline: '',
        order: 2,
        addedDate: '',
      },
      {
        id: '3',
        title: 'React',
        description: '',
        todoListId: todolistId1,
        status: 0,
        priority: 1,
        startDate: '',
        deadline: '',
        order: 2,
        addedDate: '',
      },
    ],
    todolistId2: [
      {
        id: '1',
        title: 'bread',
        description: '',
        todoListId: todolistId2,
        status: 0,
        priority: 1,
        startDate: '',
        deadline: '',
        order: 2,
        addedDate: '',
      },
      {
        id: '3',
        title: 'tea',
        description: '',
        todoListId: todolistId2,
        status: 0,
        priority: 1,
        startDate: '',
        deadline: '',
        order: 2,
        addedDate: '',
      },
    ],
  });
});

test('correct task should be added to correct array', () => {
  const newTask = {
    id: '5',
    title: 'juice',
    description: '',
    todoListId: todolistId2,
    status: 0,
    priority: 1,
    startDate: '',
    deadline: '',
    order: 2,
    addedDate: '',
  };
  const endState = tasksReducer(
    startState,
    addTaskAC({ task: newTask, id: 'todolistId2' })
  );

  expect(endState['todolistId1'].length).toBe(3);
  expect(endState['todolistId2'].length).toBe(4);
  expect(endState['todolistId2'][0].id).toBe('5');
  expect(endState['todolistId2'][0].title).toBe('juice');
  expect(endState['todolistId2'][0].status).toBe(0);
});

test('status of specified task should be changed', () => {
  const updatedTask = {
    id: '3',
    title: 'juice', 
    description: '',
    todoListId: 'todolistId2',
    status: 1,
    priority: 1,
    startDate: '',
    deadline: '',
    order: 2,
    addedDate: '', 
  };
  const endState = tasksReducer(
    startState,
    updateTaskAC({ task: updatedTask, taskId: '3' })
  );

  expect(endState['todolistId2'][2].status).toBe(1);
  expect(endState['todolistId2'][2].title).toBe('juice');
  expect(endState['todolistId1'][2].status).toBe(0);
});

test('new array should be added when new todolist is added', () => {
  const newTodolistId = v1();
  const todolist = {
    id: newTodolistId,
    title: 'What to cook',
    filter: All,
    addedDate: getCurrentDate,
    order: 1,
    entityStatus: Idle,
  };
  const endState = tasksReducer(startState, addTodolistAC({ todolist }));

  const keys = Object.keys(endState);
  const newKey = keys.find((k) => k !== 'todolistId1' && k !== 'todolistId2');
  if (!newKey) {
    throw Error('new key should be added');
  }

  expect(keys.length).toBe(3);
  expect(endState[newKey]).toEqual([]);
}); 
