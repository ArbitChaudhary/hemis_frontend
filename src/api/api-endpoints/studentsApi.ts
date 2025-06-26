import { authorize } from '../axios'

export default {
  getAllStudents() {
    return authorize.get('/students')
  },
}
