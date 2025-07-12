<script setup lang="ts">
import { addIcons, OhVueIcon } from 'oh-vue-icons'
import type { IPrograms } from '../../common/programs_types'
import { RiEdit2Fill, MdDeleteforeverTwotone } from 'oh-vue-icons/icons'

addIcons(RiEdit2Fill, MdDeleteforeverTwotone)

interface IProgramTableProps {
  programs: IPrograms[] | []
}

const props = defineProps<IProgramTableProps>()
</script>

<template>
  <table>
    <thead>
      <tr>
        <th>Faculty</th>
        <th>Program</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-if="programs && programs.length > 0" v-for="program in programs" :key="program.id">
        <td>{{ program.faculty }}</td>
        <td>{{ program.name }}</td>
        <td>
          <div style="display: flex; justify-content: center; align-items: center; gap: 10px">
            <OhVueIcon name="ri-edit-2-fill" class="action-icon edit" />
            <OhVueIcon name="md-deleteforever-twotone" class="action-icon delete" />
          </div>
        </td>
      </tr>
      <tr v-else>
        <td colspan="3" style="text-align: center; color: red">No Data</td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped></style>
