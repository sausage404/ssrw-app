"use client";

import React from "react";
import Link from "next/link"
import { useTheme } from "next-themes";
import { MonitorCogIcon, MoonIcon, SunIcon } from "lucide-react";
import { Button } from "../ui/button";
import HeaderAuth from "./header-auth";

export default () => {
    const { theme, setTheme } = useTheme();

    const [mounted, setMounted] = React.useState(false);

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
                    <HeaderAuth />
                </div>
            </nav>
        </header>
    )
}