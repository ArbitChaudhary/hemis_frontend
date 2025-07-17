<script setup lang="ts">
import { addIcons, OhVueIcon } from 'oh-vue-icons'
import type { ITeacher } from '../../common/teacher_types'
import { RiEdit2Fill, MdDeleteforeverTwotone } from 'oh-vue-icons/icons'

addIcons(RiEdit2Fill, MdDeleteforeverTwotone)

interface ITeacherTableProps {
  teachers: ITeacher[] | [] | undefined
}

const props = defineProps<ITeacherTableProps>()
</script>

<template>
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Phone Number</th>
        <th>Gender</th>
        <th>Caste</th>
        <th>Position</th>
        <th>Department</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-if="teachers && teachers?.length > 0" v-for="teacher in teachers" :key="teacher?.id">
        <td>{{ teacher?.first_name_en }}</td>
        <td>{{ teacher?.mobile_number }}</td>
        <td>{{ teacher?.gender }}</td>
        <td>{{ teacher?.caste }}</td>
        <td>{{ teacher?.job_info?.position }}</td>
        <td>{{ teacher?.job_info?.department }}</td>
        <td>
          <div style="display: flex; justify-content: center; align-items: center; gap: 10px">
            <OhVueIcon name="md-deleteforever-twotone" class="action-icon delete" />
            <OhVueIcon name="ri-edit-2-fill" class="action-icon edit" />
          </div>
        </td>
      </tr>
      <tr v-else>
        <td colspan="7" style="color: red">No Date</td>
      </tr>
    </tbody>
  </table>
</template>

<style></style>
