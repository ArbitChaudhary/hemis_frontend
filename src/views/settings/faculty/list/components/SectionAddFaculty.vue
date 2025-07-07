<script setup lang="ts">
import { useAddFacultyMutation } from '../../common/faculty_api'
import type { IFacultyDTO } from '../../common/faculty_types'
import FacultyForm from '../../common/FacultyForm.vue'

const { isPending, mutateAsync } = useAddFacultyMutation()
const onSubmit = async (data: IFacultyDTO) => {
  try {
    await mutateAsync(data)
  } catch (error) {
    console.log('Error adding faculty', error)
  }
}
</script>

<template>
  <FacultyForm mode="add" :onSubmit="onSubmit" :isLoading="isPending" submitText="Add" />
</template>

<style scoped></style>
