<script setup lang="ts">
import { useUserStore } from '@/pinia/authStore'
import ProgramTable from './ProgramTable.vue'
import { useGetProgramsByCollegeIdQuery } from '../../common/program_api'
import TableSkeleton from '@/components/ui/TableSkeleton.vue'

const store = useUserStore()

const collegeId = store.userInfo?.college_id ?? null

const { data, isLoading } = useGetProgramsByCollegeIdQuery(collegeId as number)
</script>

<template>
  <div v-if="isLoading">
    <TableSkeleton />
  </div>
  <div v-else>
    <ProgramTable :programs="data" />
  </div>
</template>

<style scoped></style>
