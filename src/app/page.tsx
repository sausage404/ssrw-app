import React from "react";
import { Button } from "@/components/ui/button";
import { BookCopy, BookOpenText, BrainCircuit, Layers, ScrollText, UserRoundPlus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";


export default function Home() {
  return (
    <React.Fragment>
      <div className="container-fluid mx-auto w-full border-x border-dashed">
        <Image src="/hero.png" alt="hero" width={0} height={0} sizes="100vw" className="w-full" />
      </div>
      <div className="container-fluid mx-auto w-full px-2 sm:px-3 border-x border-dashed">
        <div className="px-4 flex flex-col items-start gap-1 py-8 md:py-10 lg:py-12">
          <h1 className="text-2xl font-bold leading-tight tracking-tighter sm:text-3xl md:text-4xl lg:leading-[1.5]">
            เว็บระบบโรงเรียนศรีสองรักษ์วิทยา
          </h1>
          <p className="max-w-2xl text-base font-light text-foreground sm:text-lg">
            ศูนย์กลางข้อมูลและการจัดการภายในโรงเรียน เพื่ออำนวยความสะดวกในการบริหารงาน วิชาการ และการจัดการระบบทั่วไป สําหรับนักเรียน บุคลากร และบุคคลทั่วไป
          </p>
          <div className="flex w-full items-center justify-start gap-2 pt-2">
            <Button
              variant="default"
              size="sm"
              asChild
            >
              <Link href="/auth">เริ่มต้นใช้งาน</Link>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              asChild
            >
              <Link href="/register">ข้อมูลการติดต่อ</Link>
            </Button>
          </div>
        </div>
      </div>
      <div className="container-fluid mx-auto w-full border-x border-dashed">
        <div className="flex flex-col items-start gap-1">
          <div className="grid lg:grid-cols-3 md:grid-cols-2 divide-x divide-dashed w-full">
            {[
              {
                icon: <UserRoundPlus className="text-primary" />,
                title: "ระบบรับสมัครนักเรียน",
                desc: "หากท่านต้องการเข้าเรียน ท่านสามารถดูรายละเอียดของระบบรับสมัครนักเรียนได้ที่นี่",
                href: "/register",
              },
              {
                icon: <BookOpenText className="text-primary" />,
                title: "ตรวจสอบผลการเรียน",
                desc: "สำหรับนักเรียนที่ต้องการตรวจสอบผลการเรียน สามารถเข้าไปดูรายละเอียดได้ที่นี่",
                href: "/register",
              },
              {
                icon: <ScrollText className="text-primary" />,
                title: "ระบบนิเทศบุคลากร",
                desc: "ท่านสามารถเข้านิเทศบุคลากรและตรวจสอบผลการนิเทศบุคลากรได้ที่นี่",
                href: "/register",
              },
              {
                icon: <BrainCircuit className="text-primary" />,
                title: "ระบบประเมินสมรรถนะนักเรียน",
                desc: "ท่านสามารถประเมินสมรรถนะนักเรียนและตรวจสอบผลการประเมินสมรรถนะนักเรียนได้ที่นี่",
                href: "/register",
              },
              {
                icon: <BookCopy className="text-primary" />,
                title: "ระบบส่งเอกสารงานวิชาการ",
                desc: "ท่านสามารถส่งเอกสารงานวิชาการ ตรวจสอบผลการส่งเอกสารงานวิชาการและแก้ไขได้ที่นี่",
                href: "/register",
              },
              {
                icon: <Layers className="text-primary" />,
                title: "รายการเอกสาร",
                desc: "รายการเอกสาร template สำหรับงานเอกสาร สามารถดูรายละเอียดได้ที่นี่",
                href: "/register",
              }
            ].map(({ icon, title, desc, href }, i) => (
              <div className="p-4 border-t border-dashed" key={i}>
                <h3 className="flex gap-2 items-center text-xl font-semibold leading-tight tracking-tighter lg:leading-[1.5]">
                  {icon}
                  {title}
                </h3>
                <p className="max-w-2xl text-sm font-light text-muted-foreground sm:text-base">
                  {desc}
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  asChild
                  className="mt-2"
                >
                  <Link href={href}>ดูรายละเอียด</Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
