import { Meta, StoryObj } from '@storybook/react';
import { Pair, PairState } from './Pair';
import bulbasour from './bulbasour.json';
import charmander from './charmander.json';

const meta: Meta<typeof Pair> = {
    title: 'Components/Pair',
    component: Pair,
    tags: ['autodocs'],
    args: {
        pair: {
            state: PairState.ALIVE,
            pokemon1: {
                pokemon: bulbasour,
                types: [],
            },
            pokemon2: {
                pokemon: charmander,
                types: [],
            },
            caughtOnRoute: 'Route 1',
        },
    },
};

export default meta;

type Story = StoryObj<typeof Pair>;

export const Default: Story = {};
export const WithDeadPairState: Story = {
    args: {
        pair: {
            state: PairState.DEAD,
            pokemon1: {
                pokemon: bulbasour,
                types: [],
            },
            pokemon2: {
                pokemon: charmander,
                types: [],
            },

            caughtOnRoute: 'Route 1',
        },
    },
};
