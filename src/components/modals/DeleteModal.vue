<script setup lang="ts">
import { OhVueIcon, addIcons } from 'oh-vue-icons'
import { BiXCircle } from 'oh-vue-icons/icons'

addIcons(BiXCircle)
interface IDeleteProps {
  handleCloseDeleteModal: () => void
  isLoading: boolean
  subject?: string
  handleDelete: () => void
}

const deleteProps = defineProps<IDeleteProps>()
</script>

<template>
  <div class="modal-container">
    <div class="modal-box">
      <OhVueIcon name="bi-x-circle" class="close-icon" @click="handleCloseDeleteModal()" />
      <p>Are you sure you want to delete this {{ subject }}?</p>
      <span>This action cannot be undo.</span>
      <button
        :disabled="isLoading"
        @click="handleDelete()"
        style="background-color: red; padding: 0 20px; width: fit-content"
      >
        {{ deleteProps.isLoading ? 'Loading...' : 'Delete' }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.modal-box {
  position: relative;
  max-width: 500px;
  width: 100%;
  background-color: white;
  padding: 30px 20px 20px 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  justify-content: center;
}

.modal-box > p {
  font-size: 20px;
  font-weight: 600;
}

.modal-box > span {
  color: gray;
}

.close-icon {
  color: gray;
  transition: all ease-in-out 200ms;
  position: absolute;
  top: 5px;
  right: 5px;
  height: 30px;
  width: 30px;
}
.close-icon:hover {
  color: red;
  cursor: pointer;
}
</style>
