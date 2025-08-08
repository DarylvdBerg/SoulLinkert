'use client';

import { usePairStore } from "@/stores/pairStore";
import { PairData } from "@/types/pair";
import { Grid, GridItem } from "@chakra-ui/react";
import { JSX } from "react";
import { Pair } from "../pair/Pair";

export const PairGrid = () : JSX.Element => {

    const { pairs } = usePairStore();

    return (
        <Grid templateColumns='repeat(12, 1fr)' gap="6">
            {pairs?.map((pair: PairData, index: number) => (
                <GridItem colSpan={3} key={`pair-${index}`}>
                    <Pair pair={pair} index={index}/>
                </GridItem>
            ))}
        </Grid>
    )
}

export default PairGrid;