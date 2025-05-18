'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { signIn, signOut } from '@/lib/auth';
import user from '@/schema/user';
import { z } from 'zod';
import { getCurrentUser, UserData } from '@/lib/session';

export interface AuthState {
    user: UserData | null;
    loading: boolean;
    error: string | null;
}

export interface AuthContextType extends AuthState {
    signIn: (credentials: z.infer<typeof user.credentials>) => Promise<void>;
    signOut: () => Promise<void>;
}

const initialState: AuthState = {
    user: null,
    loading: true,
    error: null
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [state, setState] = useState<AuthState>(initialState);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const data = await getCurrentUser();

                if (data) {
                    setState({
                        user: data,
                        loading: false,
                        error: null
                    });
                } else {
                    setState({
                        user: null,
                        loading: false,
                        error: null
                    });
                }
            } catch (error) {
                setState({
                    user: null,
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
                user: data,
                loading: false,
                error: null
            });

        } catch (error) {
            setState({
                user: null,
                loading: false,
                error: error instanceof Error ? error.message : 'Login failed'
            });
        }
    };

    const logout = async () => {
        setState({ ...state, loading: true });

        try {
            await signOut();

            setState({
                user: null,
                loading: false,
                error: null
            });

        } catch (error) {
            setState({
                ...state,
                loading: false,
                error: 'Logout failed'
            });
        }
    };

    return (
        <AuthContext.Provider value={{ ...state, signIn: login, signOut: logout }}>
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