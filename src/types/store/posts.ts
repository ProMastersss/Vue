import { Post, SortOption } from "../post";

export interface PostsState {
  isLoading: boolean;
  selectedSort: keyof Post;
  searchQuery: string;
  pageNumber: number;
  posts: Post[];
  totalCountPages: number;
  limitPosts: number;
  sortOptions: SortOption[];
}
