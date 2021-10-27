import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {Task} from "./Task";
import {action} from "@storybook/addon-actions";

export default {
    title: 'Todo/Task',
    component: Task,
} as ComponentMeta<typeof Task>;

const baseArgs = {
    deleteTask: action('task was deleted'),
    changeTaskStatus: action('task status was changed'),
    updateTaskTitle: action('task title was changed')
}
const Template: ComponentStory<typeof Task> = (args) => <Task {...args} />;

export const TaskStory = Template.bind({});
TaskStory.args = {
    ...baseArgs,
    taskId: '1',
    taskTitle: 'css',
    isDone: true,
    todolistId: 'todo1'
};




