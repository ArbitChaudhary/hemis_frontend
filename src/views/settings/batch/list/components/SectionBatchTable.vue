<script setup lang="ts">
import { useUserStore } from '@/pinia/authStore'
import { useGetBatchByCollegeIdQuery } from '../../common/batch_api'
import TableSkeleton from '@/components/ui/TableSkeleton.vue'
import BatchTable from './BatchTable.vue'

const userStore = useUserStore()

const { data, isLoading } = useGetBatchByCollegeIdQuery(String(userStore.userInfo?.college_id))
</script>

<template>
  <div v-if="isLoading">
    <TableSkeleton />
  </div>
  <div v-else>
    <BatchTable :data="data" />
  </div>
</template>

<style></style>
