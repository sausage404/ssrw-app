import axios from "axios"

export interface ThaiAddressDefault {
    id: number
    name_th: string
    name_en: string
    geography_id: number
    created_at: string
    updated_at: string
    delete_at: null
}

export type ThaiAddressSubDistrict = Array<{
    zip_code: string;
} & ThaiAddressDefault>

export type ThaiAddressDistrict = Array<{
    tambon: ThaiAddressSubDistrict
} & ThaiAddressDefault>

export type ThaiAddressProvince = Array<{
    amphure: ThaiAddressDistrict
} & ThaiAddressDefault>

export const getThaiAddress = async () => {
    const url = "https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_province_with_amphure_tambon.json"
    const { data } = await axios.get<ThaiAddressProvince>(url)
    return data
}

export const getProvinces = async () => {
    const data = await getThaiAddress()
    return data;
}

export const getDistricts = async (province: string) => {
    const data = await getThaiAddress()
    return data.find((item) => item.name_th === province)?.amphure || []
}

export const getSubDistricts = async (province: string, amphure: string) => {
    const data = await getThaiAddress()
    return data.find((item) => item.name_th === province)?.amphure.find((item) => item.name_th === amphure)?.tambon || []
}

export const getZipCode = async (province: string, amphure: string, subDistrict: string) => {
    const data = await getThaiAddress()
    return data.find((item) => item.name_th === province)?.amphure.find((item) => item.name_th === amphure)?.tambon.find((item) => item.name_th === subDistrict)?.zip_code || ""
}