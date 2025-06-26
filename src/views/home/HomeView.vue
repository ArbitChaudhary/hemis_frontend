<script setup lang="ts">
import DashboardHead from '@/components/ui/DashboardHead.vue'
import AnalyticCard from '@/components/cards/AnalyticCard.vue'
import MainLayout from '@/components/layouts/MainLayout.vue'
</script>

<template>
  <MainLayout>
    <DashboardHead title="Dashboard" :subheader="['Admin']" />
    <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin-top: 30px">
      <AnalyticCard
        title="Teachers"
        :count="200"
        icon="la-chalkboard-teacher-solid"
        color="green"
        bgcolor="#8fbc8b80"
      />
      <AnalyticCard
        title="Students"
        :count="2000"
        icon="io-people-sharp"
        bgcolor="#F0E68C80"
        color="#FEBE10"
      />
      <AnalyticCard />
      <AnalyticCard />
    </div>
  </MainLayout>
</template>
