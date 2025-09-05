'use client';

import { Button, Flex, Heading, Text } from '@chakra-ui/react';
import { JSX, useState } from 'react';
import { Selector } from '../selector';
import { usePairStore } from '@/stores/pairStore';
import { PokemonClient } from 'pokenode-ts';
import { PairData, PokemonWrapper, TypeExtended } from '@/types/pair';
import { PairState } from '../pair/Pair';
import { useRouter } from 'next/navigation';

export const AddPairForm = ({
    locations,
    pokemonList,
}: {
    locations: string[];
    pokemonList: string[];
}): JSX.Element => {
    const { addPair } = usePairStore();
    const router = useRouter();

    const [location, setLocation] = useState<string>();
    const [pokemonOne, setPokemonOne] = useState<string>();
    const [pokemonTwo, setPokemonTwo] = useState<string>();
    const [hideError, setHideError] = useState<boolean>(true);

    const pokemonClient = new PokemonClient();

    const fetchPokemon = async (pokemon: string): Promise<PokemonWrapper> => {
        const pkmn = await pokemonClient.getPokemonByName(pokemon);
        const types = (await Promise.all(
            pkmn.types.map(async (type) => await pokemonClient.getTypeByName(type.type.name)),
        )) as TypeExtended[];

        return {
            pokemon: pkmn,
            types: types,
        };
    };

    async function addPairOnSubmit() {
        if (
            location === '' ||
            location == undefined ||
            pokemonOne === '' ||
            pokemonOne === undefined ||
            pokemonTwo === '' ||
            pokemonTwo === undefined
        ) {
            setHideError(false);
            return;
        }

        setHideError(true); // Reset if data is valid.

        var pkmnOne = await fetchPokemon(pokemonOne);
        var pkmnTwo = await fetchPokemon(pokemonTwo);

        const pair: PairData = {
            pokemon1: pkmnOne,
            pokemon2: pkmnTwo,
            state: PairState.ALIVE,
            caughtOnRoute: location,
        };

        addPair(pair);
        router.back();
    }

    return (
        <Flex direction="column" gap={4}>
            <Heading alignSelf="center">New pair</Heading>
            <Text color="red" alignSelf="center" hidden={hideError}>
                Unable to add pair, please check if all data is filled in.
            </Text>
            <Selector
                collection={locations}
                selectLabel="Location caught"
                selectValueText="Pokemon caught on.."
                onSelectCallCapture={setLocation}
            />
            <Selector
                collection={pokemonList}
                selectLabel="Pokemon 1"
                selectValueText="Select which pokemon was caught"
                onSelectCallCapture={setPokemonOne}
            />
            <Selector
                collection={pokemonList}
                selectLabel="Pokemon 2"
                selectValueText="Select which pokemon was caught"
                onSelectCallCapture={setPokemonTwo}
            />
            <Button w="80%" alignSelf="center" onClick={addPairOnSubmit}>
                Add pair
            </Button>
        </Flex>
    );
};

export default AddPairForm;
