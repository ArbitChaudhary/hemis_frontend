<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useUserStore } from '@/pinia/authStore'
import TableSkeleton from '@/components/ui/TableSkeleton.vue'
import StaffTable from './StaffTable.vue'
import { useGetAllStaffsQuery } from '../../common/staffs_api'

const store = useUserStore()
const router = useRouter()

const { data, isLoading } = useGetAllStaffsQuery(store?.userInfo?.college_id ?? undefined)

const handleAddStaff = () => {
  router.push('/staffs/add')
}
</script>

<template>
  <div style="display: flex; justify-content: flex-end">
    <button @click="handleAddStaff" style="height: 40px; padding: 0 30px; margin-bottom: 10px">
      Add Staff
    </button>
  </div>
  <div v-if="isLoading">
    <TableSkeleton />
  </div>
  <StaffTable v-else :staffs="data" />
</template>
<style scoped></style>
