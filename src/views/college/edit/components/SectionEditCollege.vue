<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { ICollegeDTO } from '../../common/college_types'
import CollegeForm from '../../common/CollegeForm.vue'
import { useRoute, useRouter } from 'vue-router'
import { useGetCollegeByIdQuery, useUpdateCollegeByIdMutation } from '../../common/college_api'

const props = defineProps<{
  id: number
}>()

const formRef = ref<InstanceType<typeof CollegeForm> | null>(null)

const router = useRouter()

const { data, isLoading } = useGetCollegeByIdQuery(props.id)
const { mutateAsync, isPending } = useUpdateCollegeByIdMutation(props.id)
const onSubmit = async (data: ICollegeDTO) => {
  try {
    await mutateAsync(data)
    formRef.value?.resetForm()
    router.push('/college')
  } catch (error) {
    console.log('Error updating college', error)
  }
}
</script>

<template>
  <div v-if="isLoading">Loading...</div>
  <CollegeForm
    v-else
    ref="formRef"
    mode="edit"
    :onSubmit="onSubmit"
    :initialData="data"
    :isLoadig="isPending"
    submitText="Update"
  />
</template>

<style scoped></style>
