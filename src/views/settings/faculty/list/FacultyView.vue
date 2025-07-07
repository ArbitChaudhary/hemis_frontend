<script setup lang="ts">
import MainLayout from '@/components/layouts/MainLayout.vue'
import SectionAddFaculty from './components/SectionAddFaculty.vue'
import SectionFacultyTable from './components/SectionFacultyTable.vue'
</script>
<template>
  <MainLayout>
    <div class="container">
      <section>
        <SectionAddFaculty />
      </section>
      <section style="margin-top: 20px">
        <SectionFacultyTable />
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
