<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import type { ILevelDTO } from './level_types'
import LevelForm from './LevelForm.vue'
import { useGetLevelByIdQuery, useUpdateLevelByIdMutation } from './level_api'

interface ILevelEditProps {
  id: number
  handleCloseEditModal: () => void
}
const props = defineProps<ILevelEditProps>()
onMounted(() => {
  document.body.style.overflow = 'hidden'
})

onUnmounted(() => {
  document.body.style.overflow = ''
})
const { isLoading, data } = useGetLevelByIdQuery(String(props.id))
const { isPending, mutateAsync } = useUpdateLevelByIdMutation(String(props.id))
const onSubmit = async (data: ILevelDTO) => {
  console.log(data)
  try {
    await mutateAsync(data)
    props.handleCloseEditModal()
  } catch (error) {
    console.log('Error:', error)
  }
}
</script>

<template>
  <div class="modal-container">
    <div class="modal-box">
      <div v-if="isLoading">Loading....</div>
      <LevelForm
        v-else
        :onSubmit="onSubmit"
        :isLoading="isPending"
        mode="edit"
        submitText="Update"
        :initialData="data"
      />
    </div>
  </div>
</template>

<style scoped>
.modal-box {
  max-width: 500px;
  width: 100%;
  background: white;
  padding: 20px;
}
</style>
