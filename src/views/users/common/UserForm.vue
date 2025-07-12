<script setup lang="ts">
import { useGetAllCollegesListQuery } from '@/views/college/common/college_api'
import { reactive, watch } from 'vue'
import type { IUser, IUserDTO } from './user_types'

interface UserFormProps {
  onSubmit: (data: IUserDTO) => void
  isLoading?: boolean
  mode?: 'edit' | 'add'
  submitText?: string
  initialData?: IUser
}

const roleList = [
  { title: 'Admin', value: 'Admin' },
  { title: 'User', value: 'user' },
]

const props = withDefaults(defineProps<UserFormProps>(), {
  mode: 'add',
  submitText: 'Submit',
})

const formData = reactive({
  email: '',
  password: '',
  role: '',
  college_id: null as number | null,
})
const { data: CollegeList } = useGetAllCollegesListQuery()

watch(
  () => props?.initialData,
  (newUser) => {
    Object.assign(formData, newUser)
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
  ;(formData.email = ''),
    (formData.password = ''),
    (formData.role = ''),
    (formData.college_id = null)
}

defineExpose({
  resetForm,
})
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <div class="form-container">
      <div class="input-item">
        <label for="college" class="form-level">College</label>
        <select v-model="formData.college_id">
          <option :value="null" style="color: gray">--Select</option>
          <option v-for="college in CollegeList" :key="college?.id" :value="college?.id">
            {{ college?.college_name }}
          </option>
        </select>
      </div>
      <div class="input-item">
        <label for="email" class="form-level">Email</label>
        <input type="email" v-model="formData.email" />
      </div>
      <div class="input-item">
        <label for="password" class="form-level">Password</label>
        <input type="text" v-model="formData.password" />
      </div>
      <div class="input-item">
        <label for="role" class="form-level">Role</label>
        <select v-model="formData.role">
          <option :value="null" style="color: gray">--Select</option>
          <option v-for="role in roleList" :key="role.title" :value="role.value">
            {{ role?.title }}
          </option>
        </select>
      </div>
      <button type="submit">Submit</button>
    </div>
  </form>
</template>

<style scoped></style>
