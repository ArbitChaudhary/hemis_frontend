import type { ILevel, ILevelDTO } from '@/views/settings/level/common/level_types'
import { authorize } from '../axios'

export default {
  addLevel(data: ILevelDTO) {
    return authorize.post('/levels', data)
  },
  getLevelByCollegeId(id: string): Promise<{ data: ILevel[] }> {
    return authorize.get(`/levels/college-level/${id}`)
  },
  getLevelById(id: string): Promise<{ data: ILevel }> {
    return authorize.get(`/levels/${id}`)
  },
  updateLevelById(id: string, data: ILevelDTO): Promise<{ data: ILevel }> {
    return authorize.patch(`/levels/${id}`, data)
  },
  deleteLevelById(id: string): Promise<{ data: ILevel }> {
    return authorize.delete(`/levels/${id}`)
  },
  getLevelByBatchId(id: number): Promise<{ data: ILevel[] }> {
    return authorize.get(`/levels/batch-level/${id}`)
  },
}
