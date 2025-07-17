<script setup lang="ts">
import { useRouter } from 'vue-router'
import TeacherTable from './TeacherTable.vue'
import { useGetAllTeachersQuery } from '../../common/teacher_api'
import { useUserStore } from '@/pinia/authStore'
import TableSkeleton from '@/components/ui/TableSkeleton.vue'

const store = useUserStore()
const router = useRouter()

const { data, isLoading } = useGetAllTeachersQuery(store.userInfo?.college_id ?? undefined)

const handleAddTeacher = () => {
  router.push('/teachers/add')
}
</script>

<template>
  <div style="display: flex; justify-content: flex-end">
    <button @click="handleAddTeacher" style="height: 40px; padding: 0 30px; margin-bottom: 10px">
      Add Teacher
    </button>
  </div>
  <div v-if="isLoading">
    <TableSkeleton />
  </div>
  <TeacherTable v-else :teachers="data" />
</template>
<style scoped></style>
