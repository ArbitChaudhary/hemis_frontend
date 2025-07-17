<script setup lang="ts">
import { addIcons, OhVueIcon } from 'oh-vue-icons'
import type { IStaff } from '../../common/staff_types'
import { RiEdit2Fill, MdDeleteforeverTwotone } from 'oh-vue-icons/icons'
import { useRouter } from 'vue-router'

addIcons(RiEdit2Fill, MdDeleteforeverTwotone)

interface ITeacherTableProps {
  staffs: IStaff[] | [] | undefined
}

const props = defineProps<ITeacherTableProps>()
const router = useRouter()
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
      <tr v-if="staffs && staffs?.length > 0" v-for="staff in staffs" :key="staff?.id">
        <td>{{ staff?.first_name_en }}</td>
        <td>{{ staff?.phone_number }}</td>
        <td>{{ staff?.gender }}</td>
        <td>{{ staff?.caste }}</td>
        <td>{{ staff?.job_info?.position }}</td>
        <td>{{ staff?.job_info?.department }}</td>
        <td>
          <div style="display: flex; justify-content: center; align-items: center; gap: 10px">
            <OhVueIcon name="md-deleteforever-twotone" class="action-icon delete" />
            <OhVueIcon
              name="ri-edit-2-fill"
              @click="() => router.push(`/staffs/edit/${staff?.id}`)"
              class="action-icon edit"
            />
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
