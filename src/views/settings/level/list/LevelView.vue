<script setup lang="ts">
import MainLayout from '@/components/layouts/MainLayout.vue'
import DashboardHead from '@/components/ui/DashboardHead.vue'
import LevelForm from '../common/LevelForm.vue'
import SectionAddLevel from './components/SectionAddLevel.vue'
import SectionLevelTable from './components/SectionLevelTable.vue'
</script>

<template>
  <MainLayout
    ><DashboardHead title="Batch" :subheader="['Batch']" />
    <div class="container">
      <div class="batch-container">
        <SectionAddLevel />
      </div>
      <div class="batch-container" style="margin-top: 30px">
        <SectionLevelTable />
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
