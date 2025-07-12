import type { IPrograms, IProgramsDTO } from '@/views/settings/programs/common/programs_types'
import { authorize } from '../axios'

export default {
  addProgram(data: IProgramsDTO) {
    return authorize.post('/programs', data)
  },
  getAllPrograms(): Promise<{ data: IPrograms[] }> {
    return authorize.get('/programs')
  },
  getProgramsByCollegeId(id: number): Promise<{ data: IPrograms[] }> {
    return authorize.get(`/programs/college-programs/${id}`)
  },
  getProgramById(id: number): Promise<{ data: IPrograms }> {
    return authorize.get(`/programs/${id}`)
  },
  updateProgramById(id: number, data: IProgramsDTO) {
    return authorize.patch(`/programs/${id}`, data)
  },
  deleteProgramById(id: number) {
    return authorize.delete(`/programs/${id}`)
  },
}
