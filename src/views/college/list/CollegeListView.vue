<script setup lang="ts">
import MainLayout from '@/components/layouts/MainLayout.vue'
import SectionCollegeList from './components/SectionCollegeList.vue'
import DashboardHead from '@/components/ui/DashboardHead.vue'
</script>

<template>
  <MainLayout>
    <DashboardHead title="College" :subheader="['College']" />
    <div class="container">
      <section style="">
        <SectionCollegeList />
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
