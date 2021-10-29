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
  import { defineComponent, getCurrentInstance, onMounted, ref } from "vue";
  import searchHistory from "@/components/search-category/searchHistory";
  export default defineComponent({
    name: "Writer Tab",

    setup() {
      const globalProperties =
        getCurrentInstance()?.appContext.config.globalProperties;
      const emitter = globalProperties?.emitter;
      const detector = ref(null);
      const { userList, tagPage, tagSearch } = searchHistory();
      const search = (obj: { [key: string]: any }) => {
        emitter.emit("search-result", obj);
      };
      onMounted(() => {
        const selector = detector.value as unknown as HTMLElement;
        selector.addEventListener("scroll", (e) => {
          if (
            selector.clientHeight + selector.scrollTop >=
            selector.scrollHeight
          ) {
            console.log("바닥감지", e);
            tagSearch().then((result: any) => {
              console.log("작가 추가리스트결과::", result);
              tagPage.value += 1;
            });
          }
        });
      });
      return { detector, search, userList };
    },
  });
</script>
<style scoped lang="scss">
  @import "@/components/search-category/search.scss";
</style>
