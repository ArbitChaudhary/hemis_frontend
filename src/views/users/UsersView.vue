<script setup lang="ts">
import MainLayout from '@/components/layouts/MainLayout.vue'
import DashboardHead from '@/components/ui/DashboardHead.vue'
import SectionAddUser from './add/SectionAddUser.vue'
import SectionUserList from './list/SectionUserList.vue'
</script>

<template>
  <MainLayout>
    <DashboardHead title="Users" :subheader="['Users']" />
    <div class="container">
      <section>
        <SectionAddUser />
      </section>
      <section style="margin-top: 20px">
        <SectionUserList />
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
