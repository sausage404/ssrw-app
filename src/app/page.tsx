import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import constant from "@/constant";
import { cn } from "@/lib/utils";
import { auth } from "@/lib/auth";

export const metadata = {
  title: "Srisongrak Wittaya School",
};

export default async () => {

  const session = await auth();

  const colors = [
    "bg-gradient-to-bl from-yellow-100 via-yellow-400/70 to-yellow-200 dark:from-yellow-700 dark:via-yellow-900 dark:to-yellow-600",
    "bg-gradient-to-bl from-cyan-100 via-cyan-400/70 to-cyan-200 dark:from-cyan-700 dark:via-cyan-900 dark:to-cyan-600",
    "bg-gradient-to-bl from-blue-100 via-blue-400/70 to-blue-200 dark:from-blue-700 dark:via-blue-900 dark:to-blue-600",
    "bg-gradient-to-bl from-pink-100 via-pink-400/70 to-pink-200 dark:from-pink-700 dark:via-pink-900 dark:to-pink-600",
    "bg-gradient-to-bl from-green-100 via-green-400/70 to-green-200 dark:from-green-700 dark:via-green-900 dark:to-green-600",
    "bg-gradient-to-bl from-red-100 via-red-400/70 to-red-200 dark:from-red-700 dark:via-red-900 dark:to-red-600",
  ]

  const CardMenu = ({ data, index }: { data: any, index: number }) => (
    <Link
      href={data.href}
      className={cn(
        "p-3 rounded-md cursor-pointer grid",
        "hover:opacity-70 transition-all",
        colors[index]
      )}
    >
      <h3 className="flex gap-2 items-center text-xl font-semibold leading-tight tracking-tighter lg:leading-[1.5]">
        <data.icon />
        {data.title}
      </h3>
      <p className="max-w-2xl text-sm font-light">
        {data.desc}
      </p>
      <div className="flex items-end justify-end">
        <p className="max-w-2xl text-xs font-light">
          กดเพื่อไปต่อ
        </p>
      </div>
    </Link>
  )

  return (
    <React.Fragment>
      <div className="container-fluid mx-auto w-full relative md:h-auto h-50">
        <img src="/hero.png" className="w-full object-cover object-right h-full" alt="" />
      </div>
      <div className="container-fluid mx-auto w-full p-4 sm:p-8 border-x border-dashed">
        <div className="flex flex-col items-start gap-1">
          <h1 className="text-2xl font-bold leading-tight tracking-tighter sm:text-3xl md:text-4xl lg:leading-[1.5]">
            ระบบโรงเรียนศรีสองรักษ์วิทยา
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
              <Link href="/admission">สมัครเรียน</Link>
            </Button>
          </div>
        </div>
      </div>
      <div className="container-fluid mx-auto w-full border-x border-t border-dashed p-4 sm:p-8 space-y-8">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 w-full gap-4 sm:gap-8">
          {!session?.user && [
            ...constant.features.default
          ].map((data, i) => (
            <CardMenu key={i} index={i} data={data} />
          ))}
          {session?.user.role === "STUDENT" && [
            ...constant.features.default,
            ...constant.features.student
          ].map((data, i) => (
            <CardMenu key={i} index={i} data={data} />
          ))}
          {session?.user.role === "TEACHER" && [
            ...constant.features.default,
            ...constant.features.teacher
          ].map((data, i) => (
            <CardMenu key={i} index={i} data={data} />
          ))}
          {session?.user.role === "ADMIN" && [
            ...constant.features.default,
            ...constant.features.admin
          ].map((data, i) => (
            <CardMenu key={i} index={i} data={data} />
          ))}
        </div>
      </div>
    </React.Fragment>
  );
}
