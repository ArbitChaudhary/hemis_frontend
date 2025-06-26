<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useLoginUserMutation } from './common/loginApi'
import { useRouter } from 'vue-router'

const { mutateAsync, isPending, data } = useLoginUserMutation()

const router = useRouter()

const formData = ref({
  email: '',
  password: '',
})
const emit = defineEmits(['onSubmit'])
const onSubmit = async (e: Event) => {
  emit('onSubmit', { ...formData })
  const data = {
    email: formData.value,
  }
  try {
    const result = await mutateAsync(formData.value)
    console.log(result.data)
    if (result.data?.access_token) {
      localStorage.setItem('access_token', result.data.access_token)
    }
    router.push('/')
  } catch (error) {
    console.log(error)
  }

  // console.log(formData.value.email)
}
</script>

<template>
  <div class="login-box">
    <div>
      <div style="display: flex; justify-content: center; margin: 20px 0">
        <img src="/src/assets/images/school.png" alt="" class="logo" />
      </div>
      <form @submit.prevent="onSubmit">
        <div class="login-form">
          <div class="login-input-element">
            <label for="email" style="margin-bottom: 5px">Email</label>
            <input
              v-model="formData.email"
              type="email"
              value="email"
              placeholder="email address..."
              required
            />
          </div>
          <div class="login-input-element">
            <label for="password" style="margin-bottom: 5px">Password</label>
            <input v-model="formData.password" type="password" placeholder="password..." required />
          </div>
          <button type="submit">{{ isPending ? 'Loading' : 'Submit' }}</button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.login-box {
  max-width: 400px;
  width: 100%;
  margin: 0 auto;
  /* border: 2px dashed white; */
}
.login-box > div {
  width: 100%;
  margin: 100px auto;
  border: 2px dashed white;
  border-radius: 10px;
  padding: 20px;
}
.logo {
  width: 100px;
  height: 100px;
  object-fit: contain;
}
.login-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
@media (max-width: 990px) {
  .login-box {
    margin: 50px 0;
  }
  .login-box > div {
    width: 100%;
    margin: 50px auto;
    border: 2px dashed white;
    border-radius: 10px;
    padding: 20px;
  }
  .login-form {
    gap: 15px;
  }
}
</style>
