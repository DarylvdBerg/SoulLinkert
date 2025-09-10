'use server';

import { PairData } from '@/types/pair';
import { createClient } from '../supabase/server';
import { Database } from '@/types/database.types';

export default async function UpdatePairAction(pair: PairData) {
    const client = await createClient<Database>();
    const pairJson = JSON.stringify(pair);

    const { data, error } = await client.from('pair').update(
        {
            pair_data: pairJson,
        }
    ).eq('id', pair.id!); // TODO Handle nullablity better.

    return error === null;
}
