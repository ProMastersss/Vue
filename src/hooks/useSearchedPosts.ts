import { Post } from "@/types/post";
import { computed, Ref, ref } from "vue";

export default function useSearchedPosts(sortedPosts: Ref<Post[]>) {
  const searchQuery = ref("");

  const sortedAndSearchedPosts = computed(() => {
    return sortedPosts.value.filter((post) =>
      post.title.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  });

  return {
    searchQuery,
    sortedAndSearchedPosts,
  };
}
