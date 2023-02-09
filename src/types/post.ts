export interface Post {
  id: number;
  title: string;
  content: string;
  image: string;
}

export interface SortOption {
  name: string;
  value: keyof Post;
}
