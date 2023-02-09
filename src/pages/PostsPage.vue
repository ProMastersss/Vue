<template>
  <div class="app">
    <AppDialog v-model:show="show">
      <PostForm @create="create" />
    </AppDialog>

    <div class="container">
      <h1>Posts</h1>
      <AppButton @click="showDialog">Add post</AppButton>

      <div class="tools">
        <div class="sort">
          Sort by <AppSelect v-model="selectedSort" :options="sortOptions" />
        </div>
        <AppInput v-focus v-model="searchQuery" placeholder="Search by title" />
      </div>
      <div v-if="!isLoading">
        <PostList :posts="searchAndSortPosts" @remove="remove" />
        <!-- Для пагинации -->
        <!--  <div class="page__wrapper">
          <div
            v-for="number in totalCountPages"
            :key="number"
            class="page"
            :class="{ 'current-page': number === pageNumber }"
            @click="changePage(number)"
          >
            {{ number }}
          </div>
        </div> -->
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
import ky from "ky";
import { getServerUrl, headers } from "../helpers/common";

export default defineComponent({
  components: { AppDialog, PostForm, PostList },
  data() {
    return {
      show: false,
      isLoading: true,
      selectedSort: "" as keyof Post,
      searchQuery: "",
      pageNumber: 1,
      posts: [] as Post[],
      totalCountPages: 0,
      limitPosts: 3,
      sortOptions: [
        { name: "ID", value: "id" },
        { name: "Text", value: "content" },
        { name: "Title", value: "title" },
      ] as { name: string; value: keyof Post }[],
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
    // Для пагинации
    /* changePage(number: number) {
      this.pageNumber = number;
    }, */
    async fetchPosts() {
      try {
        const response = await ky.get(getServerUrl("posts/all"), {
          headers,
          searchParams: {
            count: this.limitPosts,
            offset: 0,
          },
        });

        this.totalCountPages = Number(response.headers.get("X-Total-Count"));
        this.posts = await response.json<Post[]>();
      } catch (e) {
        if (e instanceof Error) {
          alert(e.message);
        }
      } finally {
        this.isLoading = false;
      }
    },
    async uploadPosts() {
      if (this.posts.length < this.totalCountPages) {
        try {
          const response = await ky.get(getServerUrl("posts/all"), {
            headers,
            searchParams: {
              count: this.limitPosts,
              offset: this.posts.length,
            },
          });

          this.totalCountPages = Math.ceil(
            Number(response.headers.get("X-Total-Count"))
          );
          this.posts.push(...(await response.json<Post[]>()));
        } catch (e) {
          if (e instanceof Error) {
            alert(e.message);
          }
        }
      }
    },
  },
  mounted() {
    this.fetchPosts();
  },
  computed: {
    // Сортируем и используем копию, posts без изменений
    sortedPosts(): Post[] {
      return [...this.posts].sort((p1, p2) =>
        String(p1[this.selectedSort]).localeCompare(
          String(p2[this.selectedSort])
        )
      );
    },
    searchAndSortPosts(): Post[] {
      return this.sortedPosts.filter((post) =>
        post.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
  },
  watch: {
    // Массив posts меняется
    /* selectedSort(newValue: keyof Post) {
      this.posts.sort((p1, p2) =>
        String(p1[newValue]).localeCompare(String(p2[newValue]))
      );
    },*/
    /* pageNumber() {
      this.fetchPosts();
    }, */
  },
  /*  setup() {
    const posts = ref<Post[]>([]);
    let totalCountPages = ref(0);
    const limitPosts = 3;
    const borderlist = ref<HTMLInputElement | null>(null);

    onMounted(() => {
      const options = {
        rootMargin: "0px",
        threshold: 1.0,
      };

      const callback = async (entries: IntersectionObserverEntry[]) => {
        if (
          entries[0].isIntersecting &&
          posts.value.length < totalCountPages.value
        ) {
          try {
            const response = await ky.get(getServerUrl("posts/all"), {
              headers,
              searchParams: {
                count: limitPosts,
                offset: posts.value.length,
              },
            });

            totalCountPages.value = Math.ceil(
              Number(response.headers.get("X-Total-Count")) / limitPosts
            );
            posts.value.push(...(await response.json<Post[]>()));
          } catch (e) {
            if (e instanceof Error) {
              alert(e.message);
            }
          }
        }
      };

      const observer = new IntersectionObserver(callback, options);
      if (borderlist.value) {
        observer.observe(borderlist.value);
      }
    });

    return {
      posts,
      totalCountPages,
      limitPosts,
      borderlist,
    };
  }, */
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
