
import { JoinRun } from '@/components/joinRun';
import { RunGrid } from '@/components/runGrid/RunGrid';
import { RunData } from '@/stores/runsStore';
import { Database } from '@/types/database.types';
import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';

export default async function Runs() {
    const supabase = await createClient<Database>();
    const userId = (await supabase.auth.getUser()).data.user?.id;

    if (userId === undefined) {
        return;
    }

    const { data, error } = await supabase
        .from('player_runs')
        .select('run(*)')
        .eq('player_uuid', userId);

    const playerRuns = data?.map((dbResult) => {
        // TODO: Region needs to be added.
        return {
            id: dbResult.run?.id ?? '',
            gameName: dbResult.run?.game_name ?? '',
            generation: dbResult.run?.generation ?? '',
            playerOne: dbResult.run?.player_one ?? '',
            playerTwo: dbResult.run?.player_two ?? '',
            isPlayable: dbResult.run?.is_playable ?? false,
            region: dbResult.run?.region,
        };
    }) as unknown as RunData[];

    return (
        <>
            <Link href="/runs/create">Create new run</Link>
            <JoinRun />
            <RunGrid playerRuns={playerRuns} />
        </>
    );
}
