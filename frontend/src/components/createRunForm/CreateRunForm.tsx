'use client';

import { Run, useRunStore } from '@/stores/runsStore';
import { v4 as uuidv4 } from 'uuid';
import { JSX, useState } from 'react';
import { Generation } from 'pokenode-ts';
import { Button, Flex, Heading, Text } from '@chakra-ui/react';
import { Selector } from '../selector';
import { FormField } from '../formField';
import { useRouter } from 'next/navigation';

export const CreateRunForm = ({ generations }: { generations: Generation[] }): JSX.Element => {
    const { createRun } = useRunStore();
    const router = useRouter();

    const [region, setRegion] = useState<string>();
    const [gameName, setGameName] = useState<string>();
    const [hasError, setHasError] = useState<boolean>(false);

    // We'll somehow need to relate the players to some kind of actual user.
    const [playerOne, setPlayerOne] = useState<string>();
    const [playerTwo, setPlayerTwo] = useState<string>();

    const regionNames = generations.map((gen) => gen.main_region.name);

    const validateField = (value: string | undefined): boolean => {
        return value === '' || value === null || value === undefined;
    };

    const submitCreateRun = () => {
        setHasError(false);
        const guid = uuidv4();
        const selectedRegion = generations.find((gen) => gen.main_region.name == region);
        if (selectedRegion === null || selectedRegion === undefined) {
            setHasError(true);
            return;
        }

        if (validateField(playerOne) || validateField(playerTwo) || validateField(gameName)) {
            setHasError(true);
            return;
        }

        const run: Run = {
            identifier: guid,
            generation: selectedRegion.name,
            region: selectedRegion.main_region.name,
            gameName: gameName!,
            playerOne: playerOne!,
            playerTwo: playerTwo!,
        };

        createRun(run);
        router.back();
    };

    return (
        <Flex direction="column">
            <Heading>Create a new Run</Heading>
            <Text color="red" alignSelf="center" hidden={!hasError}>
                Unable to create a new run, please check if all data was filled correctly.
            </Text>
            <Selector
                collection={regionNames}
                selectLabel="Pick the region for the game you're playing"
                onSelectCallCapture={setRegion}
                selectValueText={'Playing in region...'}
            />
            <FormField
                label="Game name"
                isRequired={true}
                onFieldValueChangeCallback={setGameName}
            />
            <FormField
                label="Player one name"
                isRequired={true}
                onFieldValueChangeCallback={setPlayerOne}
            />
            <FormField
                label="Player two name"
                isRequired={true}
                onFieldValueChangeCallback={setPlayerTwo}
            />
            <Button onClick={submitCreateRun}>Create run</Button>
        </Flex>
    );
};

export default CreateRunForm;
