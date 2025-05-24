import Client from "./client";

export const metadata = {
    title: 'Auth'
}

export default async (params: { searchParams: Promise<{ from: string }> }) => {
    return <Client from={(await params.searchParams).from} />
}