<script setup lang="ts">
const props = defineProps<{
  title: string
  subheader: string[]
}>()
</script>

<template>
  <h1 class="header">{{ props.title }}</h1>
  <div class="sub-header">
    <span>Home</span>
    <div style="color: #fea801; display: flex; flex-direction: row; flex-wrap: wrap; gap: 5px">
      >
      <!-- <div v-for="header in subheader" :key="header">{{ header }} ></div> -->
      {{ props.subheader.join('  >  ') }}
    </div>
  </div>
</template>

<style scoped>
.header {
  font-size: 22px;
  font-weight: bold;
}
.sub-header {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 5px;
  font-size: 18px;
  font-weight: 500;
}

@media (max-width: 990px) {
  .header {
    font-size: 18px;
  }
  .sub-header {
    font-size: 14px;
  }
}
</style>
