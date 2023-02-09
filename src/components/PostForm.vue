<template>
  <form>
    <h4>Creating post</h4>
    <AppInput
      type="text"
      placeholder="Title"
      v-focus
      v-model.trim="post.title"
    />
    <AppInput type="text" placeholder="Text" v-model.trim="post.content" />
    <AppButton type="button" class="btn" @click="createPost">Create</AppButton>
  </form>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      post: {
        title: "",
        content: "",
      },
    };
  },
  methods: {
    createPost() {
      this.$emit("create", { id: Date.now(), ...this.post });
      this.post = {
        title: "",
        content: "",
      };
    },
  },
  // Глубокое отслеживание
  /* watch: {
    post: {
      handler(newValue) {
        console.log(newValue);
      },
      deep: true,
    },
  }, */
});
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
}

.btn {
  align-self: flex-end;
  margin-top: 15px;
}
</style>
