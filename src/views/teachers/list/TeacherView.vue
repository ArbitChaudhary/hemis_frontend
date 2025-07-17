<script setup lang="ts">
import MainLayout from '@/components/layouts/MainLayout.vue'
import DashboardHead from '@/components/ui/DashboardHead.vue'
import SectionTeacherList from './components/SectionTeacherList.vue'
</script>

<template>
  <MainLayout>
    <DashboardHead title="Teachers" :subheader="['Teachers', 'All']" />
    <div class="container">
      <section>
        <SectionTeacherList />
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
