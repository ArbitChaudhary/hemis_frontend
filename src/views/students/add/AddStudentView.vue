<script setup lang="ts">
import MainLayout from '@/components/layouts/MainLayout.vue'
import SectionAddStudentForm from './components/SectionAddStudentForm.vue'
import DashboardHead from '@/components/ui/DashboardHead.vue'
</script>

<template>
  <MainLayout>
    <DashboardHead title="Add Student" :subheader="['Student', 'Add']" />
    <div class="container">
      <SectionAddStudentForm />
    </div>
  </MainLayout>
</template>

<style scoped></style>
