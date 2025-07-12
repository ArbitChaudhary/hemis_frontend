<script setup lang="ts">
import type { IUser } from '../common/user_types'

interface IUserTableProps {
  users: IUser[] | []
}

const props = defineProps<IUserTableProps>()

console.log(props.users)
</script>

<template>
  <table>
    <thead>
      <tr>
        <th>Email</th>
        <th>Role</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-if="users && users.length > 0" v-for="user in users" :key="user?.id">
        <td>{{ user?.email }}</td>
        <td>{{ user?.role.toLowerCase() }}</td>
        <td>Edit</td>
      </tr>
      <tr v-else>
        <td colspan="3" style="color: red">No Data</td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped></style>
