<script setup lang="ts">
import TableSkeleton from '@/components/ui/TableSkeleton.vue'
import { useGetAllCollegesListQuery } from '../../common/college_api'
import CollegeTable from './CollegeTable.vue'

const { data, isLoading } = useGetAllCollegesListQuery()
</script>
<template>
  <div class="top-flex">
    <h2>All Colleges</h2>
    <button style="padding: 0 20px">
      <RouterLink to="/college/add">Add College</RouterLink>
    </button>
  </div>
  <div v-if="isLoading">
    <TableSkeleton />
  </div>
  <div v-else>
    <CollegeTable :colleges="data" />
  </div>
</template>

<style scoped>
.top-flex {
  display: flex;
  flex-direction: row;
  gap: 20px;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

@media (max-width: 992px) {
  .top-flex {
    flex-direction: column-reverse;
    gap: 10px;
    justify-content: start;
    align-items: flex-start;
  }
}
</style>
