<template>
  <ul class="history" ref="detector">
    <li
      v-for="(list, index) in userList"
      :key="index"
      class="history-list"
      @click="
        createHistory('user', {
          searched_user: list.user == undefined ? list.id : list.searched_user,
        });
        search({
          id: list.searched_user,
          name: list.username,
        });
      "
    >
      <img src="@/assets/images/ex1.png" alt="" title="" class="tag-img" />
      <div class="user-info">
        <b class="user-name">{{ list.username }}</b>
        <span class="works">저작물 1개</span>
      </div>
      <button
        class="close-btn"
        v-if="list.user != undefined"
        @click.stop="deleteHistory(list.id)"
      ></button>
    </li>
  </ul>
</template>
<script lang="ts">
  import { defineComponent, getCurrentInstance, onActivated } from "vue";
  import searchHistory from "@/components/search-category/searchHistory";
  export default defineComponent({
    name: "User Tab",
    setup() {
      const globalProperties =
        getCurrentInstance()?.appContext.config.globalProperties;
      const emitter = globalProperties?.emitter;
      const scrollDetect = globalProperties?.$scrollDetect;
      let {
        isUserLastPage,
        userList,
        detector,
        page,
        createHistory,
        deleteHistory,
        userSearch,
      } = searchHistory();
      const search = (obj: { [key: string]: any }) => {
        emitter.emit("search-result", obj);
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
      return { detector, userList, search, createHistory, deleteHistory };
    },
  });
</script>
<style scoped lang="scss">
  @import "@/components/search-category/search.scss";
</style>
