<script setup lang="ts">
import MainLayout from '@/components/layouts/MainLayout.vue'
import DashboardHead from '@/components/ui/DashboardHead.vue'
import SectionAddBatch from './components/SectionAddBatch.vue'
import SectionBatchTable from './components/SectionBatchTable.vue'
</script>

<template>
  <MainLayout
    ><DashboardHead title="Batch" :subheader="['Batch']" />
    <div class="container">
      <div class="batch-container">
        <SectionAddBatch />
      </div>
      <div class="batch-container" style="margin-top: 30px">
        <SectionBatchTable />
      </div>
    </div>
  </MainLayout>
</template>

<style scoped>
.batch-container {
  background-color: white;
  padding: 20px;
}
</style>
