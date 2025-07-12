export interface IUser {
  id: number
  email: string
  password: string
  role: string
  college_id: number | null
}

export interface IUserDTO {
  email: string
  password: string
  role: string
  college_id: number | null
}
