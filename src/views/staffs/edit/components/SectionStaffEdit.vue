<script setup lang="ts">
import type { IStaffDTO } from '../../common/staff_types'
import StaffForm from '../../common/StaffForm.vue'
import { useGetStaffDetailsByIdQuery } from '../../common/staffs_api'

const props = defineProps<{
  id: string
}>()

const { data, isLoading } = useGetStaffDetailsByIdQuery(Number(props.id))

const onSubmit = async (data: IStaffDTO) => {
  console.log(data)
}
</script>

<template>
  <div v-if="isLoading">Loading</div>
  <StaffForm v-else :onSubmit="onSubmit" mode="edit" submitText="Update" :initialData="data" />
</template>

<style></style>
