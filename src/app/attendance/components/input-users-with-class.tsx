import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import user from "@/schema/user"
import { zodResolver } from "@hookform/resolvers/zod"
import { User } from "@prisma/client"
import axios from "axios"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

export default ({
    setStudents
}: {
    setStudents: React.Dispatch<React.SetStateAction<User[]>>
}) => {
    const form = useForm<z.infer<typeof user.withClass>>({
        resolver: zodResolver(user.withClass),
        defaultValues: {
            level: 0,
            room: 0
        }
    })

    const handleSubmit = (value: z.infer<typeof user.withClass>) => {
        toast.promise(async () => {
            const { data } = await axios.get("/api/data/user/with-class", { params: value });
            if (data.success) {
                setStudents(data.data);
            }
        }, {
            loading: "กําลังค้นหาผู้ใช้งาน",
            success: "ค้นหาผู้ใช้งานเรียบร้อย",
            error: "เกิดข้อผิดพลาดในการค้นหาผู้ใช้งาน"
        })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="grid grid-cols-3 items-end gap-4">
                <FormField
                    control={form.control}
                    name="level"
                    render={({ field: { value, onChange, ...field } }) => (
                        <FormItem>
                            <FormLabel>ระดับชั้น</FormLabel>
                            <FormControl>
                                <Input className="sm:w-[10rem] w-full" placeholder="ระดับชั้น" value={isNaN(value) ? 0 : value} onChange={(e) => onChange(parseInt(e.target.value))} {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="room"
                    render={({ field: { value, onChange, ...field } }) => (
                        <FormItem>
                            <FormLabel>ห้อง</FormLabel>
                            <FormControl>
                                <Input className="sm:w-[10rem] w-full" placeholder="ห้อง" value={isNaN(value) ? 0 : value} onChange={(e) => onChange(parseInt(e.target.value))} {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className="sm:w-auto w-full">ค้นหา</Button>
            </form>
        </Form>
    )
}