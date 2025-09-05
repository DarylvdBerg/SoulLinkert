'use client';

import { createClient } from '@/utils/supabase/client';
import { Button, Flex, Heading } from '@chakra-ui/react';
import { Provider } from '@supabase/supabase-js';
import { JSX } from 'react';

export const LoginForm = (): JSX.Element => {
    const supabase = createClient();
    const ProviderLogin = ({ provider }: { provider: Provider }) => {
        async function providerLogin() {
            await supabase.auth.signInWithOAuth({
                provider,
                options: {
                    redirectTo: `${window.location.origin}/auth/callback`,
                },
            });
        }

        return (
            <Button padding="2" onClick={() => providerLogin()}>
                Sign in with {provider}
            </Button>
        );
    };

    return (
        <Flex h="80vh" direction={'column'} alignItems={'center'} justifyContent={'center'} gap={4}>
            <Heading>Choose on of the login options.</Heading>
            <ProviderLogin provider={'discord'} />
        </Flex>
    );
};

export default LoginForm;
