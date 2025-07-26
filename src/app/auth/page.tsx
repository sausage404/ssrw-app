import Client from "./client"

export const metadata = {
    title: "Auth"
}

export default async ({
    searchParams
}: {
    searchParams: Promise<{ error: string | null }>
}) => {
    const { error } = await searchParams
    return <Client error={error} />
}