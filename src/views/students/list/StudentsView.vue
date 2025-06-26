<script setup lang="ts">
import MainLayout from '@/components/layouts/MainLayout.vue'
import DashboardHead from '@/components/ui/DashboardHead.vue'
import SectionStudentsList from './components/SectionStudentsList.vue'
</script>

<template>
  <MainLayout>
    <DashboardHead title="Students" :subheader="['Students']" />
    <div class="container">
      <SectionStudentsList />
    </div>
  </MainLayout>
</template>

<style scoped></style>
