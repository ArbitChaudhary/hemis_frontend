<script setup lang="ts">
import { reactive, watch } from 'vue'
import type { ICollege, ICollegeDTO } from './college_types'

interface CollegeFormProps {
  onSubmit: (data: ICollegeDTO) => void
  mode: 'edit' | 'add'
  isLoading?: boolean
  initialData?: ICollege
  submitText?: string
}

const props = withDefaults(defineProps<CollegeFormProps>(), {
  submitText: 'Submit',
  mode: 'add',
})

const formData = reactive({
  college_name: '',
  affiliating_university: '',
  province: '',
  district: '',
  city: '',
  ward: null as number | null,
  email: '',
  mobile_number: null as number | null,
  landline_number: null as number | null,
})

watch(
  () => props.initialData,
  (newCollege) => {
    Object.assign(formData, newCollege)
  },
  {
    deep: true,
    immediate: true,
  },
)

const handleSubmit = () => {
  props.onSubmit({ ...formData })
}

const resetForm = () => {
  formData.college_name = ''
  formData.affiliating_university = ''
  formData.province = ''
  formData.district = ''
  formData.city = ''
  formData.ward = null
  formData.email = ''
  formData.mobile_number = null as number | null
  formData.landline_number = null as number | null
}

defineExpose({
  resetForm,
})
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <div class="form-container">
      <div class="input-item">
        <label for="Name" class="form-label">College Name</label>
        <input type="text" v-model="formData.college_name" />
      </div>
      <div class="input-item">
        <label for="University" class="form-label">Affiliated University</label>
        <input type="text" v-model="formData.affiliating_university" />
      </div>
      <div class="input-item">
        <label for="Province" class="form-label">Province</label>
        <input type="text" v-model="formData.province" />
      </div>
      <div class="input-item">
        <label for="District" class="form-label">District</label>
        <input type="text" v-model="formData.district" />
      </div>
      <div class="input-item">
        <label for="city" class="form-label">City</label>
        <input type="text" v-model="formData.city" />
      </div>
      <div class="input-item">
        <label for="ward" class="form-label">Ward No.</label>
        <input type="number" v-model="formData.ward" />
      </div>
      <div class="input-item">
        <label for="email" class="form-label">Email</label>
        <input type="email" v-model="formData.email" />
      </div>
      <div class="input-item">
        <label for="phone number" class="form-label">Phone Number</label>
        <input type="number" v-model="formData.mobile_number" />
      </div>
      <div class="input-item">
        <label for="landline" class="form-label">Landline Number</label>
        <input type="number" v-model="formData.landline_number" />
      </div>
      <button type="submit" :disabled="isLoading">
        {{ isLoading ? 'Loading...' : `${submitText}` }}
      </button>
    </div>
  </form>
</template>

<style scoped></style>
