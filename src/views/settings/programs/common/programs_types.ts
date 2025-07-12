export interface IPrograms {
  id: number
  name: string
  college_id: number
  batch: number
  level: number
  faculty: number
}

export interface IProgramsDTO {
  name: string
  college_id: number | null
  batch: number | null
  level: number | null
  faculty: number | null
}
