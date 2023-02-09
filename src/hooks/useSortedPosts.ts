import { Post } from "@/types/post";
import { computed, ref, Ref } from "vue";

export default function useSortedPosts(posts: Ref<Post[]>) {
  const selectedSort = ref<keyof Post>("id");

  const sortedPosts = computed(() => {
    return [...posts.value].sort((post1, post2) =>
      String(post1[selectedSort.value]).localeCompare(
        String(post2[selectedSort.value])
      )
    );
  });

  return {
    selectedSort,
    sortedPosts,
  };
}
