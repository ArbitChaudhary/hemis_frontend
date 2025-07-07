<script setup lang="ts">
import { useUserStore } from '@/pinia/authStore'
import type { ILevel, ILevelDTO } from './level_types'
import { useGetBatchByCollegeIdQuery } from '../../batch/common/batch_api'
import { reactive, watch } from 'vue'

const store = useUserStore()

const formData = reactive({
  name: '',
  batch: null as number | null,
  college_id: store.userInfo?.college_id ? store.userInfo?.college_id : null,
})

interface ILevelFormProps {
  onSubmit: (data: ILevelDTO) => void
  initialData?: ILevel
  isLoading?: boolean
  mode?: 'edit' | 'add'
  submitText?: string
}

const collegeId = store.userInfo?.college_id ? store.userInfo?.college_id : ''
const props = withDefaults(defineProps<ILevelFormProps>(), {
  mode: 'add',
  submitText: 'Submit',
})

const { data: BatchArray } = useGetBatchByCollegeIdQuery(collegeId as string)
watch(
  () => props.initialData,
  (newLevel) => {
    ;(formData.name = newLevel?.name as string), (formData.batch = newLevel?.batch as number)
  },
  { immediate: true },
)
const handleSubmit = () => {
  props.onSubmit({ ...formData })
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="form-container">
    <div class="input-item">
      <label for="batch" class="form-level">Batch</label>
      <select v-model="formData.batch" :disabled="!BatchArray">
        <option :value="null" class="select">--Select</option>
        <option v-for="batch in BatchArray" :key="batch.id" :value="batch?.id">
          {{ batch?.name }}
        </option>
      </select>
    </div>
    <div class="input-item">
      <label for="name" class="form-level">Level</label>
      <input type="text" v-model="formData.name" />
    </div>
    <button>{{ isLoading ? 'Loading...' : `${submitText}` }}</button>
  </form>
</template>

<style scoped>
.select {
  color: gray;
}
</style>
