import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from './tasks-reducer';
import {tasksType} from "../../App";
import {addTodolistAC} from "./todolist-reducer";


test('correct task should be deleted from correct array', () => {
    const startState: tasksType = {
        "todolistId1": [
            { taskId: "1", taskTitle: "CSS", isDone: false },
            { taskId: "2", taskTitle: "JS", isDone: true },
            { taskId: "3", taskTitle: "React", isDone: false }
        ],
        "todolistId2": [
            { taskId: "1", taskTitle: "bread", isDone: false },
            { taskId: "2", taskTitle: "milk", isDone: true },
            { taskId: "3", taskTitle: "tea", isDone: false }
        ]
    };

    const action = removeTaskAC("2", "todolistId2");

    const endState = tasksReducer(startState, action)

    expect(endState).toEqual({
        "todolistId1": [
            { taskId: "1", taskTitle: "CSS", isDone: false },
            { taskId: "2", taskTitle: "JS", isDone: true },
            { taskId: "3", taskTitle: "React", isDone: false }
        ],
        "todolistId2": [
            { taskId: "1", taskTitle: "bread", isDone: false },
            { taskId: "3", taskTitle: "tea", isDone: false }
        ]
    });

});



test('correct task should be added to correct array', () => {
    const startState: tasksType = {
        ["todolistId1"]: [
            { taskId: "1", taskTitle: "CSS", isDone: false },
            { taskId: "2", taskTitle: "JS", isDone: true },
            { taskId: "3", taskTitle: "React", isDone: false }
        ],
        ["todolistId2"]: [
            { taskId: "1", taskTitle: "bread", isDone: false },
            { taskId: "2", taskTitle: "milk", isDone: true },
            { taskId: "3", taskTitle: "tea", isDone: false }
        ]
    };

    const endState = tasksReducer(startState, addTaskAC("juice", "todolistId2"))

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(4);
    expect(endState["todolistId2"][0].taskId).toBeDefined();
    expect(endState["todolistId2"][0].taskTitle).toBe("juice");
    expect(endState["todolistId2"][0].isDone).toBe(false);
})

test('status of specified task should be changed', () => {
    const startState: tasksType = {
        ["todolistId1"]: [
            { taskId: "1", taskTitle: "CSS", isDone: false },
            { taskId: "2", taskTitle: "JS", isDone: true },
            { taskId: "3", taskTitle: "React", isDone: false }
        ],
        ["todolistId2"]: [
            { taskId: "1", taskTitle: "bread", isDone: false },
            { taskId: "2", taskTitle: "milk", isDone: true },
            { taskId: "3", taskTitle: "tea", isDone: false }
        ]
    };

    const endState = tasksReducer(startState,changeTaskStatusAC("2", false, "todolistId2"))

    expect(endState["todolistId2"][1].isDone).toBe(false);
    expect(endState["todolistId1"][1].isDone).toBe(true);
});

test('title of specified task should be changed', () => {
    const startState: tasksType = {
        ["todolistId1"]: [
            { taskId: "1", taskTitle: "CSS", isDone: false },
            { taskId: "2", taskTitle: "JS", isDone: true },
            { taskId: "3", taskTitle: "React", isDone: false }
        ],
        ["todolistId2"]: [
            { taskId: "1", taskTitle: "bread", isDone: false },
            { taskId: "2", taskTitle: "milk", isDone: true },
            { taskId: "3", taskTitle: "tea", isDone: false }
        ]
    };

    const endState = tasksReducer(startState,changeTaskTitleAC("2", 'newTitle', "todolistId2"))

    expect(endState["todolistId2"][1].taskTitle).toBe('newTitle');
    expect(startState["todolistId2"][1].taskTitle).toBe('milk');
});


test('new array should be added when new todolist is added', () => {
    const startState: tasksType = {
        "todolistId1": [
            { taskId: "1", taskTitle: "CSS", isDone: false },
            { taskId: "2", taskTitle: "JS", isDone: true },
            { taskId: "3", taskTitle: "React", isDone: false }
        ],
        "todolistId2": [
            { taskId: "1", taskTitle: "bread", isDone: false },
            { taskId: "2", taskTitle: "milk", isDone: true },
            { taskId: "3", taskTitle: "tea", isDone: false }
        ]
    };



    const endState = tasksReducer(startState, addTodolistAC("new todolist"))


    const keys = Object.keys(endState);
    const newKey = keys.find(k => k != "todolistId1" && k != "todolistId2");
    if (!newKey) {
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
});
