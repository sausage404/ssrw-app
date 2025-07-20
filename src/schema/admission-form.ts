import { z } from "zod";

const type = z.enum(["NEW", "MOVE"], { message: "กรุณาเลือกประเภทการสมัคร" });

const round = z.enum(["QOUTA", "SPECIAL", "NORMAL"], { message: "กรุณาเลือกรอบการสมัคร" });

const typeView: Record<typeof type.Enum[keyof typeof type.Enum], string> = {
    NEW: "รับสมัครนักเรียนใหม่",
    MOVE: "รับย้ายนักเรียน"
}

const roundView: Record<typeof round.Enum[keyof typeof round.Enum], string> = {
    QOUTA: "รอบโควตาห้องปกติ",
    SPECIAL: "รอบห้องพิเศษ",
    NORMAL: "รอบห้องปกติ"
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