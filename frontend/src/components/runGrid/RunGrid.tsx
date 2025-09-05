'use client';

import { Run, useRunStore } from '@/stores/runsStore';
import { Flex, Grid, GridItem, LinkBox, LinkOverlay, Text } from '@chakra-ui/react';
import { JSX } from 'react';

export const RunGrid = (): JSX.Element => {
    const { runs } = useRunStore();

    return (
        <>
            <Grid templateColumns={'repeat(12, 1fr)'}>
                {runs.map((run: Run, index: number) => (
                    <GridItem key={`run-${index}`} colSpan={4}>
                        <LinkBox>
                            <Flex direction={'column'}>
                                <Text>Game name: {run.gameName}</Text>
                                <Text>Player one: {run.playerOne}</Text>
                                <Text>Player two: {run.playerTwo}</Text>
                                <Text>Generation: {run.generation}</Text>
                                <LinkOverlay href={`/runs/${run.identifier}`} />
                            </Flex>
                        </LinkBox>
                    </GridItem>
                ))}
            </Grid>
        </>
    );
};
