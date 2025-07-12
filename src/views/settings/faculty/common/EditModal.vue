<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { useGetFacultyByIdQuery, useUpdateFacultyByIdMutation } from './faculty_api'
import type { IFacultyDTO } from './faculty_types'
import FacultyForm from './FacultyForm.vue'

onMounted(() => {
  document.body.style.overflow = 'hidden'
})

onUnmounted(() => {
  document.body.style.overflow = ''
})

interface IEditModalProps {
  id: number
  handleCloseEditModal: () => void
}

const props = defineProps<IEditModalProps>()

const { isLoading, data } = useGetFacultyByIdQuery(props.id)

const { isPending, mutateAsync } = useUpdateFacultyByIdMutation(props.id)
const onSubmit = async (data: IFacultyDTO) => {
  try {
    await mutateAsync(data)
    props.handleCloseEditModal()
  } catch (error) {
    console.log('Error updating faculty', error)
  }
}
</script>

<template>
  <div class="modal-container">
    <div class="modal-box">
      <div v-if="isLoading">Loading</div>
      <FacultyForm
        v-else
        :onSubmit="onSubmit"
        mode="edit"
        :isLoading="isPending"
        :initialData="data"
      />
    </div>
  </div>
</template>

<style scoped>
.modal-box {
  max-width: 500px;
  width: 100%;
  margin: 0 auto;
  padding: 50px;
  background-color: white;
}
</style>
