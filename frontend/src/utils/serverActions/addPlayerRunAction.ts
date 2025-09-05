import { createClient } from '../supabase/server';

export async function AddPlayerRunAction(runId: string, userId: string) {
    const client = await createClient();

    const { data, error } = await client.from('player_runs').insert([
        {
            run_uuid: runId,
            player_uuid: userId,
        },
    ]);

    return error === null;
}
