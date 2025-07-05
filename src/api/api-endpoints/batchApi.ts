import type { IBatch, IBatchDTO } from '@/views/settings/batch/common/batch_types'
import { authorize } from '../axios'

export default {
  addBatch(data: IBatchDTO) {
    return authorize.post('/batch', data)
  },
  getBatchByCollegeId(id: string): Promise<{ data: IBatch[] }> {
    return authorize.get(`/batch/college-batch/${id}`)
  },
  getBatchById(id: string) {
    return authorize.get(`/batch/${id}`)
  },
  updateBatchByid(id: string, data: IBatchDTO) {
    return authorize.patch(`/batch/${id}`, data)
  },
  deleteBatchById(id: string) {
    return authorize.delete(`/batch/${id}`)
  },
}
