import { RootState } from "@/types/store";
import { createStore } from "vuex";
import { postsModule } from "./postsModule";

export default createStore<RootState>({
  modules: {
    posts: postsModule,
  },
});
