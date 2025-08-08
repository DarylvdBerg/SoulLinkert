'use client';

import { Run, useRunStore } from "@/stores/runsStore";
import { Flex, Grid, GridItem, Text } from "@chakra-ui/react";
import Link from "next/link";
import { JSX } from "react";

export const RunGrid = () : JSX.Element => {

    const { runs } = useRunStore();

    return (
        <Grid templateColumns={'repeat(12, 1fr)'}>
            {runs.map((run: Run, index: number) => (
                <GridItem key={`run-${index}`} colSpan={4}>
                    <Flex direction={'column'}>
                        <Text>{run.game}</Text>
                        <Text>{run.playerOne}</Text>
                        <Text>{run.playerTwo}</Text>
                        <Link href={`/${run.identifier}`} />
                    </Flex>
                </GridItem>
            ))}
        </Grid>
    )
}