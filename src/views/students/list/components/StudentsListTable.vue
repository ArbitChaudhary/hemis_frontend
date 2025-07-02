<script setup lang="ts">
import type { IStudent } from '../../common/types'

const data = defineProps<{
  students: IStudent[]
}>()
</script>

<template>
  <div class="">
    <table>
      <thead>
        <tr>
          <th class="t-name">Name</th>
          <th>Gender</th>
          <!-- <th class="t-email">Email</th> -->
          <th class="t-district">District</th>
          <th class="t-phone">Phone</th>
          <th class="t-program">Program</th>
          <th class="t-dob">Date of Birth</th>
          <th style="width: 150px">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="student in data.students" :key="student.id" style="height: 100%">
          <td>
            <div style="display: flex; gap: 5px; height: 100%; align-items: center">
              <img
                :src="student.profile_picture"
                alt=""
                style="width: 40px; height: 40px; border-radius: 50%; overflow: hidden"
              />
              {{ student.first_name_en }}
            </div>
          </td>
          <td>{{ student.gender }}</td>
          <td>{{ student.permanent_address.district }}</td>
          <td>{{ student.phone_number }}</td>
          <td>{{ student.academic_enrollment.program }}</td>
          <td>{{ student.date_of_birth?.split('T')[0] }}</td>
          <td>Edit</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
table {
  border-collapse: collapse;
  width: 100%;
  overflow: auto;
}
td {
  border: 1px solid #dddddd;
  text-align: center;
  padding: 8px;
}
th {
  font-weight: 600;
  border: 1px solid #dddddd;
  padding: 10px;
}
tr:nth-child(even) {
  background-color: #dddddd50;
}
thead {
  background-color: #dddddd;
}
.t-name {
  width: 200px;
}
.t-email {
  width: 150px;
}

.t-phone {
  width: 150px;
}
.t-program {
  width: 150px;
}
.t-dob {
  width: 150px;
}
.t-district {
  width: 150px;
}
</style>
