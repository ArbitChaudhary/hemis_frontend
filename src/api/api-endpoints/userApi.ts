import type { IUser, IUserDTO } from '@/views/users/common/user_types'
import { authorize } from '../axios'

export default {
  registerUser(data: IUserDTO) {
    return authorize.post('/users', data)
  },
  getAllUsers(): Promise<{ data: IUser[] }> {
    return authorize.get('/users')
  },
  getUserById(id: number): Promise<{ data: IUser }> {
    return authorize.get(`/users/${id}`)
  },
  deleteUserById(id: number) {
    return authorize.delete(`/users/${id}`)
  },
}
