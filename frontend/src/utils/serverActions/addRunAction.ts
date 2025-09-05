'use server';

import { RunData } from '@/stores/runsStore';
import { createClient } from '../supabase/server';
import { AddPlayerRunAction } from './addPlayerRunAction';
import { User } from '@supabase/supabase-js';
import { Database } from '@/types/database.types';

export async function addRunAction(run: RunData, user: User) {
    const client = await createClient<Database>();
    const { data, error } = await client
        .from('run')
        .insert([
            {
                game_name: run.gameName,
                generation: run.generation,
                player_one: user.user_metadata.full_name,
                region: run.region,
            },
        ])
        .select();

    if (error !== null) {
        console.error(error);
        return false;
    }

    const identifier = data?.[0].id;
    const runCreated = await AddPlayerRunAction(identifier, user.id);

    return runCreated;
}
