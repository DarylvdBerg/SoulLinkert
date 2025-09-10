import { PairGrid } from '@/components/pairGrid';
import { Database } from '@/types/database.types';
import { PairData } from '@/types/pair';
import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';

export default async function Run({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const client = await createClient<Database>();

    const { data, error } = await client.from('pair').select().eq('run_uuid', id);

    const pairData = data?.map((dbResult) => {
        const pairStringData = dbResult.pair_data?.toString();
        if (pairStringData === undefined) {
            return;
        }
        const pair: PairData = JSON.parse(pairStringData);
        pair.id = dbResult.id; // Set id separate since it is not in the json.
        return pair;
    }) as unknown as PairData[];

    return (
        <>
            <Link href={`${id}/add`}>Add pair</Link>
            <PairGrid runId={id} runPairs={pairData} />
        </>
    );
}
