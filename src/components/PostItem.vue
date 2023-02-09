<template>
  <div class="post">
    <div class="post__content">
      <img
        class="post__image"
        :src="
          post.image
            ? getServerUrl(post.image)
            : require('../assets/no-image.png')
        "
      />
      <div class="post__text">
        <strong>{{ post.title }}</strong>
        <p>{{ post.content }}</p>
      </div>
    </div>
    <div class="post__btn">
      <AppButton @click="$router.push('/posts/' + post.id)">Open</AppButton>
      <AppButton @click="remove">Remove</AppButton>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Post } from "../types/post";
import { getServerUrl } from "../helpers/common";

export default defineComponent({
  props: {
    post: { type: Object as PropType<Post>, required: true },
  },
  methods: {
    remove() {
      this.$emit("remove");
    },
  },
  setup() {
    return {
      getServerUrl,
    };
  },
});
</script>

<style scoped>
.post {
  padding: 10px;
  border: 2px solid #76ff03;
  margin-top: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.post__content {
  display: flex;
}

.post__image {
  width: 100px;
  margin: 10px 20px 10px 10px;
  object-fit: cover;
}

.post__text {
  display: flex;
  flex-direction: column;
  margin-right: 10px;
}

.post__btn {
  display: flex;
  flex-direction: column;
}
</style>
