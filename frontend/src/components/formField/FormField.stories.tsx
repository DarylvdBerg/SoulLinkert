import { Meta, StoryObj } from '@storybook/react';
import FormField from './FormField';

const meta: Meta<typeof FormField> = {
    title: 'Components/FormField',
    component: FormField,
    tags: ['autodocs'],
    args: {
        label: 'Label of field',
    },
};

export default meta;

type Story = StoryObj<typeof FormField>;

export const Default: Story = {};
export const Required: Story = {
    args: {
        isRequired: true,
    },
};
