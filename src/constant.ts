import { BookOpen, CalendarCheck2, CalendarX2, ClipboardList, Database, Gavel, LogIn, Megaphone, UserRoundPlus, Users, Users2 } from "lucide-react";

const folder = {
    studentPhoto: "1bjqlwpYxkNodkRn3TEVHwPm6R7zXuIDn",
    pdf: "1A_Qb_yWdGMfmh7ANgovJMa3Z6jz8uowK",
    studentRecord: "1bwcOmCUR1a1KBehWOYC8a2SIuwhwBc6R",
    houseRecord: "1-ak1hr1kABUeJfgjGCY1hATc6jj-oJy3",
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
        }
    ],
    student: [
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
            href: "/attendance"
        },
        {
            icon: Users2,
            title: "เลือกชุมนุม",
            desc: "นักเรียนสามารถเลือกชุมนุมหรือกิจกรรมที่สนใจได้ที่นี่",
            href: "/club"
        }
    ],
    admin: [
        {
            icon: Database,
            title: "จัดการผู้ใช้งาน",
            desc: "แอดมินสามารถจัดการบัญชีทั้งหมด ได้ที่นี่",
            href: "/admin/users",
        },
        {
            icon: Database,
            title: "จัดการแบบรับสมัคร",
            desc: "แอดมินสามารถจัดการแบบรับสมัคร นักเรียนได้ที่นี่",
            href: "/admin/admission-forms",
        },
        {
            icon: Database,
            title: "จัดการบันทึกรับสมัคร",
            desc: "แอดมินสามารถจัดการบันทึกรับสมัคร นักเรียนได้ที่นี่",
            href: "/admin/admissions",
        },
        {
            icon: Megaphone,
            title: "จัดการประชาสัมพันธ์",
            desc: "แอดมินสามารถประกาศข่าวสารให้กับนักเรียนได้ที่นี่",
            href: "/announcement"
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