<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import BatchForm from './BatchForm.vue'
import type { IBatch, IBatchDTO } from './batch_types'
import { useEditBatchByIdMutation, useGetBatchByIdQuery } from './batch_api'

onMounted(() => {
  document.body.style.overflow = 'hidden'
})

onUnmounted(() => {
  document.body.style.overflow = ''
})
interface IEditModalProps {
  handleCloseEditModal: () => void
  id: number
}
const props = defineProps<IEditModalProps>()

const { data, isLoading } = useGetBatchByIdQuery(String(props.id))
const { isPending, mutateAsync } = useEditBatchByIdMutation(String(props.id))
const onSubmit = async (data: IBatchDTO) => {
  try {
    const res = await mutateAsync(data)
    if (res) {
      props.handleCloseEditModal()
    }
  } catch (error) {
    console.log(error)
  }
}
</script>

<template>
  <div class="modal-container" @click="">
    <div class="modal-box">
      <div v-if="isLoading">Loading....</div>
      <BatchForm
        v-else
        :onSubmit="onSubmit"
        :initialData="data as IBatch"
        :isLoading="isPending"
        submitText="Update"
        mode="edit"
      />
    </div>
  </div>
</template>

<style scoped>
.modal-container {
  position: fixed;
  width: 100dvw;
  height: 100dvh;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #00000050;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: auto;
  padding: 20px;
}

.modal-box {
  max-width: 500px;
  width: 100%;
  margin: 0 auto;
  padding: 50px;
  background-color: white;
}
</style>
