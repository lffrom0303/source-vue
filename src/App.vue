<script setup>
import { ref, computed } from "vue";
import Child from "./child.vue";
const msg = ref("Hello World!");
const logFn = () => {
  console.log("Hello World!");
};
const childMsg = computed(() => {
  return `Child: ${msg.value}`;
});
logFn();
</script>

<template>
  <div class="container">
    <h1 class="title">{{ msg }}</h1>
    <input v-model="msg" />
    <Child :childMsg="childMsg" />
  </div>
</template>
<style scoped>
.container {
  .title {
    color: blue;
  }
}
</style>
