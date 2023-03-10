import { defineComponent } from "vue";

export default defineComponent({
  props: {
    show: { type: Boolean, default: false },
  },
  emits: ["update:show"],
  methods: {
    hide() {
      this.$emit("update:show", false);
    },
  },
});
