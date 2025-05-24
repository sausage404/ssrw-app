import Link from "next/link"
import { Button } from "@/components/ui/button"

export const metadata = {
    title: "404",
}

export default async function NotFound() {
    return (
        <div className="container-fluid border-x border-dashed mx-auto">
            <div className="flex flex-col items-center justify-center min-h-[calc(100vh-7rem)] px-4">
                <div className="space-y-6 text-center">
                    <h1 className="text-6xl font-extrabold tracking-tight lg:text-8xl">404</h1>
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Page not found</h2>
                    <p className="text-muted-foreground max-w-md mx-auto">
                        Sorry, we couldn't find the page you're looking for. It might have been moved, deleted, or never existed.
                    </p>
                    <Button asChild size="sm" variant="outline">
                        <Link href="/" className="gap-2">
                            Back to Home
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}
