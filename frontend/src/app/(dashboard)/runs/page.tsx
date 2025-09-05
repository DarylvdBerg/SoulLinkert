import { RunGrid } from '@/components/runGrid/RunGrid';
import Link from 'next/link';

export default async function Runs() {
    // TODO: Paths should respect there parents
    return (
        <>
            <Link href="/runs/create">Create new run</Link>
            <RunGrid />
        </>
    );
}
