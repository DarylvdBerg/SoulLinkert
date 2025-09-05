'use client';

import { RunData, useRunStore } from '@/stores/runsStore';
import { Flex, Grid, GridItem, LinkBox, LinkOverlay, Text } from '@chakra-ui/react';
import { JSX, useEffect } from 'react';

export const RunGrid = ({ playerRuns }: { playerRuns: RunData[] }): JSX.Element => {
    const { runs, createRun } = useRunStore();

    useEffect(() => {
        if (runs.length === 0) {
            playerRuns.map((run) => {
                createRun(run);
            });
        }
    }, []);

    return (
        <>
            <Grid templateColumns={'repeat(12, 1fr)'}>
                {runs.map((run: RunData, index: number) => (
                    <GridItem key={`run-${index}`} colSpan={4}>
                        <LinkBox>
                            <Flex direction={'column'}>
                                <Text>Game ID: {run.id}</Text>
                                <Text>Game name: {run.gameName}</Text>
                                <Text>Player one: {run?.playerOne ?? ''}</Text>
                                <Text>Player two: {run?.playerTwo ?? ''}</Text>
                                <Text>Generation: {run.generation}</Text>
                                {!run.isPlayable && <LinkOverlay href={`/runs/${run.id}`} />}
                            </Flex>
                        </LinkBox>
                    </GridItem>
                ))}
            </Grid>
        </>
    );
};
