import {v1} from 'uuid';

import todolistsReducer, {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
} from "./todolist-reducer";
import {todolistsType} from "../../AppWithRedux";

let todolistId1:string
let todolistId2:string
let newTodolistTitle:string
let startState: Array<todolistsType>
beforeEach(()=>{
    todolistId1 = v1()
    todolistId2 = v1()
    newTodolistTitle= "New Todolist"
    startState=[
        {todolistId: todolistId1, title: "What to learn", filter: "all"},
        {todolistId: todolistId2, title: "What to buy", filter: "all"}
    ]
})

test('correct todolist should be removed', () => {
    const endState = todolistsReducer(startState, removeTodolistAC(todolistId1))

    expect(endState.length).toBe(1);
    expect(endState[0].todolistId).toBe(todolistId2);
});

test('correct todolist should be added', () => {
    const endState = todolistsReducer(startState, addTodolistAC(newTodolistTitle))

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(newTodolistTitle);
});


test('correct todolist should change its name', () => {
    const endState = todolistsReducer(startState, changeTodolistTitleAC(todolistId2, newTodolistTitle));

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});

test('correct filter of todolist should be changed', () => {
    const endState = todolistsReducer(startState, changeTodolistFilterAC(todolistId2, "completed"));

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe("completed");
});
