export const sfcString = `
<script setup>
import { ref } from 'vue'

const msg = ref('Hello World!')
</script>

<template>
 <div class="container">
  <h1 class="title">{{ msg }}</h1>
  <input v-model="msg" />
</div>
</template>
<style scoped>
.container {
.title {
color: blue;
}
}
</style>
`;
