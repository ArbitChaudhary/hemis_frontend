export interface IFacultyDTO {
  name: string | null
  level: number | null
  college_id: number | null
  batch: number | null
}

export interface IFaculty {
  id: number
  level: string
  name: string
  college_id: number
  batch: number
}
