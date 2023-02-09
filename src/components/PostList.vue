<template>
  <div class="posts">
    <div v-if="Array.isArray(posts) && posts.length">
      <transition-group name="posts-list">
        <PostItem
          v-for="post in posts"
          :key="post.id"
          :post="post"
          @remove="$emit('remove', post)"
        />
      </transition-group>
    </div>
    <div v-else class="alert">No Posts</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import PostItem from "./PostItem.vue";
import { Post } from "@/types/post";

export default defineComponent({
  components: { PostItem },
  props: {
    posts: { type: Object as PropType<Post[]>, required: true },
  },
});
</script>

<style scoped>
.alert {
  width: 100%;
  margin: 10px 0;
  padding: 10px;
  background-color: lightblue;
}

.posts-list-item {
  display: inline-block;
  margin-right: 10px;
}
.posts-list-enter-active,
.posts-list-leave-active {
  transition: all 0.4s ease;
}
.posts-list-enter-from,
.posts-list-leave-to {
  opacity: 0;
  transform: translateX(130px);
}
.posts-list-move {
  transition: transform 0.4s ease;
}
</style>
