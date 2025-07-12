<script setup lang="ts">
import { ref } from 'vue'
import { useAddProgramMutation } from '../../common/program_api'
import ProgramForm from '../../common/ProgramForm.vue'
import type { IProgramsDTO } from '../../common/programs_types'

const formRef = ref<InstanceType<typeof ProgramForm>>()
const { mutateAsync, isPending } = useAddProgramMutation()
const onSubmit = async (data: IProgramsDTO) => {
  try {
    console.log(data)
    await mutateAsync(data)
    formRef.value?.resetForm()
  } catch (error) {
    console.log('Error adding progam', error)
  }
}
</script>

<template>
  <ProgramForm :onSubmit="onSubmit" mode="add" :isLoading="isPending" submitText="Add" />
</template>

<style></style>
