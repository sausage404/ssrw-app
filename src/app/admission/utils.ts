import constant from "@/constant"
import admissionForm from "@/schema/admission-form";

export const getPlans = (
    round: keyof typeof admissionForm.roundView,
    type: keyof typeof admissionForm.typeView,
    _class: number
) => {
    let availablePlans: string[] = []

    const plan = constant.admissionPlan;

    if (round === admissionForm.round.enum.special) {
        if (_class === 4) {
            availablePlans = [...plan.gifted, ...plan.sports]
        } else if (_class === 1) {
            availablePlans = [...plan.gifted, ...plan.mep, ...plan.sports]
        }
    } else if (_class < 4 || type === admissionForm.type.enum.move) {
        if (round === admissionForm.round.enum.normal) {
            availablePlans = plan.normal
        }
    } else if (round === admissionForm.round.enum.normal || round === admissionForm.round.enum.qouta) {
        availablePlans = plan.highSchool
    }

    return availablePlans
}

export const getReservePlans = (plans: string[]) => {
    return constant.admissionPlan.highSchool
        .filter((plan) => !plans.includes(plan));
}

