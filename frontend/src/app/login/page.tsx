import { LoginForm } from '@/components/loginForm';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export default async function LoginPage() {
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();
    if (user) {
        redirect('/runs');
    }

    // Build the OAuth URL for Discord
    return <LoginForm />;
}
