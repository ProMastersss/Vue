<template>
  <div class="app">
    <AppDialog v-model:show="show">
      <PostForm @create="create" />
    </AppDialog>

    <div class="container">
      <h1>Posts (Composition)</h1>
      <AppButton @click="showDialog">Add post</AppButton>

      <div class="tools">
        <div class="sort">
          Sort by <AppSelect v-model="selectedSort" :options="sortOptions" />
        </div>
        <AppInput v-focus v-model="searchQuery" placeholder="Search by title" />
      </div>
      <div v-if="!isLoading">
        <PostList :posts="searchAndSortPosts" @remove="remove" />
      </div>
      <div v-else>Loading...</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import PostForm from "@/components/PostForm.vue";
import PostList from "@/components/PostList.vue";
import AppDialog from "@/components/UI/AppDialog.vue";
import { Post } from "@/types/post";
import usePosts from "@/hooks/usePosts";
import useSortedPosts from "@/hooks/useSortedPosts";
import useSearchedPosts from "@/hooks/useSearchedPosts";

export default defineComponent({
  components: { AppDialog, PostForm, PostList },
  data() {
    return {
      show: false,
      sortOptions: [
        { name: "ID", value: "id" },
        { name: "Text", value: "content" },
        { name: "Title", value: "title" },
      ] as { name: string; value: keyof Post }[],
    };
  },
  setup(props) {
    const { posts, totalCountPages, isLoading } = usePosts(10);
    const { sortedPosts, selectedSort } = useSortedPosts(posts);
    const { searchQuery, sortedAndSearchedPosts } =
      useSearchedPosts(sortedPosts);

    return {
      posts,
      totalCountPages,
      isLoading,
      sortedPosts,
      selectedSort,
      searchQuery,
      searchAndSortPosts: sortedAndSearchedPosts,
    };
  },
  methods: {
    showDialog() {
      this.show = true;
    },
    create(post: Post) {
      this.show = false;
      this.posts.push(post);
    },
    remove(post: Post) {
      this.posts = this.posts.filter((p) => p.id !== post.id);
    },
  },
});
</script>

<style scoped>
.container {
  margin: 0 auto;
  width: 50%;
}

.tools {
  display: flex;
}

.sort {
  margin-top: 15px;
  margin-right: 15px;
}

.page__wrapper {
  margin: 15px 0;
  display: flex;
  justify-content: center;
}

.page {
  border: 1px solid black;
  padding: 10px;
  margin: 0 3px;
  cursor: pointer;
}

.page:hover {
  opacity: 0.9;
  background-color: lightgrey;
}

.current-page {
  border: 1px solid #76ff03;
}
</style>
