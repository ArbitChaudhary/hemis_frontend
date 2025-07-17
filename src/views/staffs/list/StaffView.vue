<script setup lang="ts">
import MainLayout from '@/components/layouts/MainLayout.vue'
import DashboardHead from '@/components/ui/DashboardHead.vue'
import SectionStaffList from './components/SectionStaffList.vue'
</script>

<template>
  <MainLayout>
    <DashboardHead title="Staffs" :subheader="['Staffs', 'All']" />
    <div class="container">
      <section>
        <SectionStaffList />
      </section>
    </div>
  </MainLayout>
</template>

<style scoped>
section {
  background-color: white;
  padding: 20px;
}
</style>
