<template>
  <div class="table-container">
    <table class="tg">
      <tr>
        <th class="tg-cly1" v-for="i in 8" :key="'head-' + i">
          <div class="line"></div>
        </th>
      </tr>
      <tr v-for="r in 4" :key="'row-' + r">
        <td class="tg-cly1" v-for="i in 8" :key="'cell-' + r + '-' + i">
          <div class="line"></div>
        </td>
      </tr>
    </table>
  </div>
</template>

<style scoped>
body {
  margin: 0;
}

.table-container {
  overflow-x: auto;
  width: 100%;
}

.tg {
  border-collapse: collapse;
  border-spacing: 0;
  border-color: #ccc;
  min-width: 800px;
  width: max-content;
}
.tg td,
.tg th {
  font-family: Arial, sans-serif;
  font-size: 14px;
  padding: 10px 5px;
  border-style: solid;
  border-width: 0px;
  overflow: hidden;
  word-break: normal;
  border-color: #ccc;
  color: #333;
}
.tg td {
  background-color: #fff;
}
.tg th {
  background-color: #f0f0f0;
  font-weight: normal;
}

.line {
  float: left;
  width: 100px;
  height: 16px;
  margin-top: 12px;
  border-radius: 7px;
  background-image: linear-gradient(
    90deg,
    #f4f4f4 0px,
    rgba(229, 229, 229, 0.8) 40px,
    #f4f4f4 80px
  );
  background-size: 600px;
  animation: shine-lines 2s infinite ease-out;
}

@keyframes shine-lines {
  0% {
    background-position: -100px;
  }
  40%,
  100% {
    background-position: 140px;
  }
}
</style>
