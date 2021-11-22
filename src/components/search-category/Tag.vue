<template>
  <ul class="history" ref="detector">
    <li
      v-for="(list, index) in tagList"
      :key="index"
      class="history-list"
      @click="
        createHistory('tag', {
          tag: list.user == undefined ? list.id : list.tag,
        });
        search(list.title);
      "
    >
      <img src="@/assets/images/tag.png" alt="" title="" class="tag-img" />
      <div class="tag-info">
        <b class="tag-title">#{{ list.title }}</b>
        <span class="works">작품 {{ list.count_posts }}개</span>
      </div>
      <button
        class="close-btn"
        v-if="list.user != undefined"
        @click.stop="deleteHistory(list.id)"
      ></button>
    </li>
    <div class="loading1" v-show="loading">
      <img src="@/assets/images/paging_loading_ico1.png" />
    </div>
    <p
      class="no-result"
      v-show="tagList.length == 0 && keyword.trim().length > 0"
    >
      검색 결과가 없습니다.
    </p>
  </ul>
</template>
<script lang="ts">
  import { defineComponent, getCurrentInstance, onActivated } from "vue";
  import searchHistory from "@/components/search-category/searchHistory";
  export default defineComponent({
    name: "Tag Tab",
    setup() {
      const globalProperties =
        getCurrentInstance()?.appContext.config.globalProperties;
      const emitter = globalProperties?.emitter;
      const scrollDetect = globalProperties?.$scrollDetect;
      let {
        isTagLastPage,
        tagList,
        detector,
        page,
        loading,
        keyword,
        createHistory,
        deleteHistory,
        tagSearch,
      } = searchHistory();
      const search = (title: string) => {
        emitter.emit("search-result-tags", title);
      };
      onActivated(() => {
        scrollDetect(detector.value, () => {
          if (isTagLastPage.value == false && tagList.value.length >= 20) {
            page.value += 1;
            tagSearch();
          }
        });
      });

      return {
        search,
        createHistory,
        deleteHistory,
        detector,
        tagList,
        loading,
        keyword,
      };
    },
  });
</script>
<style scoped lang="scss">
  @import "@/components/search-category/search.scss";
</style>
