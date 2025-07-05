export interface ILevel {
  id: number
  name: string
  batch: number
  college_id: number
}

export interface ILevelDTO {
  name: string
  batch: number | null
  college_id: number | null
}
