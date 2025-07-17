export interface IAddress {
  province: string
  district: string
  local_level: string
  ward_no: number | null
  tole: string
  house_no: string
}

export interface IAcademic {
  level_of_study: string
  university: string
  institute: string
  registration: string
  academic_docs: string | File
}

export interface IJob {
  position: string
  level: string
  job_type: string
  working_hour: string
  appointed_date: string
  department: string
  category: string
}

export interface IStaff {
  id: number
  first_name_en: string
  middle_name_en: string
  last_name_en: string
  first_name_np: string
  middle_name_np: string
  last_name_np: string
  date_of_birth: Date
  phone_number: number
  gender: string
  caste: string
  disability_status: string
  citizenship_number: number
  national_id: number
  photo: string
  citizenship_photo: string
  permanent_address: IAddress
  temporary_address: IAddress
  academic_info: IAcademic
  job_info: IJob
  college_id: number
}

export interface IStaffDTO {
  first_name_en: string
  middle_name_en: string
  last_name_en: string
  first_name_np: string
  middle_name_np: string
  last_name_np: string
  date_of_birth: Date | string
  phone_number: number | null
  gender: string
  caste: string
  disability_status: string
  citizenship_number: number | null
  national_id: number | null
  photo: File | string
  citizenship_photo: File | string
  permanent_address: IAddress
  temporary_address: IAddress
  academic_info: IAcademic
  job_info: IJob
  college_id: number
}
