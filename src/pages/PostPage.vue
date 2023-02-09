<template>
  <div class="post">
    <h1>Post {{ $route.params.id }}</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({});
</script>

<style scoped>
.post {
  text-align: center;
}
</style>
