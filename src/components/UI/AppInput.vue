<template>
  <input class="input" :value="modelValue" @input="update" />
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "AppInput",
  props: {
    modelValue: [String, Number],
  },
  methods: {
    update(event: Event) {
      return this.$emit(
        "update:modelValue",
        (event.target as HTMLInputElement).value
      );
    },
  },
});
</script>

<style scoped>
.input {
  border: 1px solid #76ff03;
  padding: 10px 15px;
  margin-top: 15px;
}
</style>
