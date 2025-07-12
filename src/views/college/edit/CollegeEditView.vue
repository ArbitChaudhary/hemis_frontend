<script setup lang="ts">
import MainLayout from '@/components/layouts/MainLayout.vue'
import DashboardHead from '@/components/ui/DashboardHead.vue'
import SectionEditCollege from './components/SectionEditCollege.vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const collegeId = route.params.id
</script>

<template>
  <MainLayout>
    <DashboardHead title="Edit College" :subheader="['College', 'Edit']" />
    <div class="container" style="background-color: white; padding: 20px">
      <SectionEditCollege :id="Number(collegeId)" />
    </div>
  </MainLayout>
</template>

<style scoped></style>
