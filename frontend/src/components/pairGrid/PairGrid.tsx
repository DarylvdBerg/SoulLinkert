'use client';

import { usePairStore } from '@/stores/pairStore';
import { PairData } from '@/types/pair';
import { Grid, GridItem } from '@chakra-ui/react';
import { JSX, useEffect } from 'react';
import { Pair } from '../pair/Pair';

export const PairGrid = ({ runPairs }: { runPairs: PairData[] }): JSX.Element => {
    const pairs = usePairStore((state) => state.pairs);
    const addPair = usePairStore((state) => state.addPair);

    useEffect(() => {
        if (pairs.length === 0) {
            runPairs.forEach((pair) => addPair(pair));
        }
        // Only run on mount or if pairs changes
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Grid templateColumns="repeat(12, 1fr)" gap="6">
            {pairs?.map((pair: PairData, index: number) => (
                <GridItem colSpan={3} key={`pair-${index}`}>
                    <Pair pair={pair} index={index} />
                </GridItem>
            ))}
        </Grid>
    );
};

export default PairGrid;
