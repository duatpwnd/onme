<template>
  <ul class="history">
    <li
      v-for="(list, index) in allList"
      :key="index"
      class="history-list"
      @click="search(list.title)"
    >
      <img
        src="@/assets/images/ex1.png"
        v-if="list.username != null"
        class="tag-img"
      />
      <img src="@/assets/images/tag.png" v-else class="tag-img" />
      <div class="user-info" v-if="list.username != null">
        <b class="tag-title">{{ list.username }}</b>
        <span class="works">저작물 1개</span>
      </div>
      <div class="tag-info" v-else>
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
  import { defineComponent, getCurrentInstance, ref } from "vue";
  export default defineComponent({
    name: "Total Tab",
    props: {
      allList: {
        type: Object,
      },
    },
    setup() {
      const globalProperties =
        getCurrentInstance()?.appContext.config.globalProperties;
      const emitter = globalProperties?.emitter;
      const search = (keyword: string) => {
        emitter.emit("search-result", keyword);
      };
      return { search };
    },
  });
</script>
<style scoped lang="scss">
  @import "@/components/search-category/search.scss";
</style>
