<template>
  <div class="app">
    <Navbar />
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Navbar from "@/components/Navbar.vue";

export default defineComponent({
  components: { Navbar },
});
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

*:focus {
  outline: 2px solid rgb(0, 92, 0);
}
</style>
