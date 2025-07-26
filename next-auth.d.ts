import { Role, User as UserPrisma } from "@prisma/client";
import NextAuth, { DefaultSession } from "next-auth"

declare module "next-auth" {
    interface User {
        id: string;
        role: Role;
    }

    interface Session {
        user: User & DefaultSession["user"];
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id: string;
        role: Role;
    }
}