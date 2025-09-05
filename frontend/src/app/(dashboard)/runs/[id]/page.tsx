import { PairGrid } from '@/components/pairGrid';
import Link from 'next/link';

export default async function Run({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    return (
        <>
            <Link href={`${id}/add`}>Add pair</Link>
            <PairGrid />
        </>
    );
}
