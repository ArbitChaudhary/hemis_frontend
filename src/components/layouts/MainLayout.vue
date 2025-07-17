<script setup lang="ts">
import { SidebarData } from '@/data/sidebar_data'
import { computed, reactive, ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { BiChevronCompactDown } from 'oh-vue-icons/icons'
import { addIcons, OhVueIcon } from 'oh-vue-icons'

addIcons(BiChevronCompactDown)

const icon = {
  'v-icon': OhVueIcon,
}

const active = reactive({
  current: '',
})
const openDropdown = ref<Record<string, boolean>>({})

const route = useRoute()
const currentPath = computed(() => route.path)
const toggleDropdown = (title: string) => {
  openDropdown.value[title] = !openDropdown.value[title]
}
</script>

<template>
  <div class="main-layout">
    <div class="sidebar-layout">
      <div style="display: flex; justify-content: center; margin: 20px 0">
        <img src="/src/assets/images/school.png" alt="" class="logo" />
      </div>
      <div
        v-for="item in SidebarData"
        :key="item.title"
        :class="{ active: currentPath === item.href || route.name === item.href }"
        class="sidebar-item"
      >
        <!-- @click="active.current = item.href as string" -->
        <div
          style="
            width: 100%;
            display: flex;
            gap: 5px;
            align-items: center;
            justify-content: space-between;
          "
        >
          <RouterLink :to="{ name: item.href }" style="width: 100%; font-size: 14px">{{
            item.title
          }}</RouterLink>
          <!-- <v-icon name="bi-chevron-compact-down" scale="2" /> -->
          <component
            :is="icon['v-icon']"
            name="bi-chevron-compact-down"
            scale="2"
            v-if="item.children && item.children?.length > 0"
            @click.stop="toggleDropdown(item.title)"
          />
        </div>
        <div v-show="openDropdown[item.title]" class="pl-4 mt-1">
          <div
            v-for="data in item.children"
            :key="data.title"
            :class="{ active: currentPath === data.href || route.name === data.href }"
            class="sidebar-item"
          >
            <RouterLink :to="{ name: data.href }" style="width: 100%; font-size: 14px">{{
              data.title
            }}</RouterLink>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.main-layout {
  width: 100%;
  min-height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  gap: 5px;
  align-items: start;
  justify-content: start;
}
.container {
  width: 100%;
  height: 100%;
  padding: 20px 0 20px 20px;
  overflow: auto;
}
.logo {
  width: 100px;
  height: 100px;
  object-fit: contain;
}
.sidebar-layout {
  max-width: 250px;
  width: 100%;
  height: 100%;
  margin: 10px 0;
  background-color: #36404a;
  padding: 10px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.sidebar-item {
  width: 100%;
  padding: 5px 15px;
  font-size: 20px;
  font-weight: 600;
  color: white;
}

.sidebar-item.active {
  border: 1px solid white;
  border-radius: 5px;
  color: white;
}
</style>
