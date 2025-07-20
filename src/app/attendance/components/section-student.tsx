"use client"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Auth } from "@/lib/session"
import React from "react"
import { AttendanceResponse, getAttendanceTodayWithUserId, getLeaves, recordAttendance } from "../utils"
import attendance from "@/schema/attendance"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import DialogLeave from "./dialog-leave"
import { Leave } from "@prisma/client"

export default ({ auth }: Readonly<{ auth: Auth }>) => {

    const [today, setToday] = React.useState<AttendanceResponse | null>(null);
    const [isChecking, setIsChecking] = React.useState(false);
    const [leaves, setLeaves] = React.useState<Leave[]>([]);

    React.useEffect(() => {
        (async () => {
            const attendance = await getAttendanceTodayWithUserId(auth.id)
            setToday(attendance)
            const leaves = await getLeaves(auth.id, new Date());
            setLeaves(leaves);
        })()
    }, []);

    const isCheckIn = today ? today.period[0] === "present" : false

    type Geolocation = {
        latitude: number;
        longitude: number;
    };

    const corner1 = { latitude: 17.273284461337628, longitude: 101.13647699052383 };
    const corner2 = { latitude: 17.273079856189753, longitude: 101.13712881842254 };

    // คำนวณระยะทางระหว่างจุด 2 จุด (Haversine formula)
    function calculateDistance(point1: Geolocation, point2: Geolocation): number {
        const R = 6371e3; // รัศมีโลกเป็นเมตร
        const φ1 = point1.latitude * Math.PI / 180;
        const φ2 = point2.latitude * Math.PI / 180;
        const Δφ = (point2.latitude - point1.latitude) * Math.PI / 180;
        const Δλ = (point2.longitude - point1.longitude) * Math.PI / 180;

        const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return R * c; // ระยะทางเป็นเมตร
    }

    // หาจุดที่ใกล้ที่สุดบนขอบเขตสี่เหลี่ยม
    function getClosestPointOnRectangle(corner1: Geolocation, corner2: Geolocation, point: Geolocation): Geolocation {
        const minLat = Math.min(corner1.latitude, corner2.latitude);
        const maxLat = Math.max(corner1.latitude, corner2.latitude);
        const minLng = Math.min(corner1.longitude, corner2.longitude);
        const maxLng = Math.max(corner1.longitude, corner2.longitude);

        const clampedLat = Math.max(minLat, Math.min(maxLat, point.latitude));
        const clampedLng = Math.max(minLng, Math.min(maxLng, point.longitude));

        return { latitude: clampedLat, longitude: clampedLng };
    }

    function isInSchoolArea(
        corner1: Geolocation,
        corner2: Geolocation,
        point: Geolocation,
        allowedDistanceMeters: number = 15
    ): {
        inArea: boolean;
        distance: number;
        direction: string;
        details: string;
        preciseLocation: string;
    } {
        const minLat = Math.min(corner1.latitude, corner2.latitude);
        const maxLat = Math.max(corner1.latitude, corner2.latitude);
        const minLng = Math.min(corner1.longitude, corner2.longitude);
        const maxLng = Math.max(corner1.longitude, corner2.longitude);

        const inRectangle = (
            point.latitude >= minLat &&
            point.latitude <= maxLat &&
            point.longitude >= minLng &&
            point.longitude <= maxLng
        );

        if (inRectangle) {
            const centerPoint = {
                latitude: (minLat + maxLat) / 2,
                longitude: (minLng + maxLng) / 2
            };
            const distanceFromCenter = calculateDistance(point, centerPoint);

            return {
                inArea: true,
                distance: 0,
                direction: "อยู่ในโรงเรียน",
                details: `คุณอยู่ในพื้นที่โรงเรียน ห่างจากจุดกึ่งกลาง ${distanceFromCenter < 1 ? `${Math.round(distanceFromCenter * 100)} ซม.` : `${distanceFromCenter.toFixed(2)} ม.`} ✅`,
                preciseLocation: `ตำแหน่งแม่นยำ: ${point.latitude.toFixed(7)}, ${point.longitude.toFixed(7)}`
            };
        }

        const closestPoint = getClosestPointOnRectangle(corner1, corner2, point);
        const distance = calculateDistance(point, closestPoint);

        let direction = "";
        if (point.latitude < minLat) direction += "เหนือ";
        if (point.latitude > maxLat) direction += "ใต้";
        if (point.longitude < minLng) direction += "ตะวันออก";
        if (point.longitude > maxLng) direction += "ตะวันตก";

        const latDiff = point.latitude - closestPoint.latitude;
        const lngDiff = point.longitude - closestPoint.longitude;

        const latDistanceM = latDiff * 111000;
        const lngDistanceM = lngDiff * 111000 * Math.cos(point.latitude * Math.PI / 180);

        const inArea = distance <= allowedDistanceMeters;

        const formatDistance = (dist: number): string => {
            if (dist < 1) return `${Math.round(dist * 100)} ซม.`;
            if (dist < 10) return `${dist.toFixed(2)} ม.`;
            return `${Math.round(dist)} ม.`;
        };

        const details = inArea
            ? `อยู่ห่างจากขอบโรงเรียน ${formatDistance(distance)} (ยอมรับได้) 🟡`
            : `อยู่ห่างจากขอบโรงเรียน ${formatDistance(distance)} ทาง${direction} (ต้องเข้าใกล้อีก ${formatDistance(distance - allowedDistanceMeters)}) ❌`;

        return {
            inArea,
            distance,
            direction,
            details,
            preciseLocation: `ตำแหน่งแม่นยำ: ${point.latitude.toFixed(7)}, ${point.longitude.toFixed(7)} | ละติจูด: ${latDistanceM > 0 ? '+' : ''}${latDistanceM.toFixed(2)}ม. ลองติจูด: ${lngDistanceM > 0 ? '+' : ''}${lngDistanceM.toFixed(2)}ม.`
        };
    }

    const checkIn = async () => {
        if (isCheckIn) {
            return toast.error('คุณเช็คชื่อเข้าโรงเรียนเรียบร้อยแล้ว');
        }

        if (isChecking) return;

        setIsChecking(true);

        if (!navigator.geolocation) {
            toast.error("เบราว์เซอร์ไม่รองรับระบบตำแหน่ง");
            setIsChecking(false);
            return;
        }

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const accuracyM = position.coords.accuracy;
                // if (accq

                const me = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                };

                console.log('ตำแหน่งปัจจุบัน:', me);
                console.log('ขอบเขตโรงเรียน:', { corner1, corner2 });
                console.log('ความแม่นยำ GPS:', `${Math.round(position.coords.accuracy * 100)} ซม.`);
                console.log('ข้อมูลเพิ่มเติม:', {
                    altitude: position.coords.altitude ? `${position.coords.altitude.toFixed(2)} ม.` : 'ไม่ทราบ',
                    heading: position.coords.heading ? `${position.coords.heading}°` : 'ไม่ทราบ',
                    speed: position.coords.speed ? `${position.coords.speed.toFixed(2)} ม./วิ` : 'ไม่ทราบ'
                });

                const result = isInSchoolArea(corner1, corner2, me);

                console.log('ผลการตรวจสอบ:', result);
                console.log('ตำแหน่งละเอียด:', result.preciseLocation);

                if (!result.inArea) {
                    toast.success(`เข้าโรงเรียนเรียบร้อย! ${result.details}`);
                    setTimeout(() => {
                        toast.info(`📍 ${result.preciseLocation}`, { duration: 5000 });
                    }, 1000);
                    await recordAttendance(
                        today?.id,
                        today ? today.period.map((p, i) => i === 0 ? "present" : p) :
                            ["present", "null", "null", "null", "null", "null", "null", "null", "null", "null"],
                        auth.id
                    );
                    setToday(pre => {
                        if (!pre) return null;
                        return {
                            ...pre,
                            period: pre.period.map((p, i) => i === 0 ? "present" : p)
                        }
                    })
                } else {
                    toast.error(result.details);
                    // แสดงคำแนะนำละเอียด
                    setTimeout(() => {
                        toast.info(`📍 ${result.preciseLocation}`, { duration: 6000 });
                    }, 1500);
                    setTimeout(() => {
                        toast.info(`🚶‍♂️ เดินทาง${result.direction} ประมาณ ${result.distance < 1 ? `${Math.round(result.distance * 100)} ซม.` : `${result.distance.toFixed(2)} ม.`}`);
                    }, 3000);
                }

                setIsChecking(false);
            },
            (err) => {
                // จัดการข้อผิดพลาดแต่ละประเภท
                switch (err.code) {
                    case err.PERMISSION_DENIED:
                        toast.error("กรุณาอนุญาตการเข้าถึงตำแหน่ง");
                        break;
                    case err.POSITION_UNAVAILABLE:
                        toast.error("ไม่สามารถหาตำแหน่งได้");
                        break;
                    case err.TIMEOUT:
                        toast.error("หมดเวลาในการหาตำแหน่ง");
                        break;
                    default:
                        toast.error("เกิดข้อผิดพลาดในการหาตำแหน่ง");
                }
                setIsChecking(false);
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0
            }
        );
    };


    return (
        <React.Fragment>
            <div className="border-b border-dashed">
                <div className="flex sm:flex-row sm:justify-between justify-center px-2 py-2 gap-4">
                    <div className="flex items-center gap-2 sm:text-start">
                        คะแนนความประพฤติ {auth.behaviorPoint}
                    </div>
                    <div className="grid sm:grid-cols-2 gap-2">
                        <Button onClick={checkIn} disabled={isChecking || isCheckIn} variant="outline" size="sm" className="w-full sm:w-auto">
                            {!isCheckIn ? isChecking ? "กำลังตรวจสอบ..." : "เช็คชื่อเข้าโรงเรียน" : "เช็คชื่อเรียบร้อย"}
                        </Button>
                        <DialogLeave auth={auth} />
                    </div>
                </div>
            </div>
            <div className="border-b border-dashed gap-4 text-sm">
                <Table className="**:border-dashed divide-x">
                    <TableHeader>
                        <TableRow className="divide-x">
                            <TableHead>คาบ</TableHead>
                            <TableHead>สถานะ</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow className="divide-x">
                            <TableCell>เข้าโรงเรียน</TableCell>
                            <TableCell>{today ? attendance.period[today.period[0]] : "ไม่พบ"}</TableCell>
                        </TableRow>
                        <TableRow className="divide-x">
                            <TableCell>เข้าแถว</TableCell>
                            <TableCell>{today ? attendance.period[today.period[1]] : "ไม่พบ"}</TableCell>
                        </TableRow>
                        {Array.from({ length: 8 }).map((_, i) => {
                            const period = today?.period[i + 2];
                            return (
                                <TableRow className="divide-x" key={i}>
                                    <TableCell>คาบ {i + 1}</TableCell>
                                    <TableCell>{period ? attendance.period[today.period[i + 2]] : "ไม่พบ"}</TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </div>
            {leaves.length > 0 && (
                <div className="border-b border-dashed gap-8 text-sm p-8 grid sm:grid-cols-2 md:grid-cols-3">
                    {leaves.map((leave, i) => (
                        <div key={i} className="grid gap-2">
                            <p className="font-semibold">{leave.createdAt.toLocaleDateString("th-TH", {
                                day: "numeric",
                                month: "long",
                                year: "numeric"
                            })}
                                <Button variant="link" size="sm" asChild>ลบ</Button>
                            </p>
                            <p className="text-muted-foreground">{leave.reason}</p>
                        </div>
                    ))}
                </div>
            )}
        </React.Fragment>
    )
}