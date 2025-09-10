import { AddPairForm } from '@/components/add-pair-form';
import { Database } from '@/types/database.types';
import { createClient } from '@/utils/supabase/server';
import { LocationClient, PokemonClient } from 'pokenode-ts';

export default async function AddPair({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const supabase = await createClient<Database>();

    const { data, error } = await supabase.from('run').select().eq('id', id);

    if (error) {
        console.error(error);
        return;
    }

    const region = data?.[0].region;
    if (region === undefined || region === null || region === '') {
        return;
    }

    const locationApi = new LocationClient();
    const pokemonApi = new PokemonClient();

    // Fetch locations
    const regionRes = await locationApi.getRegionByName(region);
    const locations = regionRes.locations.map((location) => {
        const cleaned = location.name
            .replaceAll('-', ' ')
            .replace(region, '') // TODO: Replace by selected region
            .trim();

        return cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
    });

    // Fetch Pokemon list (first 151 for Kanto region)
    const pokemonListRes = await pokemonApi.listPokemons(0, 151); // TODO: Replace by selected game.
    const pokemonList = pokemonListRes.results.map((pokemon) => {
        return pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
    });

    return <AddPairForm runId={id} locations={locations} pokemonList={pokemonList} />;
}
