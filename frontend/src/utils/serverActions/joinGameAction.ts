'use server';

import { createClient } from '../supabase/server';
import { Database } from '@/types/database.types';

export async function joinGameAction(runId: string) {
    const client = await createClient<Database>();
}
