"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import Turnstile from "react-turnstile";

export default ({
    onChange
}: {
    onChange: (result: boolean) => void
}) => {
    const [token, setToken] = useState("");

    useEffect(() => {
        (async () => {
            const { data } = await axios.post("/api/verify-turnstile", { token }, {
                headers: { "Content-Type": "application/json" }
            });

            onChange(data.success);
        })()
    }, [token]);

    return (
        <Turnstile
            sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
            onSuccess={(token) => setToken(token)}
            onExpire={() => setToken("")}
            theme="auto"
        />
    );
}
