"use client";

import { useTheme } from "next-themes";
import Link from "next/link"
import { Button } from "../ui/button";
import { MonitorCogIcon, MoonIcon, SunIcon, UserIcon } from "lucide-react";
import React from "react";
import { useAuth } from "../context/use-auth";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";

export default () => {
    const { theme, setTheme } = useTheme();

    const [mounted, setMounted] = React.useState(false);

    const { auth, loading, signOut } = useAuth();

    React.useEffect(() => {
        setMounted(true);
    }, []);

    const renderIcon = () => {
        if (!mounted) return <MonitorCogIcon className="h-4 w-4" />

        switch (theme) {
            case "light":
                return <SunIcon className="h-4 w-4" />
            case "dark":
                return <MoonIcon className="h-4 w-4" />
            default:
                return <MonitorCogIcon className="h-4 w-4" />
        }
    }

    return (
        <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-dashed w-full">
            <nav className="container-fluid mx-auto w-full flex h-[8dvh] items-center justify-between gap-2 md:gap-4 px-2 sm:px-3 border-x border-dashed">
                <div className="items-center w-full gap-3">
                    <Link href="/" className="flex items-center gap-3 font-bold">
                        <img src="/favicon.ico" alt="logo" className="w-8 h-8" />
                        โรงเรียนศรีสองรักษ์วิทยา
                    </Link>
                    <div className="flex items-center gap-3">

                    </div>
                </div>
                <div className="flex items-center">
                    <Button
                        variant="ghost"
                        size="icon-sm"
                        onClick={() => setTheme(theme === "light" ? "dark" : theme === "dark" ? "system" : "light")}
                    >
                        {renderIcon()}
                    </Button>
                    {loading ? (
                        <Button variant="ghost" size="icon-sm">
                            <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        </Button>
                    ) : auth ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon-sm">
                                    <UserIcon className="w-6 h-6" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem>
                                    {auth.prefix}{auth.firstName} {auth.lastName}
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
                    )}
                </div>
            </nav>
        </header>
    )
}