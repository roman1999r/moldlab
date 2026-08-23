import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    async function loadProfile(currentUser) {
        if (!currentUser) {
            setProfile(null);
            return;
        }

        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', currentUser.id)
            .single();

        if (error) {
            console.error('PROFILE ERROR:', error);
            setProfile(null);
            return;
        }

        setProfile(data);
    }

    useEffect(() => {
        let mounted = true;

        async function init() {
            const {
                data: { session }
            } = await supabase.auth.getSession();

            if (!mounted) return;

            const currentUser = session?.user ?? null;

            setUser(currentUser);

            if (currentUser) {
                await loadProfile(currentUser);
            }

            setLoading(false);
        }

        init();

        const {
            data: { subscription }
        } = supabase.auth.onAuthStateChange(async (_event, session) => {
            const currentUser = session?.user ?? null;

            setUser(currentUser);

            if (currentUser) {
                await loadProfile(currentUser);
            } else {
                setProfile(null);
            }

            setLoading(false);
        });

        return () => {
            mounted = false;
            subscription.unsubscribe();
        };
    }, []);

    async function signOut() {
        await supabase.auth.signOut();
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                profile,
                loading,
                isAdmin: profile?.role === 'admin',
                signOut
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}