<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { useDeleteBatchByIdMutation } from './batch_api'

onMounted(() => {
  document.body.style.overflow = 'hidden'
})

onUnmounted(() => {
  document.body.style.overflow = ''
})

interface IDeleteProps {
  handleCloseDeleteModal: () => void
  id: string
}

const props = defineProps<IDeleteProps>()

const { isPending, mutateAsync } = useDeleteBatchByIdMutation()

const handleDeleteBatch = async () => {
  try {
    await mutateAsync(Number(props.id))
    props.handleCloseDeleteModal()
  } catch (error) {
    console.log('Error deleting batch', error)
  }
}
</script>

<template>
  <div class="delete-container">
    <div class="delete-box">
      <div class="delete-content">
        <p>Are you sure you want do delete?</p>
        <span>This action cannot be undo.</span>
        <button
          @click="handleDeleteBatch"
          :disabled="isPending"
          style="background-color: #ff0000; padding: 0 20px; height: 40px"
        >
          {{ isPending ? 'Loading...' : 'Delete' }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.delete-container {
  position: fixed;
  z-index: 0;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100vh;
  overflow: auto;
  padding: 20px;
  background-color: #00000050;
  display: flex;
  justify-content: center;
  align-items: center;
}

.delete-box {
  position: relative;
  z-index: 50;
  max-width: 500px;
  width: 100%;
  margin: 0 auto;
  background-color: #fff;
  border-radius: 5px;
  padding: 20px;
}
.delete-content {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: center;
  align-items: center;
}
.delete-content > p {
  font-size: 20px;
  font-weight: 600;
}

.delete-content > span {
  color: gray;
}
</style>
