<template>
  <div class="navbar">
    <h1>Vue 3</h1>
    <div class="navbar__btns">
      <AppButton class="btn" @click="$router.push('/')">Home</AppButton>
      <AppButton class="btn" @click="$router.push('/posts')">Posts</AppButton>
      <AppButton class="btn" @click="$router.push('/posts-store')"
        >Posts (store)</AppButton
      >
      <AppButton class="btn" @click="$router.push('/posts-composition')"
        >Posts (composition)</AppButton
      >
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "nav-bar",
});
</script>

<style scoped>
.navbar {
  height: 50px;
  background-color: #1b9e69;
  box-shadow: 2px 2px 4px gray;
  display: flex;
  align-items: center;
  padding: 0 15px;
  margin-bottom: 20px;
}

.navbar__btns {
  margin-left: auto;
}

.btn {
  margin: 0 10px;
}
</style>
