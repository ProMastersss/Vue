<template>
  <div class="app">
    <AppDialog v-model:show="show">
      <PostForm @create="create" />
    </AppDialog>

    <div class="container">
      <h1>Posts (Store)</h1>
      <AppButton @click="showDialog">Add post</AppButton>

      <div class="tools">
        <div class="sort">
          Sort by
          <AppSelect
            :model-value="selectedSort"
            @update:model-value="setSelectedSort"
            :options="sortOptions"
          />
        </div>
        <AppInput
          v-focus
          :model-value="searchQuery"
          @update:model-value="setSearchQuery"
          placeholder="Search by title"
        />
      </div>
      <div v-if="!isLoading">
        <PostList :posts="searchAndSortPosts" @remove="remove" />
      </div>
      <div v-else>Loading...</div>
      <!-- Подгрузка при прокрутке -->
      <div v-intersection:fetch="uploadPosts" class="border-list" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import PostForm from "@/components/PostForm.vue";
import PostList from "@/components/PostList.vue";
import AppDialog from "@/components/UI/AppDialog.vue";
import { Post } from "@/types/post";
import { createNamespacedHelpers } from "vuex";

const { mapState, mapMutations, mapGetters, mapActions } =
  createNamespacedHelpers("posts");

export default defineComponent({
  components: { AppDialog, PostForm, PostList },
  data() {
    return {
      show: false,
    };
  },
  methods: {
    ...mapMutations([
      "setPageNumber",
      "setSearchQuery",
      "setSelectedSort",
      "setPosts",
    ]),
    ...mapActions(["fetchPosts", "uploadPosts"]),
    showDialog() {
      this.show = true;
    },
    create(post: Post) {
      this.show = false;
      this.posts.push(post);
    },
    remove(post: Post) {
      this.setPosts(this.posts.filter((p: Post) => p.id !== post.id));
    },
  },
  mounted() {
    this.fetchPosts();
  },
  computed: {
    ...mapState([
      "isLoading",
      "selectedSort",
      "searchQuery",
      "pageNumber",
      "posts",
      "totalCountPages",
      "limitPosts",
      "sortOptions",
    ]),
    ...mapGetters(["searchAndSortPosts"]),
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
