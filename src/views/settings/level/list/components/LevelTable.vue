<script setup lang="ts">
import { addIcons, OhVueIcon } from 'oh-vue-icons'
import type { ILevel } from '../../common/level_types'
import { RiEdit2Fill, MdDeleteforeverTwotone } from 'oh-vue-icons/icons'
import { ref } from 'vue'
import LevelEditModal from '../../common/LevelEditModal.vue'
import DeleteModal from '@/components/modals/DeleteModal.vue'
import { useDeleteLevelByIdMutation } from '../../common/level_api'

addIcons(RiEdit2Fill, MdDeleteforeverTwotone)
const isEditModalOpen = ref(false)
const isDeleteModalOpen = ref(false)
const selectedId = ref<number | null>(null)
interface ILevelTableProps {
  levels: ILevel[] | []
}
const props = defineProps<ILevelTableProps>()

const { isPending, mutateAsync } = useDeleteLevelByIdMutation()

const handleOpenEditModal = (id: number) => {
  isEditModalOpen.value = true
  selectedId.value = id
}

const handleCloseEditModal = () => {
  isEditModalOpen.value = false
  selectedId.value = null
}
const handleOpenDeleteModal = (id: number) => {
  isDeleteModalOpen.value = true
  selectedId.value = id
}

const handleCloseDeleteModal = () => {
  isDeleteModalOpen.value = false
  selectedId.value = null
}
const handleDeleteLevel = async () => {
  console.log(selectedId.value)
  try {
    await mutateAsync(Number(selectedId.value))
    handleCloseDeleteModal()
  } catch (error) {
    console.log('Error', error)
  }
}
</script>

<template>
  <table>
    <thead>
      <tr>
        <th>Batch</th>
        <th>Level</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-if="props.levels.length > 0" v-for="level in props.levels" :key="level.id">
        <td>{{ level.batch }}</td>
        <td>{{ level.name }}</td>
        <td>
          <div
            class=""
            style="display: flex; gap: 10px; align-items: center; justify-content: center"
          >
            <OhVueIcon
              name="ri-edit-2-fill"
              class="action-icon edit"
              @click="handleOpenEditModal(level?.id)"
            />
            <OhVueIcon
              name="md-deleteforever-twotone"
              class="action-icon delete"
              @click="handleOpenDeleteModal(level?.id)"
            />
          </div>
        </td>
      </tr>
      <tr v-else>
        <td colspan="3" style="text-align: center; color: red">No data</td>
      </tr>
    </tbody>
  </table>
  <div v-if="isEditModalOpen">
    <LevelEditModal :id="selectedId as number" :handleCloseEditModal="handleCloseEditModal" />
  </div>
  <div v-if="isDeleteModalOpen">
    <DeleteModal
      :isLoading="isPending"
      :handleCloseDeleteModal="handleCloseDeleteModal"
      subject="Level"
      :handleDelete="handleDeleteLevel"
    />
  </div>
</template>

<style scoped></style>
