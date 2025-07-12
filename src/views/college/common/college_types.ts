export interface ICollege {
  id: number
  college_name: string
  province: string
  district: string
  city: string
  ward: number
  latitude?: string
  longitude?: string
  affiliating_university: string
  level_of_study: string[]
  faculties: string[]
  programs: string[]
  mobile_number: number
  landline_number: number
  email: string
}

export interface ICollegeDTO {
  college_name: string
  province: string
  district: string
  city: string
  ward: number | null
  latitude?: string
  longitude?: string
  affiliating_university: string
  mobile_number: number | null
  landline_number: number | null
  email: string
}
