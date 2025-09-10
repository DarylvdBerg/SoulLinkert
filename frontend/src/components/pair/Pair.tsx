import { PairData, PokemonWrapper } from '@/types/pair';
import { Button, chakra, Flex, Image, Text } from '@chakra-ui/react';
import { JSX } from 'react';
import { usePairStore } from '@/stores/pairStore';
import { createClient } from '@/utils/supabase/client';
import { Database } from '@/types/database.types';
import UpdatePairAction from '@/utils/serverActions/updatePairAction';

export enum PairState {
    ALIVE,
    DEAD,
}

export const Pair = ({ pair, index }: { pair: PairData; index: number }): JSX.Element => {
    const { updatePair } = usePairStore();

    async function RipPair(){
        const updatedPair = { ...pair, state: PairState.DEAD };
        const success = await UpdatePairAction(updatedPair);
        
        if(success){
            updatePair(index, updatedPair);
        }
    };

    const TypeSprites = (wrapper: PokemonWrapper) => {
        if (wrapper.types.length > 1) {
            return (
                <Flex direction={'row'}>
                    <Image
                        src={wrapper.types[0].sprites['generation-iv']['diamond-pearl'].name_icon}
                    />
                    <Image
                        src={wrapper.types[1].sprites['generation-iv']['diamond-pearl'].name_icon}
                    />
                </Flex> // TODO: Fix with generation and game.
            );
        } else {
            return (
                <Image src={wrapper.types[0].sprites['generation-iv']['diamond-pearl'].name_icon} />
            );
        }
    };

    const PairSpot = (wrapper: PokemonWrapper) => {
        return (
            <Flex justifyContent={'center'} dir="column">
                <Flex direction={'column'} justifyContent={'center'} alignItems={'center'}>
                    <Text fontWeight={'bold'}>{wrapper.pokemon.name}</Text>
                    <Image
                        src={wrapper.pokemon.sprites.front_default ?? ''}
                        filter={pair.state == PairState.DEAD ? 'grayscale(1)' : ''}
                    />
                    {wrapper.types.length !== 0 && TypeSprites(wrapper)}
                </Flex>
            </Flex>
        );
    };

    return (
        <Flex borderRadius={2} p="6" gap={2.5} backgroundColor="rgba(255, 255, 255, 0.5)">
            <Flex direction={'column'} alignItems="center" gap="2">
                <Text>
                    <chakra.span fontWeight={'bold'}>Caught at: </chakra.span>
                    {pair.caughtOnRoute}
                </Text>
                <Flex direction="row" gapX={3}>
                    {PairSpot(pair.pokemon1)}
                    {PairSpot(pair.pokemon2)}
                </Flex>
                <Text>
                    <chakra.span>State: </chakra.span>
                    {PairState[pair.state]}
                </Text>
                <Button w="100%" onClick={RipPair} disabled={pair.state === PairState.DEAD}>
                    RIP
                </Button>
            </Flex>
        </Flex>
    );
};
