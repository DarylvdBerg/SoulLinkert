import { createClient } from '@/utils/supabase/server';
import { Box, Flex } from '@chakra-ui/react';
import SignOutButton from '@/components/ui/SignOutButton';
import { redirect } from 'next/navigation';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        redirect('/login');
    }

    console.log(user);

    return (
        <Flex direction={'column'} minH="100vh">
            <Flex
                direction={'row'}
                justifyContent="flex-end"
                alignItems="center"
                p={4}
                borderBottom="1px solid #eee"
            >
                <SignOutButton />
            </Flex>
            <Box flex={1}>{children}</Box>
        </Flex>
    );
}
