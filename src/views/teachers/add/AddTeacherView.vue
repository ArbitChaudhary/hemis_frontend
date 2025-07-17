<script setup lang="ts">
import MainLayout from '@/components/layouts/MainLayout.vue'
import DashboardHead from '@/components/ui/DashboardHead.vue'
import SectionAddTeacher from './components/SectionAddTeacher.vue'
</script>

<template>
  <MainLayout>
    <DashboardHead title="Add Teacher" :subheader="['Teacher', 'Add']" />
    <div class="container">
      <section>
        <SectionAddTeacher />
      </section>
    </div>
  </MainLayout>
</template>

<style scoped>
section {
  background-color: white;
  padding: 25px;
}
</style>
