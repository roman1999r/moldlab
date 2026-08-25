// import { createContext, useContext, useEffect, useState } from 'react';
// import { supabase } from '../lib/supabase';
//
// const AuthContext = createContext(null);
//
// export function AuthProvider({ children }) {
//     const [user, setUser] = useState(null);
//     const [profile, setProfile] = useState(null);
//     const [loading, setLoading] = useState(true);
//
//     async function loadProfile(currentUser) {
//         if (!currentUser) {
//             setProfile(null);
//             return;
//         }
//
//         const { data, error } = await supabase
//             .from('profiles')
//             .select('*')
//             .eq('id', currentUser.id)
//             .single();
//
//         if (error) {
//             console.error('PROFILE ERROR:', error);
//             setProfile(null);
//             return;
//         }
//
//         setProfile(data);
//     }
//
//     useEffect(() => {
//         let mounted = true;
//
//         async function init() {
//             const {
//                 data: { session }
//             } = await supabase.auth.getSession();
//
//             if (!mounted) return;
//
//             const currentUser = session?.user ?? null;
//
//             setUser(currentUser);
//
//             if (currentUser) {
//                 await loadProfile(currentUser);
//             }
//
//             setLoading(false);
//         }
//
//         init();
//
//         const {
//             data: { subscription }
//         } = supabase.auth.onAuthStateChange(async (_event, session) => {
//             const currentUser = session?.user ?? null;
//
//             setUser(currentUser);
//
//             if (currentUser) {
//                 await loadProfile(currentUser);
//             } else {
//                 setProfile(null);
//             }
//
//             setLoading(false);
//         });
//
//         return () => {
//             mounted = false;
//             subscription.unsubscribe();
//         };
//     }, []);
//
//     async function signOut() {
//         await supabase.auth.signOut();
//     }
//
//     return (
//         <AuthContext.Provider
//             value={{
//                 user,
//                 profile,
//                 loading,
//                 isAdmin: profile?.role === 'admin',
//                 signOut
//             }}
//         >
//             {children}
//         </AuthContext.Provider>
//     );
// }
//
// export function useAuth() {
//     return useContext(AuthContext);
// }
import {
    createContext,
    useContext,
    useEffect,
    useState
} from 'react';

import { supabase } from '../lib/supabase';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [profile, setProfile] = useState(null);
    const [user, setUser] = useState(null);
    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(true);

    async function loadProfile(currentUser) {
        if (!currentUser) {
            setProfile(null);
            return null;
        }

        const {
            data,
            error
        } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', currentUser.id)
            .maybeSingle();

        if (error) {
            console.error(
                'PROFILE ERROR:',
                error
            );

            setProfile(null);

            return null;
        }

        setProfile(data ?? null);

        return data;
    }

    useEffect(() => {
        let mounted = true;

        async function loadSession() {
            try {
                const {
                    data,
                    error
                } = await supabase.auth.getSession();

                if (error) {
                    console.error(
                        'GET SESSION ERROR:',
                        error
                    );
                }

                if (!mounted) return;

                const currentSession =
                    data?.session ?? null;

                const currentUser =
                    currentSession?.user ?? null;

                setSession(currentSession);
                setUser(currentUser);

                await loadProfile(currentUser);

            } catch (error) {
                console.error(
                    'SESSION ERROR:',
                    error
                );
            } finally {
                if (mounted) {
                    setLoading(false);
                }
            }
        }

        loadSession();

        const {
            data: listener
        } = supabase.auth.onAuthStateChange(
            async (_event, newSession) => {
                if (!mounted) return;

                const currentSession =
                    newSession ?? null;

                const currentUser =
                    currentSession?.user ?? null;

                setSession(currentSession);
                setUser(currentUser);

                await loadProfile(currentUser);

                if (mounted) {
                    setLoading(false);
                }
            }
        );

        return () => {
            mounted = false;

            listener?.subscription?.unsubscribe();
        };
    }, []);

    async function logout() {
        const {
            error
        } = await supabase.auth.signOut();

        if (error) {
            console.error(
                'LOGOUT ERROR:',
                error
            );

            return;
        }

        setUser(null);
        setSession(null);
        setProfile(null);
    }

    const role =
        profile?.role ?? 'user';

    const isAdmin =
        profile?.role === 'admin';

    return (
        <AuthContext.Provider
            value={{
                user,
                session,
                profile,
                role,
                isAdmin,
                loading,
                logout,
                isAuthenticated: !!user
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context =
        useContext(AuthContext);

    if (!context) {
        throw new Error(
            'useAuth must be used inside AuthProvider'
        );
    }

    return context;
}