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
    signIn: (credentials: z.infer<typeof user.credentials>) => Promise<{ success: boolean; error?: string }>;
    signOut: () => Promise<void>;
    clearError: () => void;
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
                setState({
                    auth: data,
                    loading: false,
                    error: null
                });
            } catch (error) {
                console.error('Auth check failed:', error);
                setState({
                    auth: null,
                    loading: false,
                    error: 'Failed to verify authentication'
                });
            }
        };

        checkAuth();
    }, []);

    const login = async (credentials: z.infer<typeof user.credentials>) => {
        setState(prev => ({ ...prev, loading: true, error: null }));

        try {
            const data = await signIn(credentials);

            if (!data) {
                setState(prev => ({
                    ...prev,
                    loading: false,
                    error: 'Authentication failed'
                }));
                return { success: false, error: 'Authentication failed' };
            }

            setState({
                auth: data,
                loading: false,
                error: null
            });

            return { success: true };

        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Login failed';
            setState(prev => ({
                ...prev,
                auth: null,
                loading: false,
                error: errorMessage
            }));
            return { success: false, error: errorMessage };
        }
    };

    const logout = async () => {
        setState(prev => ({ ...prev, loading: true }));

        try {
            await deleteSession();
            setState({
                auth: null,
                loading: false,
                error: null
            });
            router.push("/auth");
        } catch (error) {
            console.error('Logout failed:', error);
            setState(prev => ({
                ...prev,
                loading: false,
                error: 'Logout failed'
            }));
        }
    };

    const refresh = async (data: Auth) => {
        setState(prev => ({ ...prev, loading: true }));

        try {
            await updateSession(data);
            setState({
                auth: data,
                loading: false,
                error: null
            });
        } catch (error) {
            console.error('Session refresh failed:', error);
            setState({
                auth: null,
                loading: false,
                error: 'Session refresh failed'
            });
        }
    };

    const clearError = () => {
        setState(prev => ({ ...prev, error: null }));
    };

    return (
        <AuthContext.Provider value={{ 
            ...state, 
            signIn: login, 
            refresh, 
            signOut: logout,
            clearError 
        }}>
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