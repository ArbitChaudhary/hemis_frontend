<script setup lang="ts">
import { ref } from 'vue'
import type { IUserDTO } from '../common/user_types'
import UserForm from '../common/UserForm.vue'
import { useUserRegisterMutation } from '../common/users_api'

const formRef = ref<InstanceType<typeof UserForm> | null>(null)

const { isPending, mutateAsync } = useUserRegisterMutation()
const onSubmit = async (data: IUserDTO) => {
  try {
    console.log(data)
    await mutateAsync(data)
    formRef.value?.resetForm()
  } catch (error) {
    console.log('Error creating user', error)
  }
}
</script>

<template>
  <h2>Add User</h2>
  <div style="margin-top: 20px">
    <UserForm
      ref="formRef"
      :onSubmit="onSubmit"
      mode="add"
      :isLoading="isPending"
      submitText="Submit"
    />
  </div>
</template>

<style scoped></style>
