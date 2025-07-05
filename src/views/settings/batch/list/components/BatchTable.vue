<script setup lang="ts">
import { addIcons, OhVueIcon } from 'oh-vue-icons'
import type { IBatch } from '../../common/batch_types'
import { FaEdit, MdDeleteforeverTwotone } from 'oh-vue-icons/icons'
import { ref } from 'vue'
import BatchEditModal from '../../common/BatchEditModal.vue'
import BatchDeleteModal from '../../common/BatchDeleteModal.vue'

addIcons(FaEdit, MdDeleteforeverTwotone)

interface IBatchTableProps {
  data: IBatch[] | []
}
const isEditModalOpen = ref(false)
const isDeleteModalOpen = ref(false)
const selectedId = ref<number | null>(null)

const props = defineProps<IBatchTableProps>()

const handleOpenEditModal = (id: number) => {
  selectedId.value = id
  isEditModalOpen.value = true
}

const handleCloseEditModal = () => {
  selectedId.value = null
  isEditModalOpen.value = false
}
const handleOpenDeleteModal = (id: number) => {
  selectedId.value = id
  isDeleteModalOpen.value = true
}

const handleCloseDeleteModal = () => {
  selectedId.value = null
  isDeleteModalOpen.value = false
}
</script>

<template>
  <table>
    <thead>
      <tr>
        <th>Batch</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="data in props.data">
        <td>{{ data.name }}</td>
        <td>
          <div style="display: flex; gap: 10px; align-items: center; justify-content: center">
            <OhVueIcon
              name="fa-edit"
              class="action-icon edit"
              @click="handleOpenEditModal(data.id)"
            />
            <OhVueIcon
              name="md-deleteforever-twotone"
              class="action-icon delete"
              @click="handleOpenDeleteModal(data.id)"
            />
          </div>
        </td>
      </tr>
    </tbody>
  </table>
  <div v-if="isEditModalOpen">
    <BatchEditModal :handleCloseEditModal="handleCloseEditModal" :id="selectedId as number" />
  </div>
  <div v-if="isDeleteModalOpen">
    <BatchDeleteModal :handleCloseDeleteModal="handleCloseDeleteModal" :id="String(selectedId)" />
  </div>
</template>

<style scoped>
table {
  border: 1px solid gray;
  border-collapse: collapse;
}
.action-icon {
  height: 30px;
  width: 30px;
  color: white;
  padding: 5px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.action-icon:hover {
  cursor: pointer;
}
.action-icon.edit {
  background-color: rgb(23, 44, 139);
}
.action-icon.delete {
  background-color: rgb(199, 39, 39);
}
</style>
