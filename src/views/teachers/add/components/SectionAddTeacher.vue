<script setup lang="ts">
import { upload } from '@/config/cloudinary'
import { useAddTeacherMutation } from '../../common/teacher_api'
import type { ITeacherDTO } from '../../common/teacher_types'
import TeacherForm from '../../common/TeacherForm.vue'
import { ref } from 'vue'

const { mutateAsync, isPending } = useAddTeacherMutation()

const loading = ref<boolean>(false)

const onSubmit = async (data: ITeacherDTO) => {
  try {
    console.log(data)
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
    console.log('Error adding new teacher', error)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <TeacherForm :onSubmit="onSubmit" mode="add" submitText="Add" :isLoading="isPending || loading" />
</template>

<style scoped></style>
