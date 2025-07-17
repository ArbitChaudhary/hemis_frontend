<script setup lang="ts">
import MainLayout from '@/components/layouts/MainLayout.vue'
import DashboardHead from '@/components/ui/DashboardHead.vue'
import SectionAddStaff from './components/SectionAddStaff.vue'
</script>

<template>
  <MainLayout>
    <DashboardHead title="Add Staff" :subheader="['Staff', 'Add']" />
    <div class="container">
      <section>
        <SectionAddStaff />
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
