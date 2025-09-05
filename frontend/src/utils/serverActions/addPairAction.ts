'use server';

import { PairData } from '@/types/pair';
import { createClient } from '../supabase/server';
import { Database } from '@/types/database.types';

export default async function AddPairAction(runId: string, pair: PairData) {
    const client = await createClient<Database>();
    const pairJson = JSON.stringify(pair);

    const { data, error } = await client.from('pair').insert([
        {
            run_uuid: runId,
            pair_data: pairJson,
        },
    ]);

    return error === null;
}
