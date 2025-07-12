<script setup lang="ts">
import { computed, reactive, watch } from 'vue'
import type { IPrograms, IProgramsDTO } from './programs_types'
import { useUserStore } from '@/pinia/authStore'
import { useGetBatchByCollegeIdQuery } from '../../batch/common/batch_api'
import { useGetLevelByBatchIdQuery } from '../../level/common/level_api'
import { useGetFacultiesByLevelIdQuery } from '../../faculty/common/faculty_api'

interface ProgramFormProps {
  onSubmit: (data: IProgramsDTO) => void
  isLoading?: boolean
  submitText?: string
  mode?: 'edit' | 'add'
  initialData?: IPrograms
}

const store = useUserStore()

const collegeId = store.userInfo?.college_id ?? null
const formData = reactive({
  name: '',
  level: null as number | null,
  college_id: collegeId,
  batch: null as number | null,
  faculty: null as number | null,
})

const { data: batchArray } = useGetBatchByCollegeIdQuery(String(collegeId))
const { data: levelArray } = useGetLevelByBatchIdQuery(computed(() => formData.batch))
const { data: facultyArray } = useGetFacultiesByLevelIdQuery(computed(() => formData.level))

const props = withDefaults(defineProps<ProgramFormProps>(), {
  submitText: 'Submit',
  mode: 'add',
})

watch(
  () => props.initialData,
  (newProgram) => Object.assign(formData, newProgram),
  {
    immediate: true,
    deep: true,
  },
)

const handleSubmit = () => {
  props.onSubmit({ ...formData })
}

const resetForm = () => {
  formData.name = ''
  formData.batch = null
  formData.level = null
  formData.faculty = null
}

defineExpose({
  resetForm,
})
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <div class="form-container">
      <div class="input-item">
        <label for="batch" class="form-label">Batch</label>
        <select v-model="formData.batch" :disabled="batchArray?.length === 0">
          <option :value="null">--Select</option>
          <option v-for="batch in batchArray" :key="batch.id" :value="batch.id">
            {{ batch.name }}
          </option>
        </select>
      </div>
      <div class="input-item">
        <label for="level" class="form-label">Level</label>
        <select v-model="formData.level">
          <option :value="null">--Select</option>
          <option v-for="level in levelArray" :key="level.id" :value="level.id">
            {{ level.name }}
          </option>
        </select>
      </div>
      <div class="input-item">
        <label for="faculty" class="form-label">Faculty</label>
        <select v-model="formData.faculty">
          <option :value="null">--Select</option>
          <option v-for="faculty in facultyArray" :key="faculty.id" :value="faculty.id">
            {{ faculty.name }}
          </option>
        </select>
      </div>
      <div class="input-item">
        <label for="programs" class="form-label">Program</label>
        <input type="text" v-model="formData.name" />
      </div>
      <button type="submit" :disabled="isLoading">
        {{ isLoading ? 'Loading...' : `${submitText}` }}
      </button>
    </div>
  </form>
</template>

<style scoped></style>
