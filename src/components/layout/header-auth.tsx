"use client";

import React, { useEffect } from "react";
import Link from "next/link"
import { Button } from "../ui/button";
import { UserIcon } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { User } from "@prisma/client";
import { getUserById } from "@/data/user";
import { signOut, useSession } from "next-auth/react";

export default () => {

    const { data, status } = useSession();

    const [user, setUser] = React.useState<User | null>(null);

    useEffect(() => {
        (async () => {
            setUser(await getUserById(data?.user?.id || ""));
        })()
    }, [data]);

    return status === "loading" ? (
        <Button variant="ghost" size="icon-sm">
            <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
        </Button>
    ) : status === "authenticated" && user ? (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon-sm">
                    <UserIcon className="w-6 h-6" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem>
                    {user.prefix}{user.firstName} {user.lastName}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <Link href="/setting">จัดการบัญชี</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => signOut()}>
                    ออกจากระบบ
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    ) : (
        <Button
            variant="default"
            size="sm"
            asChild
        >
            <Link href="/auth">เข้าสู่ระบบ</Link>
        </Button>
    )
}