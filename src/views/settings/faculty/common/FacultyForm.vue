<script setup lang="ts">
import { useUserStore } from '@/pinia/authStore'
import { computed, reactive, ref } from 'vue'
import {
  useGetLevelByBatchIdQuery,
  useGetLevelsByCollegeIdQuery,
} from '../../level/common/level_api'
import type { IFaculty, IFacultyDTO } from './faculty_types'
import { useGetBatchByCollegeIdQuery } from '../../batch/common/batch_api'

interface FacultyFormProps {
  onSubmit: (data: IFacultyDTO) => void
  isLoading: boolean
  submitText?: string
  initialData?: IFaculty
  mode: 'add' | 'edit'
}

const store = useUserStore()
const props = withDefaults(defineProps<FacultyFormProps>(), {
  submitText: 'Submit',
  mode: 'add',
})
const formData = reactive({
  level: '',
  name: '',
  college_id: store?.userInfo?.college_id ? store?.userInfo?.college_id : null,
})
const batchId = reactive({
  batch_id: null as number | null,
})

const collegeId = store?.userInfo?.college_id ? store?.userInfo?.college_id : null
const { data: BatchArray } = useGetBatchByCollegeIdQuery(String(collegeId))
const { data: LevelArray } = useGetLevelByBatchIdQuery(computed(() => batchId.batch_id))

const handleSubmit = () => {
  props.onSubmit({ ...formData })
}

console.log(batchId.batch_id)
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <div class="form-container">
      <div class="input-item">
        <label for="Batch" class="form-level">Batch</label>
        <select v-model="batchId.batch_id">
          <option :value="null" class="select">--Select</option>
          <option v-for="batch in BatchArray" :key="batch?.id" :value="batch?.id">
            {{ batch?.name }}
          </option>
        </select>
      </div>
      <div class="input-item">
        <label for="Level" class="form-level">Level</label>
        <select v-model="formData.level">
          <option :value="null" class="select">--Select</option>
          <option v-for="level in LevelArray" :key="level?.id" :value="level?.id">
            {{ level?.name }}
          </option>
        </select>
      </div>
      <div class="input-item">
        <label for="program" class="form-level">Program</label>
        <input type="text" v-model="formData.name" />
      </div>
      <button type="submit" :disabled="isLoading">
        {{ isLoading ? 'Loading...' : `${submitText}` }}
      </button>
    </div>
  </form>
</template>

<style>
.select {
  color: gray;
}
</style>
