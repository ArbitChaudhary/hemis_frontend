<script setup lang="ts">
import MainLayout from '@/components/layouts/MainLayout.vue'
import DashboardHead from '@/components/ui/DashboardHead.vue'
import SectionStaffEdit from './components/SectionStaffEdit.vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const id = route.params?.id
</script>

<template>
  <MainLayout>
    <DashboardHead title="Edit Staff" :subheader="['Staff', 'Edit']" />
    <div class="container">
      <section style="background-color: white; padding: 20px">
        <SectionStaffEdit :id="id as string" />
      </section>
    </div>
  </MainLayout>
</template>

<style scoped></style>
