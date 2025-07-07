export interface IFacultyDTO {
  name: string | null
  level: string | null
  college_id: number | null
}

export interface IFaculty {
  id: number
  level: string
  name: string
  college_id: number
}
