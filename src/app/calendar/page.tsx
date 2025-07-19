"use client"

export default () => {
    return (
        <div className="container-fluid mx-auto w-full border-x border-dashed min-h-[83.9dvh]">
            <div className="border-b border-dashed p-8 space-y-4">
                <h1 className="text-2xl font-bold leading-tight tracking-tighter sm:text-3xl md:text-4xl lg:leading-[1.5]">
                    ปฏิทินงาน
                </h1>
            </div>
            <div className="w-full p-6">
                <iframe
                    className="w-full rounded-lg h-[60vh] border-0"
                    src="https://calendar.google.com/calendar/embed?src=parinya.pantimit%40gmail.com&ctz=Asia%2FBangkok&theme=1"
                    style={{ border: 0 }} width="800" height="600" frameBorder="0" scrolling="no"
                />
            </div>
        </div>
    )
}