<script setup lang="ts">
import MainLayout from '@/components/layouts/MainLayout.vue'
import DashboardHead from '@/components/ui/DashboardHead.vue'
import SectionAddProgram from './components/SectionAddProgram.vue'
import SectionProgramTable from './components/SectionProgramTable.vue'
</script>

<template>
  <MainLayout>
    <DashboardHead title="Programs" :subheader="['Programs']" />
    <div class="container">
      <section>
        <SectionAddProgram />
      </section>
      <section style="margin-top: 20px">
        <SectionProgramTable />
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
