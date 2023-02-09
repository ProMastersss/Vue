import { Module } from "vuex";
import { PostsState } from "./posts";

export interface RootState {
  modules: {
    posts: Module<PostsState, RootState>;
  };
}
