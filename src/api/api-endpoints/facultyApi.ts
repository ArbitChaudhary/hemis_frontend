import type { IFaculty, IFacultyDTO } from '@/views/settings/faculty/common/faculty_types'
import { authorize } from '../axios'

export default {
  addFaculty(data: IFacultyDTO) {
    return authorize.post('/faculties', data)
  },
  getAllFaculties(): Promise<{ data: IFaculty[] }> {
    return authorize.get(`/faculties`)
  },
  getFacultyById(id: number): Promise<{ data: IFaculty }> {
    return authorize.get(`/faculties/${id}`)
  },
  deleteFacultyById(id: number) {
    return authorize.delete(`/faculties/${id}`)
  },
  updateFacultyById(id: number, data: IFacultyDTO) {
    return authorize.patch(`/faculties/${id}`, data)
  },
  getFacultiesByCollegeId(id: number): Promise<{ data: IFaculty[] }> {
    return authorize.get(`/faculties/college-faculties/${id}`)
  },
  getFacultiesByLevelId(id: number): Promise<{ data: IFaculty[] }> {
    return authorize.get(`/faculties/level/${id}`)
  },
}
