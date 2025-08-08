
import { Meta, StoryObj } from '@storybook/react';
import Selector from './Selector';
import { createListCollection } from '@chakra-ui/react';

const meta: Meta<typeof Selector> = {
    title: 'Components/Selector',
    component: Selector,
    tags: ['autodocs'],
    args: {
        collection: ['test'],
        selectLabel: "Location",
        selectValueText: "Where did you caught your pokemon?"
    },
};

export default meta;

type Story = StoryObj<typeof Selector>;

export const Default: Story = {};
