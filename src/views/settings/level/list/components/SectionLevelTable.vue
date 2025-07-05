<script setup lang="ts">
import { useUserStore } from '@/pinia/authStore'
import { useGetLevelsByCollegeIdQuery } from '../../common/level_api'
import LevelTable from './LevelTable.vue'
import TableSkeleton from '@/components/ui/TableSkeleton.vue'
import type { ILevel } from '../../common/level_types'

const store = useUserStore()

const { data, isLoading } = useGetLevelsByCollegeIdQuery(String(store?.userInfo?.college_id))
</script>

<template>
  <div v-if="isLoading">
    <TableSkeleton />
  </div>
  <div v-else>
    <LevelTable :levels="data as ILevel[]" />
  </div>
</template>

<style scoped></style>
