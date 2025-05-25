import constant from "@/constant";
import { getFullName } from "@/lib/utils";
import admission from "@/schema/admission";
import admissionForm from "@/schema/admission-form";
import axios from "axios";
import { z } from "zod";

export default async (
    data: z.infer<typeof admission.admission>,
    length: number,
    files: {
        studentPhoto: File | null,
        houseRecord: File | null,
        studentRecord: File | null
    }
) => {
    try {
        const fullName = getFullName(data);

        if (!files.studentPhoto) {
            return { success: false, message: "กรุณาอัพโหลดรูปภาพนักเรียน" };
        }

        const formData = new FormData();
        formData.append("name", fullName);
        formData.append("mimeType", "image/jpeg");
        formData.append("parentId", constant.folder.studentPhoto);
        formData.append("file", files.studentPhoto);
        const { data: { id: idStudentPhoto } } = await axios.post("/api/drive", formData);

        let idHouseRecord;

        if (files.houseRecord) {
            formData.set("parentId", constant.folder.houseRecord);
            formData.set("file", files.houseRecord);
            const { data: { id } } = await axios.post("/api/drive", formData);
            idHouseRecord = id;
        }

        let idStudentRecord;

        if (files.studentRecord) {
            formData.set("parentId", constant.folder.studentRecord);
            formData.set("file", files.studentRecord);
            const { data: { id } } = await axios.post("/api/drive", formData);
            idStudentRecord = id;
        }

        const { data: template } = await axios.get("/html/admission.html", {
            responseType: "text"
        });
        let html = template;
        Object.entries({
            ...data,
            no: length + 1,
            round: admissionForm.roundView[data.round],
            type: admissionForm.typeView[data.type],
            studentPhoto: `https://drive.google.com/thumbnail?id=${idStudentPhoto}&sz=w1000`,
            birthDate: data.birthDate.toLocaleDateString("th-TH", {
                day: "numeric",
                month: "long",
                year: "numeric"
            })
        }).forEach(([key, value]) => html = html.replaceAll(`{${key}}`, value));
        const { data: file } = await axios.put("http://localhost:4000/pdf", {
            html,
            name: fullName
        }, { responseType: "blob" });

        formData.set("mimeType", "application/pdf");
        formData.set("parentId", constant.folder.pdf);
        formData.set("file", file);
        const { data: idPdf } = await axios.post("/api/drive", formData);

        const { data: { success, message } } = await axios.post("/api/data/admission", {
            ...data,
            studentPhoto: `https://drive.google.com/file/d/${idStudentPhoto}/preview`,
            houseRecord: idHouseRecord ? `https://drive.google.com/file/d/${idHouseRecord}/preview` : undefined,
            studentRecord: idStudentRecord ? `https://drive.google.com/file/d/${idStudentRecord}/preview` : undefined,
            pdf: `https://drive.google.com/file/d/${idPdf}/preview`
        });

        if (!success) {
            return { success, message };
        }

        return { success: true, message: "ส่งแบบฟอร์มสําเร็จ" };
    } catch (error) {
        console.log(error);
        return { success: false, message: "เกิดข้อผิดพลาดเกิดขึ้น กรุณาติดต่อผู้ดูแลระบบ" };
    }
}