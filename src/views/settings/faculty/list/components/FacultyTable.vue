<script setup lang="ts">
import type { IFaculty } from '../../common/faculty_types'
import { RiEdit2Fill, MdDeleteforeverTwotone } from 'oh-vue-icons/icons'
import { addIcons, OhVueIcon } from 'oh-vue-icons'
import { ref } from 'vue'
import EditModal from '../../common/EditModal.vue'

addIcons(RiEdit2Fill, MdDeleteforeverTwotone)

interface FacultyTableProps {
  faculties: IFaculty[] | []
}
const props = defineProps<FacultyTableProps>()

const isEditModalOpen = ref<boolean>(false)
const selectedId = ref<number | null>(null)

const handleOpenEditModal = (id: number) => {
  isEditModalOpen.value = true
  selectedId.value = id
}

const handleCloseEditModal = () => {
  isEditModalOpen.value = false
  selectedId.value = null
}
</script>

<template>
  <table>
    <thead>
      <tr>
        <th>Level</th>
        <th>Progams</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-if="faculties && faculties.length > 0" v-for="item in faculties" :key="item.id">
        <td>{{ item?.level }}</td>
        <td>{{ item?.name }}</td>
        <td>
          <div style="display: flex; justify-content: center; align-items: center; gap: 10px">
            <OhVueIcon
              name="ri-edit-2-fill"
              class="action-icon edit"
              @click="handleOpenEditModal(item?.id)"
            />
            <OhVueIcon name="md-deleteforever-twotone" class="action-icon delete" />
          </div>
        </td>
      </tr>
      <tr v-else style="color: red; text-align: center">
        <td colspan="3">No Data</td>
      </tr>
    </tbody>
  </table>
  <div v-if="isEditModalOpen">
    <EditModal :id="selectedId as number" :handleCloseEditModal="handleCloseEditModal" />
  </div>
</template>

<style scoped></style>
