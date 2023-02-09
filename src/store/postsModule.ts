import { getServerUrl, headers } from "@/helpers/common";
import { Post } from "@/types/post";
import { RootState } from "@/types/store";
import { PostsState } from "@/types/store/posts";
import ky from "ky";
import { ActionTree, GetterTree, Module, MutationTree } from "vuex";

const state = (): PostsState => ({
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
});

const getters: GetterTree<PostsState, RootState> = {
  // Сортируем и используем копию, posts без изменений
  sortedPosts(state): Post[] {
    return [...state.posts].sort((p1, p2) =>
      String(p1[state.selectedSort]).localeCompare(
        String(p2[state.selectedSort])
      )
    );
  },
  searchAndSortPosts(state, getters): Post[] {
    return getters.sortedPosts.filter((post: Post) =>
      post.title.toLowerCase().includes(state.searchQuery.toLowerCase())
    );
  },
};

const mutations: MutationTree<PostsState> = {
  setPosts(state, posts: Post[]) {
    state.posts = posts;
  },
  pushPosts(state, posts: Post | Post[]) {
    if (Array.isArray(posts)) {
      state.posts.push(...posts);
    } else {
      state.posts.push(posts);
    }
  },
  setLoading(state, bool: boolean) {
    state.isLoading = bool;
  },
  setPageNumber(state, pageNumber: number) {
    state.pageNumber = pageNumber;
  },
  setSelectedSort(state, selectedSort: keyof Post) {
    state.selectedSort = selectedSort;
  },
  setTotalCountPages(state, totalCountPages: number) {
    state.totalCountPages = totalCountPages;
  },
  setSearchQuery(state, searchQuery: string) {
    state.searchQuery = searchQuery;
  },
};

const actions: ActionTree<PostsState, RootState> = {
  async fetchPosts({ state, commit }) {
    try {
      const response = await ky.get(getServerUrl("posts/all"), {
        headers,
        searchParams: {
          count: state.limitPosts,
          offset: 0,
        },
      });

      commit(
        "setTotalCountPages",
        Number(response.headers.get("X-Total-Count"))
      );
      commit("setPosts", await response.json<Post[]>());
    } catch (e) {
      if (e instanceof Error) {
        alert(e.message);
      }
    } finally {
      commit("setLoading", false);
    }
  },
  async uploadPosts({ state, commit }) {
    if (state.posts.length < state.totalCountPages) {
      try {
        const response = await ky.get(getServerUrl("posts/all"), {
          headers,
          searchParams: {
            count: state.limitPosts,
            offset: state.posts.length,
          },
        });

        commit(
          "setTotalCountPages",
          Number(response.headers.get("X-Total-Count"))
        );
        commit("pushPosts", await response.json<Post[]>());
      } catch (e) {
        if (e instanceof Error) {
          alert(e.message);
        }
      }
    }
  },
};

export const postsModule = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
} as Module<PostsState, RootState>;
