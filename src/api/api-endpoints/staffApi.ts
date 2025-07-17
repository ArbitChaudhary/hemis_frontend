import type { IStaff, IStaffDTO } from '@/views/staffs/common/staff_types'
import { authorize } from '../axios'

export default {
  addStaff(data: IStaffDTO) {
    return authorize.post('/staffs/', data)
  },
  getAllStaffs(): Promise<{ data: IStaff[] }> {
    return authorize.get('/staffs')
  },
  getStaffDetailById(id: number): Promise<{ data: IStaff }> {
    return authorize.get(`/staffs/${id}`)
  },
  getStaffsListByCollegeId(id: number): Promise<{ data: IStaff[] }> {
    return authorize.get(`/staffs/college-staff/${id}`)
  },
  updateStaffById(id: number, data: IStaffDTO) {
    return authorize.patch(`/staffs/${id}`, data)
  },
  deleteStaffById(id: number) {
    return authorize.delete(`/staffs/${id}`)
  },
}
