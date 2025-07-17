<script setup lang="ts">
import AddStudentForm from './AddStudentForm.vue'
</script>

<template>
  <div class="form-container">
    <div style="width: 100%; display: flex; flex-direction: column">
      <h1>Add Student Details</h1>
      <AddStudentForm />
    </div>
  </div>
</template>

<style scoped>
.form-container {
  padding: 20px;
  background-color: white;
}
h1 {
  font-size: 20px;
  font-weight: bold;
  /* margin-bottom: 20px; */
}
</style>
