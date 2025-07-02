<script setup lang="ts">
import TableSkeleton from '@/components/ui/TableSkeleton.vue'
import { useGetAllStudents } from '../../common/student_api'
import StudentsListTable from './StudentsListTable.vue'

const { data, isLoading } = useGetAllStudents()
</script>

<template>
  <div class="student-table-container">
    <div
      style="
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 20px;
        flex-wrap: wrap-reverse;
      "
    >
      <h1>All Students</h1>
      <button>
        <RouterLink to="/students/add">Add Student</RouterLink>
      </button>
    </div>
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

button {
  padding: 6px 30px;
  height: 40px;
  border-radius: 5px;
}
</style>
