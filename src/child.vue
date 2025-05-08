<script setup lang="ts">
import { defineProps } from "vue";
const props = defineProps({
  childMsg: {
    type: String,
    default: "",
  },
});
</script>

<template>
  <div>{{ props.childMsg }}</div>
</template>

<style scoped></style>
