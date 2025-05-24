'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { signIn } from '@/lib/auth';
import user from '@/schema/user';
import { z } from 'zod';
import { deleteSession, getCurrentUser, Auth, updateSession } from '@/lib/session';
import { useRouter } from 'next/navigation';

export interface AuthState {
    auth: Auth | null;
    loading: boolean;
    error: string | null;
}

export interface AuthContextType extends AuthState {
    refresh: (data: Auth) => Promise<void>;
    signIn: (credentials: z.infer<typeof user.credentials>) => Promise<void>;
    signOut: () => Promise<void>;
}

const initialState: AuthState = {
    auth: null,
    loading: true,
    error: null
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [state, setState] = useState<AuthState>(initialState);

    const router = useRouter();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const data = await getCurrentUser();

                if (data) {
                    setState({
                        auth: data,
                        loading: false,
                        error: null
                    });
                } else {
                    setState({
                        auth: null,
                        loading: false,
                        error: null
                    });
                }
            } catch (error) {
                setState({
                    auth: null,
                    loading: false,
                    error: null
                });
            }
        };

        checkAuth();
    }, []);

    const login = async (credentials: z.infer<typeof user.credentials>) => {
        setState({ ...state, loading: true, error: null });

        try {
            const data = await signIn(credentials);

            if (!data)
                return;

            setState({
                auth: data,
                loading: false,
                error: null
            });

        } catch (error) {
            setState({
                auth: null,
                loading: false,
                error: error instanceof Error ? error.message : 'Login failed'
            });
        }
    };

    const logout = async () => {
        setState({ ...state, loading: true });

        try {
            await deleteSession();

            setState({
                auth: null,
                loading: false,
                error: null
            });

            router.push("/auth");

        } catch (error) {
            setState({
                ...state,
                loading: false,
                error: 'Logout failed'
            });
        }
    };

    const refresh = async (data: Auth) => {
        setState({ ...state, loading: true });

        try {
            await updateSession(data);

            if (data) {
                setState({
                    auth: data,
                    loading: false,
                    error: null
                });
            } else {
                setState({
                    auth: null,
                    loading: false,
                    error: null
                });
            }
        } catch (error) {
            setState({
                auth: null,
                loading: false,
                error: null
            });
        }
    };

    return (
        <AuthContext.Provider value={{ ...state, signIn: login, refresh, signOut: logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context;
};