import { z } from "zod";

const type = z.enum(["new", "move"], { message: "กรุณาเลือกประเภทการสมัคร" });

const round = z.enum(["qouta", "special", "normal"], { message: "กรุณาเลือกรอบการสมัคร" });

const typeView: Record<typeof type.Enum[keyof typeof type.Enum], string> = {
    new: "รับสมัครนักเรียนใหม่",
    move: "รับย้ายนักเรียน"
}

const roundView: Record<typeof round.Enum[keyof typeof round.Enum], string> = {
    qouta: "รอบโควตาห้องปกติ",
    special: "รอบห้องพิเศษ",
    normal: "รอบห้องปกติ"
}

export default {
    admissionForm: z.object({
        type: type,
        round: round,
        class: z.number().min(1, "กรุณาเลือกระดับชั้น").max(6, "โปรดเลือกระดับชั้นไม่เกิน 6"),
        openedAt: z.date(),
        closedAt: z.date(),
    }),
    type,
    round,
    typeView,
    roundView
}