<template>
  <div class="posts" v-if="keyword.trim().length > 0">
    <MasnoryLayout :search="keyword" />
  </div>
  <ul class="history" v-else>
    <li v-for="(list, index) in allList" :key="index" class="history-list">
      <div
        v-if="list.tag == null"
        @click="
          createHistory('user', {
            searched_user:
              list.user == undefined ? list.id : list.searched_user,
          });
          router.push({
            path: '/userDetail',
            query: {
              id: list.user == undefined ? list.id : list.searched_user,
            },
          });
        "
      >
        <img
          v-if="list.image_profile == null"
          src="@/assets/images/signout_profile_img2.png"
          class="tag-img"
        />
        <img
          v-else
          :src="list.image_profile"
          :alt="list.username"
          :title="list.username"
          class="tag-img"
        />

        <div class="user-info">
          <b class="user-name">{{ list.username }}</b>
          <span class="works">작품 {{ list.count_posts }}개</span>
        </div>
        <button
          class="close-btn"
          v-if="list.user != undefined"
          @click.stop="deleteHistory(list.id)"
        ></button>
      </div>
      <div
        v-else
        @click="
          createHistory('tag', {
            tag: list.user == undefined ? list.id : list.tag,
          });
          search(list.title);
        "
      >
        <img src="@/assets/images/tag.png" alt="" title="" class="tag-img" />
        <div class="tag-info">
          <b class="tag-title"><b>#</b>{{ list.title }}</b>
          <span class="works">작품 {{ list.count_posts }}개</span>
        </div>
        <button
          class="close-btn"
          v-if="list.user != undefined"
          @click.stop="deleteHistory(list.id)"
        ></button>
      </div>
    </li>
  </ul>
</template>
<script lang="ts">
  import { defineComponent, getCurrentInstance, computed } from "vue";
  import MasnoryLayout from "@/components/common/MasnoryLayout.vue";
  import searchHistory from "@/components/search-category/searchHistory";
  export default defineComponent({
    name: "Total Tab",
    components: {
      MasnoryLayout,
    },
    setup() {
      const globalProperties =
        getCurrentInstance()?.appContext.config.globalProperties;
      const router = globalProperties?.$router;
      const emitter = globalProperties?.emitter;
      const { keyword, allList, createHistory, deleteHistory } =
        searchHistory();
      const search = (title: string) => {
        emitter.emit("search-result", title);
      };
      return { keyword, allList, router, search, createHistory, deleteHistory };
    },
  });
</script>
<style scoped lang="scss">
  @import "@/components/search-category/search.scss";
  .posts {
    overflow-y: auto;
    padding-top: 20px;
    box-sizing: border-box;
  }
</style>
