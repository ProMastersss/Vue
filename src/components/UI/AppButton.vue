<template>
  <button class="btn"><slot></slot></button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "AppButton",
});
</script>

<style scoped>
.btn {
  padding: 10px 15px;
  background: none;
  color: black;
  border: 1px solid #76ff03;
  cursor: pointer;
}

.btn:hover {
  opacity: 0.9;
  background-color: lightgreen;
}
</style>
