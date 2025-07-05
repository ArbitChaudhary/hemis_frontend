<script setup lang="ts">
import { useUserStore } from '@/pinia/authStore'
import { reactive, watch } from 'vue'
import type { IBatch, IBatchDTO } from './batch_types'

interface IBatchFormProps {
  initialData?: IBatch
  onSubmit: (data: IBatchDTO) => void
  isLoading?: boolean
  mode: 'edit' | 'add'
  submitText?: string
}
const props = withDefaults(defineProps<IBatchFormProps>(), {
  submitText: 'Submit',
  mode: 'add',
})

const userStore = useUserStore()
const formData = reactive({
  name: null as number | null,
  college_id: userStore.userInfo?.college_id ? userStore.userInfo?.college_id : null,
})
watch(
  () => props.initialData,
  (newData) => {
    formData.name = newData?.name as number
  },
  { immediate: true },
)
const handleSubmit = () => {
  props.onSubmit({ ...formData })
}
</script>
<template>
  <form @submit.prevent="handleSubmit" class="form-container batch">
    <div class="input-item">
      <input type="number" v-model="formData.name" />
    </div>
    <button :disabled="props.isLoading" type="submit" style="max-width: 100px">
      {{ props.isLoading ? 'Loading...' : `${submitText}` }}
    </button>
  </form>
</template>

<style scoped>
.form-container.batch {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
</style>
