<script setup lang="ts">
import MainLayout from '@/components/layouts/MainLayout.vue'
import SectionAddCollege from './components/SectionAddCollege.vue'
import DashboardHead from '@/components/ui/DashboardHead.vue'
</script>

<template>
  <MainLayout>
    <DashboardHead title="Add College" :subheader="['College', 'Add']" />
    <div class="container" style="background-color: white; padding: 20px">
      <SectionAddCollege />
    </div>
  </MainLayout>
</template>

<style scoped></style>
