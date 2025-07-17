<script setup lang="ts">
import { upload } from '@/config/cloudinary'
import { ref } from 'vue'
import StaffForm from '../../common/StaffForm.vue'
import type { IStaffDTO } from '../../common/staff_types'
import { useAddStaffMutation } from '../../common/staffs_api'

const loading = ref<boolean>(false)

const { mutateAsync, isPending } = useAddStaffMutation()

const onSubmit = async (data: IStaffDTO) => {
  try {
    loading.value = true
    let teacher_photo_url: string = ''
    if (data?.photo instanceof File) {
      const uploadRes = await upload({ image: data?.photo })
      teacher_photo_url = uploadRes
    } else {
      teacher_photo_url = data?.photo
    }
    let citizenship_photo_url = ''
    if (data?.citizenship_photo instanceof File) {
      const uploadRes = await upload({ image: data?.citizenship_photo })
      citizenship_photo_url = uploadRes
    } else {
      citizenship_photo_url = data?.citizenship_photo
    }
    let academic_docs_url = ''
    if (data?.academic_info?.academic_docs instanceof File) {
      const uploadRes = await upload({ image: data?.academic_info?.academic_docs })
      academic_docs_url = uploadRes
    } else {
      academic_docs_url = data?.academic_info?.academic_docs
    }

    const payload = {
      ...data,
      photo: teacher_photo_url,
      citizenship_photo: citizenship_photo_url,
      academic_info: {
        ...data?.academic_info,
        academic_docs: academic_docs_url,
      },
    }

    await mutateAsync(payload)
  } catch (error) {
    console.log('Error adding new staff', error)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <StaffForm :onSubmit="onSubmit" mode="add" submitText="Add" :isLoading="isPending || loading" />
</template>

<style scoped></style>
