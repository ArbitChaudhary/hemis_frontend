<script setup lang="ts">
import { mode } from '@cloudinary/url-gen/actions/rotate'
import BatchForm from '../../common/BatchForm.vue'
import type { IBatchDTO } from '../../common/batch_types'
import { useAddBatchMutation } from '../../common/batch_api'

const { mutateAsync, isPending } = useAddBatchMutation()
const onSubmit = async (data: IBatchDTO) => {
  try {
    await mutateAsync(data)
  } catch (error) {
    console.log(error)
  }
}
</script>

<template>
  <BatchForm :onSubmit="onSubmit" mode="add" submitText="Submit" :isLoading="isPending" />
</template>

<style></style>
