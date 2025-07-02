import type { IStudentDTO } from '@/views/students/common/types'
import { authorize } from '../axios'

export default {
  getAllStudents() {
    return authorize.get('/students')
  },
  addStudent(data: IStudentDTO) {
    return authorize.post('/students', data)
  },
}
