import Client from "./client";

export const metadata = {
    title: 'Auth',
};

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store'

export default function Page() {
    return <Client />;
}
