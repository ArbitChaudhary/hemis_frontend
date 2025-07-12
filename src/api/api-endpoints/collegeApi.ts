import type { ICollege, ICollegeDTO } from '@/views/college/common/college_types'
import { authorize } from '../axios'

export default {
  getAllCollegesList(): Promise<{ data: ICollege[] }> {
    return authorize.get('/college')
  },
  registerCollege(data: ICollegeDTO) {
    return authorize.post('/college/register', data)
  },
  getCollegeById(id: number): Promise<{ data: ICollege }> {
    return authorize.get(`/college/${id}`)
  },
  deleteCollegeById(id: number) {
    return authorize.delete(`/college/${id}`)
  },
  updateCollegeById(id: number, data: ICollegeDTO) {
    return authorize.patch(`/college/${id}`, data)
  },
}
