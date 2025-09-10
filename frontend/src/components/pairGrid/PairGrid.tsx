'use client';

import { usePairStore } from '@/stores/pairStore';
import { PairData } from '@/types/pair';
import { Grid, GridItem } from '@chakra-ui/react';
import { JSX, useEffect } from 'react';
import { Pair } from '../pair/Pair';
import { Database } from '@/types/database.types';
import { createClient } from '@/utils/supabase/client';

export const PairGrid = ({ runId, runPairs }: { runId:string, runPairs: PairData[] }): JSX.Element => {
    const pairs = usePairStore((state) => state.pairs);
    const addPair = usePairStore((state) => state.addPair);
    const updatePair = usePairStore((state) => state.updatePair);
    const supabase = createClient<Database>();
   
    // Only add the pairs from the incoming runs once.
    useEffect(() => {
        if (pairs.length === 0) {
            runPairs.forEach((pair) => addPair(pair));
        }
        // Only run on mount or if pairs changes
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Ensure that if one of the run members adds a pair, it updates for all players.
    useEffect(() => {
        const channel = supabase
            .channel('schema-db-changes')
            .on('postgres_changes',
                {
                    event: 'INSERT',
                    schema: 'public',
                    table: 'pair',
                    filter: `run_uuid=eq.${runId}`
                },
                (payload) => {
                    const newPair = payload.new.pair_data as PairData;
                    if(newPair !== undefined && newPair){
                        addPair(newPair);
                    }
                }
            )
            .on('postgres_changes',
                {
                    event: 'UPDATE',
                    schema: 'public',
                    table: 'pair',
                    filter: `run_uuid=eq.${runId}`
                },
                (payload) => {
                    const updatedPair = payload.new.pair_data as PairData;
                    if(updatedPair !== undefined && updatedPair){
                        // Find the index of the pair to update
                        const index = pairs.findIndex((pair) => pair.id === updatedPair.id);
                        updatePair(index, updatedPair);
                    }
                }
            )
            .subscribe();
        return () => {
            supabase.removeChannel(channel);
        };
            
    }, [pairs])

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
