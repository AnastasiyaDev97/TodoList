import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';

import {EditableSpan} from './EditableSpan';
import {action} from "@storybook/addon-actions";

export default {
    title: 'Todo/EditableSpan',
    component: EditableSpan,
    argTypes: {
        updateTitle: {
            description: 'title was changed'
        },
        title: {
            description: 'start value',
            defaultValue: 'html'
        }
    },
} as ComponentMeta<typeof EditableSpan>;

const Template: ComponentStory<typeof EditableSpan> = (args) => <EditableSpan {...args} />;

export const EditableSpanStory = Template.bind({});
EditableSpanStory.args = {
    updateTitle: action('title was changed')
};




