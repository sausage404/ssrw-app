import { BookOpen, CalendarCheck2, CalendarX2, ClipboardList, Gavel, LogIn, Megaphone, UserRoundPlus, Users, Users2 } from "lucide-react";

const folder = {
    studentPhoto: "1VFLxSuPrZaE4gvXI1_pGqqat1galiXfx",
    pdf: "1sGFOnO_zf9NDQ3cHZcAWbhpLG6XvmbIx",
    studentRecord: "1pvf08CsiZzW0Z3e6n7nNdnjQzH3wn3UP",
    houseRecord: "1ftHJXrbDIolFrH_19xPhlao-Cm4k0WT6",
}

// const features = [
//     {
//         icon: UserRoundPlus,
//         title: "ระบบรับสมัครนักเรียน",
//         desc: "หากท่านต้องการเข้าเรียน ท่านสามารถดูรายละเอียดของระบบรับสมัครนักเรียนได้ที่นี่",
//         href: "/admission",
//     },
// {
//     icon: BookOpenText,
//     title: "ตรวจสอบผลการเรียน",
//     desc: "สำหรับนักเรียนที่ต้องการตรวจสอบผลการเรียน สามารถเข้าไปดูรายละเอียดได้ที่นี่",
//     href: "/register",
// },
// {
//     icon: ScrollText,
//     title: "ระบบนิเทศบุคลากร",
//     desc: "ท่านสามารถเข้านิเทศบุคลากรและตรวจสอบผลการนิเทศบุคลากรได้ที่นี่",
//     href: "/register",
// },
// {
//     icon: BrainCircuit,
//     title: "ระบบประเมินสมรรถนะนักเรียน",
//     desc: "ท่านสามารถประเมินสมรรถนะนักเรียนและตรวจสอบผลการประเมินสมรรถนะนักเรียนได้ที่นี่",
//     href: "/register",
// },
// {
//     icon: BookCopy,
//     title: "ระบบส่งเอกสารงานวิชาการ",
//     desc: "ท่านสามารถส่งเอกสารงานวิชาการ ตรวจสอบผลการส่งเอกสารงานวิชาการและแก้ไขได้ที่นี่",
//     href: "/register",
// },
// {
//     icon: Layers,
//     title: "รายการเอกสาร",
//     desc: "รายการเอกสาร template สำหรับงานเอกสาร สามารถดูรายละเอียดได้ที่นี่",
//     href: "/register",
// }
// ]

const features = {
    default: [
        {
            icon: UserRoundPlus,
            title: "ระบบรับสมัครนักเรียน",
            desc: "ท่านสามารถดูรายละเอียดของระบบรับสมัครนักเรียนได้ที่นี่",
            href: "/admission"
        }
    ],
    teacher: [
        {
            icon: BookOpen,
            title: "ข้อมูลทั่วไป",
            desc: "ครูสามารถดูรายละเอียดข้อมูลทั่วไปได้ที่นี่",
            href: "/overview"
        },
        {
            icon: Megaphone,
            title: "ประชาสัมพันธ์",
            desc: "ครูสามารถดูประชาสัมพันธ์รายวันได้ที่นี่",
            href: "/announcement"
        },
        {
            icon: ClipboardList,
            title: "เช็คชื่อนักเรียน",
            desc: "ครูสามารถเช็คชื่อเข้าห้องเรียนของนักเรียนได้ที่นี่",
            href: "/attendance"
        },
        {
            icon: Users2,
            title: "จัดการชุมนุม",
            desc: "ครูสามารถดูรายชื่อและจัดการชุมนุมที่ตนเองรับผิดชอบได้ที่นี่",
            href: "/club"
        },
        {
            icon: CalendarCheck2,
            title: "ดูปฏิทินกิจกรรม",
            desc: "ครูสามารถดูปฏิทินกิจกรรมได้ที่นี่",
            href: "/calendar",
        }
    ],
    student: [
        {
            icon: BookOpen,
            title: "ข้อมูลทั่วไป",
            desc: "นักเรียนสามารถดูรายละเอียดข้อมูลทั่วไปได้ที่นี่",
            href: "/overview"
        },
        {
            icon: Megaphone,
            title: "ประชาสัมพันธ์",
            desc: "นักเรียนสามารถดูประชาสัมพันธ์รายวันได้ที่นี่",
            href: "/announcement"
        },
        {
            icon: LogIn,
            title: "เช็คอินเข้าเรียน",
            desc: "นักเรียนสามารถเช็คอินเข้าโรงเรียนและลาเรียนผ่านระบบได้ที่นี่",
            href: "/check-in"
        },
        {
            icon: Users2,
            title: "เลือกชุมนุม",
            desc: "นักเรียนสามารถเลือกชุมนุมหรือกิจกรรมที่สนใจได้ที่นี่",
            href: "/club"
        },
        {
            icon: CalendarCheck2,
            title: "ดูปฏิทินกิจกรรม",
            desc: "นักเรียนสามารถดูปฏิทินกิจกรรมได้ที่นี่",
            href: "/calendar",
        }
    ],
    admin: [
        {
            icon: Users,
            title: "จัดการผู้ใช้งาน",
            desc: "แอดมินสามารถจัดการบัญชีครู นักเรียนได้ที่นี่",
            href: "/admin/users",
        },
        {
            icon: Megaphone,
            title: "จัดการประชาสัมพันธ์",
            desc: "แอดมินสามารถประกาศข่าวสารให้กับนักเรียนได้ที่นี่",
            href: "/announcement"
        },
        {
            icon: CalendarCheck2,
            title: "จัดการปฏิทินกิจกรรม",
            desc: "แอดมินสามารถจัดการปฏิทินกิจกรรมได้ที่นี่",
            href: "/calendar",
        }
    ]
}


const admissionPlan = {
    gifted: [
        "ห้องพิเศษวิทยาศาสตร์ - คณิตศาสตร์ แผนการเรียนเตรียมแพทย์และสาธารณสุข (Gifted)",
        "ห้องพิเศษวิทยาศาสตร์ - คณิตศาสตร์ (Gifted)",
    ],
    sports: ["ห้องพิเศษกีฬา แผนการเรียนเตรียมวิทยาศาสตร์การกีฬา (ฟุตบอล, มวยปล้ำ)", "ห้องพิเศษกีฬา (ฟุตบอล, มวยปล้ำ)"],
    mep: ["ห้องพิเศษ MEP (Mini English Program)"],
    normal: ["ห้องเรียนปกติ"],
    highSchool: [
        "แผนการเรียน เตรียมวิศวะกรรมศาสตร์ (วิทย์-คณิต)",
        "แผนการเรียน เตรียมศึกษาศาสตร์และครุศาสตร์ (วิทย์-คณิต)",
        "แผนการเรียน เตรียมนิติศาสตร์-รัฐศาสตร์ (วิทย์-คณิต)",
        "แผนการเรียน เตรียมมนุษยศาสตร์-นิเทศศาสตร์-ศิลปกรรมศาสตร์ (ศิลป์-ภาษา)",
        "แผนการเรียน เตรียมเทคโนโลยีอุตศาหกรรมและการจัดการ",
    ],
}

export default {
    folder,
    features,
    admissionPlan
}