import { Directive } from "vue";

export default {
  name: "focus",
  mounted(el) {
    el.focus();
  },
} as Directive<HTMLElement> & { name: string };
