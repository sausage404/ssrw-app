import Client from "./client";

export const metadata = {
    title: 'Auth'
}

export default async (params: Promise<{ searchParams: { from: string } }>) => {
    return <Client from={(await params).searchParams?.from} />
}