'use client';

import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import { Button } from '@chakra-ui/react';

export default function SignOutButton() {
    const supabase = createClient();
    const router = useRouter();

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        router.push('/login');
    };

    return (
        <Button colorScheme="red" variant="outline" size="sm" padding={2} onClick={handleSignOut}>
            Sign Out
        </Button>
    );
}
