import { RunGrid } from '@/components/runGrid/RunGrid';
import { Run } from '@/stores/runsStore';
import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';

export default async function Runs() {
    const supabase = await createClient();
    const userId = (await supabase.auth.getUser()).data.user?.id;
    const { data, error } = await supabase
        .from('player_runs')
        .select('run(*)')
        .eq('player_uuid', userId);

    const playerRuns = data?.map((run) => run.run) as unknown as Run[];

    return (
        <>
            <Link href="/runs/create">Create new run</Link>
            <RunGrid playerRuns={playerRuns} />
        </>
    );
}
