import { AddPairForm } from "@/components/add-pair-form";
import { LocationClient, PokemonClient } from "pokenode-ts";

export default async function AddPair() {
    const locationApi = new LocationClient();
    const pokemonApi = new PokemonClient();

    // Fetch locations
    const regionRes = await locationApi.getRegionByName("kanto")
    const locations = regionRes.locations.map((location) => {
        const cleaned = location.name
            .replaceAll('-', ' ')
            .replace('kanto', '') // TODO: Replace by selected region
            .trim();
        
        return cleaned.charAt(0).toUpperCase() + cleaned.slice(1)

    })

    // Fetch Pokemon list (first 151 for Kanto region)
    const pokemonListRes = await pokemonApi.listPokemons(0, 151); // TODO: Replace by selected game.
    const pokemonList = pokemonListRes.results.map((pokemon) => {
        return pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
    });

    return (
        <AddPairForm locations={locations} pokemonList={pokemonList} />
    )
}