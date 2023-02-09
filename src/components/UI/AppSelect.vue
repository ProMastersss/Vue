<template>
  <select
    class="select"
    :value="modelValue"
    @change="$emit('update:modelValue', $event.target.value)"
  >
    <option disabled>Select from list</option>
    <option v-for="option in options" :key="option.value" :value="option.value">
      {{ option.name }}
    </option>
  </select>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Option } from "../../types/select";

export default defineComponent({
  name: "AppSelect",
  props: {
    modelValue: { type: String, default: "" },
    options: {
      type: Array as PropType<Option[]>,
      default: () => [],
    },
  },
});
</script>

<style scoped>
.select {
  padding: 10px 15px;
  background: none;
  color: black;
  border: 1px solid #76ff03;
}
</style>
