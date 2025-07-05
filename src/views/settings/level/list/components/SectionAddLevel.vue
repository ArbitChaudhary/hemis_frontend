<script setup lang="ts">
import { useAddLevelMutation } from '../../common/level_api'
import type { ILevelDTO } from '../../common/level_types'
import LevelForm from '../../common/LevelForm.vue'

const { isPending, mutateAsync } = useAddLevelMutation()
const onSubmit = async (data: ILevelDTO) => {
  console.log(data)
  try {
    await mutateAsync(data)
  } catch (error) {
    console.log('Error creating level', error)
  }
}
</script>

<template>
  <LevelForm mode="add" :onSubmit="onSubmit" :isLoading="isPending" />
</template>
