<script setup lang="ts">
import { ref } from 'vue'
import { useAddCollegeMutation } from '../../common/college_api'
import type { ICollegeDTO } from '../../common/college_types'
import CollegeForm from '../../common/CollegeForm.vue'

const formRef = ref<InstanceType<typeof CollegeForm> | null>(null)

const { mutateAsync, isPending } = useAddCollegeMutation()
const onSubmit = async (data: ICollegeDTO) => {
  try {
    await mutateAsync(data)
    formRef.value?.resetForm()
  } catch (error) {
    console.log('Error adding a college', error)
  }
}
</script>

<template>
  <CollegeForm
    ref="formRef"
    mode="add"
    :onSubmit="onSubmit"
    :isLoading="isPending"
    submitText="Submit"
  />
</template>
