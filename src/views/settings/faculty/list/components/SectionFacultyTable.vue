<script setup lang="ts">
import FacultyTable from './FacultyTable.vue'
import { useUserStore } from '@/pinia/authStore'
import { useGetFacultiesByCollegeIdQuery } from '../../common/faculty_api'
import TableSkeleton from '@/components/ui/TableSkeleton.vue'

const store = useUserStore()
// const collegeId = store.userInfo?.college_id ? store.userInfo?.college_id : null
const { data, isLoading } = useGetFacultiesByCollegeIdQuery(store?.userInfo?.college_id as number)
</script>

<template>
  <div v-if="isLoading">
    <TableSkeleton />
  </div>
  <div v-else>
    <FacultyTable :faculties="data" />
  </div>
</template>
