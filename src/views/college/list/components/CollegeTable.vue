<script setup lang="ts">
import { addIcons, OhVueIcon } from 'oh-vue-icons'
import type { ICollege } from '../../common/college_types'
import { RiEdit2Fill, MdDeleteforeverTwotone } from 'oh-vue-icons/icons'
import { useRouter } from 'vue-router'

addIcons(RiEdit2Fill, MdDeleteforeverTwotone)

interface ICollegeTableProps {
  colleges: ICollege[] | []
}

const router = useRouter()
const props = defineProps<ICollegeTableProps>()

const handleCollegeEdit = (id: number) => {
  router.push(`/college/edit/${id}`)
}
</script>

<template>
  <table>
    <thead>
      <tr>
        <th rowspan="2" class="t-name">College Name</th>
        <th rowspan="2" class="t-affiliated">Affiliated University</th>
        <th colspan="3">Address</th>
        <th rowspan="2">Email</th>
        <th rowspan="2">Phone</th>
        <th rowspan="2" class="t-actions">Actions</th>
      </tr>
      <tr>
        <th>Province</th>
        <th>District</th>
        <th>City</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-if="props.colleges && props.colleges.length > 0"
        v-for="college in colleges"
        :key="college?.id"
      >
        <td>{{ college?.college_name }}</td>
        <td>{{ college?.affiliating_university }}</td>
        <td>{{ college?.province }}</td>
        <td>{{ college?.district }}</td>
        <td>{{ college?.city }}</td>
        <td>{{ college?.email }}</td>
        <td>
          {{ college?.mobile_number }} <br />
          {{ college?.landline_number }}
        </td>
        <td>
          <div style="display: flex; justify-content: center; align-items: center; gap: 10px">
            <OhVueIcon
              name="ri-edit-2-fill"
              class="action-icon edit"
              @click="handleCollegeEdit(college?.id)"
            />
            <OhVueIcon name="md-deleteforever-twotone" class="action-icon delete" />
          </div>
        </td>
      </tr>
      <tr v-else>
        <td colspan="7" style="color: red">No Data</td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
.t-name {
  width: 250px;
}
.t-affiliated {
  width: 250px;
}
.t-actions {
  width: 150px;
}
</style>
