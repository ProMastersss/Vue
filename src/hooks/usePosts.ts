import { getServerUrl, headers } from "@/helpers/common";
import { Post } from "@/types/post";
import ky from "ky";
import { onMounted, ref } from "vue";

export default function usePosts(limit: number) {
  const posts = ref<Post[]>([]);
  const totalCountPages = ref(0);
  const isLoading = ref(true);

  const fetchPosts = async () => {
    try {
      const response = await ky.get(getServerUrl("posts/all"), {
        headers,
        searchParams: {
          count: limit,
          offset: 0,
        },
      });

      totalCountPages.value = Number(response.headers.get("X-Total-Count"));
      posts.value = await response.json<Post[]>();
    } catch (e) {
      if (e instanceof Error) {
        alert(e.message);
      }
    } finally {
      isLoading.value = false;
    }
  };

  onMounted(fetchPosts);

  return { posts, totalCountPages, isLoading };
}
