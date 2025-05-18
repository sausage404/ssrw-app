"use client"

export default () => {
    return (
        <footer className="border-t border-dashed w-full h-[8dvh] text-sm">
            <div className="container-fluid mx-auto px-3 w-full border-x border-dashed h-full flex items-center">
                <div className="flex sm:flex-row flex-col text-center sm:justify-between w-full">
                    <p className="text-muted-foreground">Copyright © {new Date().getFullYear()} Srisongrak Wittaya School</p>
                    <p className="text-muted-foreground">All rights reserved</p>
                </div>
            </div>
        </footer>
    )
}