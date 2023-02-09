import { Directive } from "vue";

export default {
  name: "intersection",
  mounted(el, binding) {
    if (binding.arg === "fetch" && binding.value instanceof Function) {
      const options = {
        rootMargin: "0px",
        threshold: 1.0,
      };

      const callback = async (entries: IntersectionObserverEntry[]) => {
        if (entries[0].isIntersecting) {
          binding.value();
        }
      };

      const observer = new IntersectionObserver(callback, options);
      if (el) {
        observer.observe(el);
      }
    }
  },
} as Directive<HTMLElement, () => void> & { name: string };
