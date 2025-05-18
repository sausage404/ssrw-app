"use server";

import user from '@/schema/user';
import { SheetBase } from './sheet';
import axios from 'axios';
import { z } from 'zod';

export type UserData = Omit<{
    iat?: number;
    exp?: number;
} & SheetBase<z.infer<typeof user.user>>, 'password'>;

export interface AuthResponse {
    success: boolean;
    message: string;
    user?: UserData;
}

export const signIn = async (credentials: z.infer<typeof user.credentials>) => {
    const { data } = await axios.post<AuthResponse>(`${process.env.BASE_URL}/api/auth/signin`, credentials);
    return data;
}

export const signOut = async () => {
    const { data } = await axios.post<AuthResponse>(`${process.env.BASE_URL}/api/auth/signout`);
    return data;
}

export const auth = async () => {
    const response = await axios.get<AuthResponse>(`${process.env.BASE_URL}/api/auth/me`);
    return response.data;
}