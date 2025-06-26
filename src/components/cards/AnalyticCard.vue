<script setup lang="ts">
const props = defineProps<{
  title?: string
  count?: number
  icon?: string
  color?: string
  bgcolor?: string
}>()
import { OhVueIcon, addIcons } from 'oh-vue-icons'
import { GiTeacher, LaChalkboardTeacherSolid, IoPeopleSharp } from 'oh-vue-icons/icons'

addIcons(GiTeacher, LaChalkboardTeacherSolid, IoPeopleSharp)

const components = {
  'v-icon': OhVueIcon,
}
</script>

<template>
  <div class="analytic-card-box">
    <div class="analytic-card">
      <div class="icon-box" :style="{ backgroundColor: bgcolor }">
        <OhVueIcon :name="props.icon" v-if="props.icon" scale="2" :style="{ color: color }" />
      </div>
      <div class="analytic-content">
        <div class="analytic-title">{{ title }}</div>
        <div class="analytic-count">{{ count }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.analytic-card-box {
  width: 100%;
  height: fit-content;
  /* box-shadow: 10px 2px 5px 0 #00000020; */
  padding: 20px;
  border-radius: 5px;
  background: white;
}
.analytic-card {
  display: flex;
  flex-direction: row;
  gap: 30px;
  align-items: center;
}
.icon-box {
  padding: 20px;
  border-radius: 50%;
  background: #8fbc8b80;
  width: fit-content;
}

.analytic-content {
  display: flex;
  flex-direction: column;
  gap: 5px;
}
.analytic-title {
  font-size: 20px;
  font-weight: 500;
  color: gray;
}
.analytic-count {
  font-size: 28px;
  font-weight: bold;
  text-align: center;
}
</style>
