<template>
  <ul class="history" ref="detector">
    <li
      v-for="(list, index) in userList"
      :key="index"
      class="history-list"
      @click="
        createHistory(
          'user',
          {
            searched_user:
              list.user == undefined ? list.id : list.searched_user,
          },
          {
            ...list,
            ...{
              searched_user:
                list.user == undefined ? list.id : list.searched_user,
            },
          }
        );
        search(list.user == undefined ? list.id : list.searched_user);
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
        v-if="keyword.trim().length == 0"
        @click.stop="deleteHistory(list.id)"
      ></button>
    </li>
    <p
      class="no-result"
      v-show="userList.length == 0 && keyword.trim().length > 0"
    >
      검색 결과가 없습니다.
    </p>
    <div class="loading1" v-show="loading">
      <img src="@/assets/images/paging_loading_ico1.png" />
    </div>
  </ul>
</template>
<script lang="ts">
  import {
    defineComponent,
    getCurrentInstance,
    onActivated,
    onMounted,
  } from "vue";
  import searchHistory from "@/components/search-category/searchHistory";
  export default defineComponent({
    name: "User Tab",
    setup() {
      const globalProperties =
        getCurrentInstance()?.appContext.config.globalProperties;
      const emitter = globalProperties?.emitter;
      const scrollDetect = globalProperties?.$scrollDetect;
      const router = globalProperties?.$router;
      let {
        keyword,
        isUserLastPage,
        userList,
        detector,
        page,
        loading,
        createHistory,
        deleteHistory,
        userSearch,
      } = searchHistory();
      const search = (id: number) => {
        router.push({
          path: "/userDetail",
          query: {
            id: id,
          },
        });
      };
      onActivated(() => {
        console.log("Writer컴포넌트 생성");
        scrollDetect(detector.value, () => {
          if (isUserLastPage.value == false && userList.value.length >= 20) {
            console.log("작가바닥감지");
            page.value += 1;
            userSearch();
          }
        });
      });
      onMounted(() => {
        console.log("user onmounted");
      });
      return {
        keyword,
        detector,
        userList,
        loading,
        search,
        createHistory,
        deleteHistory,
      };
    },
  });
</script>
<style scoped lang="scss">
  @import "@/components/search-category/search.scss";
</style>
