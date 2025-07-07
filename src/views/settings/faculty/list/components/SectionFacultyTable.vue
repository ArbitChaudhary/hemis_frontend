<script setup lang="ts">
import { useUserStore } from '@/pinia/authStore'
import { useGetFacultiesByCollegeIdQuery } from '../../common/faculty_api'

const store = useUserStore()
const collegeId = store.userInfo?.college_id ? store.userInfo?.college_id : null
const { data, isLoading } = useGetFacultiesByCollegeIdQuery(store?.userInfo?.college_id as number)
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
      <tr v-if="data && data?.length > 0" v-for="item in data" :key="item.id">
        <td>{{ item?.level }}</td>
        <td>{{ item?.name }}</td>
        <td>Edit</td>
      </tr>
      <tr v-else style="color: red; text-align: center">
        <td colspan="3">No Data</td>
      </tr>
    </tbody>
  </table>
</template>
