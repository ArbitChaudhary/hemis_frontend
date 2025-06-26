export interface IAddress {
  district: string
  province: string
  local_level: string
  ward_no: number
  tole: string
  house_no: string
}

export interface IGurdianDetails {
  father_name: string
  mother_name: string
  phone_number: number
  email: string
  occupation: string
}

export interface IAcademicEnrollment {
  level: string
  faculty: string
  program: string
  admission_year: string | Date
  date_of_admission: Date
  academic_duration: string
  class_roll_no?: number
  registration_no?: number
}

export interface IPreviousAcademic {
  level: string
  board_or_university: string
  registration_no: string
  institute: string
  academic_docs: string
}

export interface IStudent {
  id: number
  first_name_en: string
  middle_name_en: string
  last_name_en: string
  first_name_np: string
  middle_name_np: string
  last_name_np: string
  phone_number: number
  date_of_birth: string
  gender: string
  caste: string
  ethnicity: string
  edj: string
  disability_status: string
  citizenship_number: number
  national_id_number: number
  profile_picture: string
  citizenship_photo: string
  permanent_address: IAddress
  temporary_address: IAddress
  gurdian_details: IGurdianDetails
  academic_enrollment: IAcademicEnrollment
  previous_academic: IPreviousAcademic
  college_id: number
}
