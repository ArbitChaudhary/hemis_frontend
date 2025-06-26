<script setup lang="ts">
import TableSkeleton from '@/components/ui/TableSkeleton.vue'
import { useGetAllStudents } from '../../common/student_api'
import StudentsListTable from './StudentsListTable.vue'

const { data, isLoading } = useGetAllStudents()
</script>

<template>
  <div class="student-table-container">
    <h1>All Students</h1>
    <div v-if="isLoading">
      <TableSkeleton />
    </div>
    <div v-else class="student-table">
      <StudentsListTable :students="data" />
    </div>
  </div>
</template>

<style scoped>
h1 {
  font-size: 30px;
  font-weight: bold;
}
.student-table-container {
  background-color: white;
  padding: 15px;
}
.student-table {
  width: 100%;
  overflow: auto;
}
</style>
