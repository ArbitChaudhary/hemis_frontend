<script setup lang="ts">
import TableSkeleton from '@/components/ui/TableSkeleton.vue'
import { useGetAllUsersQuery } from '../common/users_api'
import UserTable from './UserTable.vue'

const { data, isLoading } = useGetAllUsersQuery()
</script>

<template>
  <div v-if="isLoading">
    <TableSkeleton />
  </div>
  <div v-else>
    <UserTable :users="data" />
  </div>
</template>

<style scoped></style>
