import { z } from "zod";
import admissionForm from "./admission-form";
import user from "./user";

const status = z.enum(["pending", "test", "pass", "confirm", "waived", "reject"]);

const bloodType = z.enum(["A", "B", "O", "AB"], { required_error: "กรุณากรอกหมู่เลือด" });

export default {
    admission: z.object({
        studentId: z.string().min(1, "กรุณากรอกหมายเลขนักเรียน"),
        academicYear: z.number().int().min(1, "กรุณากรอกปีการศึกษา"),
        type: admissionForm.type,
        class: z.number().int().min(1, "กรุณากรอกชั้นเรียน"),
        round: admissionForm.round,
        plan: z.string().min(1, "กรุณากรอกแผนการสมัคร"),
        reservePlan: z.string().min(1, "กรุณากรอกแผนสำรอง"),
        serviceZone: z.string().min(1, "กรุณากรอกโซนบริการ"),
        provenance: z.string().min(1, "กรุณากรอกแหล่งที่มา"),
        prefix: user.prefix,
        firstName: z.string().min(1, "กรุณากรอกชื่อ"),
        lastName: z.string().min(1, "กรุณากรอกนามสกุล"),
        cardId: z.string()
            .min(13, "กรุณากรอกหมายเลขบัตรประชาชน")
            .max(13, "กรุณากรอกหมายเลขบัตรประชาชน"),
        birthDate: z.date({ message: "กรุณาเลือกวันเกิด" }),
        ethnicity: z.string().min(1, "กรุณากรอกเชื้อชาติ"),
        nationality: z.string().min(1, "กรุณากรอกสัญชาติ"),
        religion: z.string().min(1, "กรุณากรอกศาสนา"),
        bloodType: bloodType,
        phone: z.string().min(10, "กรุณากรอกหมายเลขโทรศัพท์"),
        talent: z.string().min(1, "กรุณากรอกความสามารถพิเศษ"),
        houseNo: z.number().min(1, "กรุณากรอกหมายเลขบ้าน"),
        villageNo: z.number().min(1, "กรุณากรอกหมายเลขหมู่บ้าน"),
        village: z.string().min(1, "กรุณากรอกชื่อหมู่บ้าน"),
        road: z.string().min(1, "กรุณากรอกชื่อถนน"),
        alley: z.string().min(1, "กรุณากรอกชื่อซอย"),
        subDistrict: z.string().min(1, "กรุณาเลือกตำบล"),
        district: z.string().min(1, "กรุณาเลือกอำเภอ"),
        province: z.string().min(1, "กรุณาเลือกจังหวัด"),
        zipcode: z.string().min(1, "กรุณากรอกรหัสไปรษณีย์"),
        schoolName: z.string().min(1, "กรุณากรอกชื่อโรงเรียน"),
        grade: z.string().min(1, "กรุณากรอกชั้นเรียน"),
        subDistrictOld: z.string().min(1, "กรุณาเลือกตำบล"),
        districtOld: z.string().min(1, "กรุณาเลือกอำเภอ"),
        provinceOld: z.string().min(1, "กรุณาเลือกจังหวัด"),
        zipcodeOld: z.string().min(1, "กรุณากรอกรหัสไปรษณีย์"),
        fatherName: z.string().min(1, "กรุณากรอกชื่อบิดา"),
        fatherJob: z.string().min(1, "กรุณากรอกอาชีพบิดา"),
        fatherPhone: z.string().min(10, "กรุณากรอกหมายเลขโทรศัพท์บิดา"),
        motherName: z.string().min(1, "กรุณากรอกชื่อมารดา"),
        motherJob: z.string().min(1, "กรุณากรอกอาชีพมารดา"),
        motherPhone: z.string().min(10, "กรุณากรอกหมายเลขโทรศัพท์มารดา"),
        guardianName: z.string().min(1, "กรุณากรอกชื่อผู้ปกครอง"),
        guardianJob: z.string().min(1, "กรุณากรอกอาชีพผู้ปกครอง"),
        guardianPhone: z.string().min(10, "กรุณากรอกหมายเลขโทรศัพท์ผู้ปกครอง"),
        guardianRelation: z.string().min(1, "กรุณากรอกความสัมพันธ์กับผู้ปกครอง"),
        studentPhoto: z.instanceof(File)
            .refine((file) => file.type.startsWith("image/"), {
                message: "กรุณาเลือกรูปภาพ",
            })
            .refine((file) => file.size <= 5 * 1024 * 1024, {
                message: "กรุณาเลือกรูปภาพขนาดไม่เกิน 5MB",
            }),
        houseRecord: z.instanceof(File)
            .refine((file) => file.type.startsWith("image/"), {
                message: "กรุณาเลือกรูปภาพ",
            })
            .refine((file) => file.size <= 5 * 1024 * 1024, {
                message: "กรุณาเลือกรูปภาพขนาดไม่เกิน 5MB",
            }).optional(),
        studentRecord: z.instanceof(File)
            .refine((file) => file.type.startsWith("image/"), {
                message: "กรุณาเลือกรูปภาพ",
            })
            .refine((file) => file.size <= 5 * 1024 * 1024, {
                message: "กรุณาเลือกรูปภาพขนาดไม่เกิน 5MB",
            }).optional()
    }),
    status,
    bloodType
}