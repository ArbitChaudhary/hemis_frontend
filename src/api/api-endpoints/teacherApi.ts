import type { ITeacher, ITeacherDTO } from '@/views/teachers/common/teacher_types'
import { authorize } from '../axios'

export default {
  addTeacher(data: ITeacherDTO) {
    return authorize.post('/teachers/', data)
  },
  getAllTeachers(): Promise<{ data: ITeacher[] }> {
    return authorize.get('/teachers')
  },
  getTeacherDetailById(id: number): Promise<{ data: ITeacher }> {
    return authorize.get(`/teachers/${id}`)
  },
  getTeachersListByCollegeId(id: number): Promise<{ data: ITeacher[] }> {
    return authorize.get(`/teachers/college-teacher/${id}`)
  },
  updateTeacherById(id: number, data: ITeacherDTO) {
    return authorize.patch(`/teachers/${id}`, data)
  },
  deleteTeacherById(id: number) {
    return authorize.delete(`/teachers/${id}`)
  },
}
