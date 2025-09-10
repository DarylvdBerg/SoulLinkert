'use server';

import { createClient } from '../supabase/server';
import { Database } from '@/types/database.types';

export async function joinGameAction(runId: string) {
    const client = await createClient<Database>();
    const user = (await client.auth.getUser()).data.user;

    // validate that the game the user wants to join exists
    const { data, error } = await client.from('player_runs').select("*").eq('run_uuid', runId);
    if (error !== null) {
        return false; // TODO: should be object with error message
    }

    const runData = data
    if (runData === undefined || runData === null) {
        return false; // TODO: should be object with error message
    }

    if(runData.length >= 2) {
        return false; // Game is full;
    }

    const playerAlreadyInRun = runData.find((playerRun: any) => playerRun.player_uuid === user?.id);
    if (playerAlreadyInRun !== undefined) {
        return false; // Player is already in the run
    }

    const { addError } = await client
        .from('player_runs')
        .insert([{ run_uuid: runId, player_uuid: user!.id }])
        .select();

    if (addError !== null) {
        return false; // TODO: should be object with error message
    }

    const { error }  = await client
        .from('run')
        .update({ is_playable: true })
        .eq('id', runId);

    if (error !== null) {
        return false; // TODO: should be object with error message
    }

    return true;
}


