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
        <b class="tag-title"><b>#</b>{{ list.title }}</b>
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
  import {
    defineComponent,
    getCurrentInstance,
    ref,
    onMounted,
    onUpdated,
  } from "vue";
  import searchHistory from "@/components/search-category/searchHistory";
  export default defineComponent({
    name: "Tag Tab",
    setup() {
      const globalProperties =
        getCurrentInstance()?.appContext.config.globalProperties;
      const emitter = globalProperties?.emitter;
      const { tagList, detector, scrollDetect, createHistory, deleteHistory } =
        searchHistory();
      const search = (title: string) => {
        emitter.emit("search-result", title);
      };
      onMounted(() => {
        const selector = detector.value as unknown as HTMLElement;
        selector.addEventListener("scroll", scrollDetect);
      });
      return { search, createHistory, deleteHistory, detector, tagList };
    },
  });
</script>
<style scoped lang="scss">
  @import "@/components/search-category/search.scss";
</style>
