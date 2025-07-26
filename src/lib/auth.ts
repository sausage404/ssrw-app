import NextAuth, { NextAuthConfig } from "next-auth"
import CredentialsProvider from 'next-auth/providers/credentials'
import { prisma } from './prisma'
import bcrypt from 'bcryptjs'
import { UserRole } from "@prisma/client"

export const config: NextAuthConfig = {
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' }
            },
            async authorize(credentials) {
                try {
                    if (!credentials?.email || !credentials?.password) {
                        return null
                    }

                    const user = await prisma.user.findUnique({
                        where: {
                            email: credentials.email as string
                        }
                    })

                    if (!user) {
                        return null
                    }

                    const isPasswordValid = await bcrypt.compare(
                        credentials.password as string,
                        user.password
                    )

                    if (!isPasswordValid) {
                        return null
                    }

                    // ไม่ส่ง password กลับไป
                    const { password, ...userWithoutPassword } = user
                    return userWithoutPassword

                } catch (error) {
                    console.error('Authentication error:', error)
                    return null
                }
            }
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: 'jwt'
    },
    debug: process.env.NODE_ENV !== "production",
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id
                token.role = user.role
            }
            return token
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string
                session.user.role = token.role as UserRole
            }
            return session
        },
        async redirect({ baseUrl }) {
            return baseUrl
        },
    },
    pages: {
        signIn: '/auth'
    }
}

export const { handlers, auth, signIn, signOut } = NextAuth(config);