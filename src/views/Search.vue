<template>
  <div class="wrap">
    <header>
      <router-link to="/" class="back-btn"></router-link>
      <div class="search-area">
        <input
          type="text"
          v-on:input="keyword = $event.target.value"
          placeholder="작가, 태그 검색"
          class="search-input"
          :value="keyword"
          @focus="searchTab = true"
          @keyup="
            debounce(() => {
              searchType();
            })
          "
        />
        <button
          class="delete-btn"
          @click="
            keyword = '';
            getHistory();
          "
          v-show="keyword.trim().length > 0"
        >
          지우기
        </button>
      </div>
      <button @click="closeSearchTab()" v-show="searchTab">취소</button>
    </header>

    <div class="recommend-list">
      <h2 class="h2-title">{{ resultedKeyword }}</h2>
      <div v-show="searchTab" class="search-tab">
        <div class="tab">
          <button
            v-for="(value, key) in type"
            :key="key"
            @click="currentComponent = key"
            :class="[
              'tab-btn',
              { 'active-tab-btn': currentComponent.toLowerCase() == key },
            ]"
          >
            {{ value }}
          </button>
        </div>
        <h2 class="recently-search" v-show="keyword.trim().length == 0">
          최근검색
        </h2>
        <keep-alive>
          <component :is="currentComponent" :style="styleObject"></component>
        </keep-alive>
      </div>
    </div>
    <MasnoryLayout :id="userid" :search="tag" />
  </div>
</template>
<script lang="ts">
  import {
    defineComponent,
    onMounted,
    ref,
    getCurrentInstance,
    computed,
  } from "vue";
  import Post from "@/components/search-category/Post.vue";
  import User from "@/components/search-category/User.vue";
  import Tag from "@/components/search-category/Tag.vue";
  import MasnoryLayout from "@/components/common/MasnoryLayout.vue";
  import searchHistory from "@/components/search-category/searchHistory";
  export default defineComponent({
    name: "Search",
    components: {
      Post,
      Tag,
      User,
      MasnoryLayout,
    },
    setup() {
      const globalProperties =
        getCurrentInstance()?.appContext.config.globalProperties;
      const axios = globalProperties?.axios;
      const apiUrl = globalProperties?.apiUrl;
      const debounce = globalProperties?.$debounce();
      const search = ref("");
      const userid = ref<null | number>(null); // 작가검색 리스트의 고유한id값으로 이미지 리스트 뿌리기
      const tag = ref<null | string>(null); // 태그검색 리스트의 타이틀값으로 이미지 리스트 뿌리기
      const resultedKeyword = ref("추천");
      const currentComponent = ref("post");
      const searchTab = ref(false);
      const emitter = globalProperties?.emitter;
      const styleObject = computed(() =>
        keyword.value.trim().length == 0
          ? {
              height: "calc(100% - 195px)",
            }
          : {
              height: "calc(100% - 131px)",
            }
      );
      const type = {
        post: "작품",
        user: "작가",
        tag: "태그",
      };
      // 태그검색
      const { keyword, getHistory } = searchHistory();

      // 검색탭 닫기
      const closeSearchTab = () => {
        searchTab.value = false;
        getHistory();
      };
      // 검색히스토리 얻기

      onMounted(() => {
        getHistory();
        emitter.on(
          "search-result",
          (result: { [key: string]: any } | string) => {
            searchTab.value = false;
            if (typeof result == "object") {
              userid.value = result.id;
              tag.value = null;
              resultedKeyword.value = result.name + " 검색결과";
            } else {
              tag.value = result as string;
              userid.value = null;
              resultedKeyword.value = "#" + result + " 검색결과";
            }
          }
        );
      });
      return {
        type,
        currentComponent,
        searchTab,
        search,
        debounce,
        userid,
        tag,
        resultedKeyword,
        styleObject,
        closeSearchTab,
        ...searchHistory(),
      };
    },
  });
</script>
<style scoped lang="scss">
  :global(#app) {
    height: 100%;
  }
  .wrap {
    padding: 20px;
    padding-top: 0;
    header {
      position: sticky;
      top: 0;
      z-index: 2;
      background: white;
      padding-top: 20px;
      .back-btn {
        position: relative;
        display: inline-block;
        vertical-align: middle;
      }
      .search-area {
        background: #f2f4f5;
        padding: 12px 20px;
        border-radius: 8px;
        width: calc(100% - 97px);
        margin: 0 15px 0 30px;
        display: inline-block;
        box-sizing: border-box;
        .search-input {
          width: calc(100% - 24px);
          border: 0;
          background: #f2f4f5;
          &::placeholder {
            color: #9ea7ad;
          }
        }
        .delete-btn {
          width: 24px;
          height: 20px;
          text-align: right;
          text-indent: 100%;
          white-space: nowrap;
          overflow: hidden;
          background: url("~@/assets/images/clear.png") no-repeat right / 20px
            20px;
        }
      }
    }
    .recommend-list {
      position: relative;
      margin-top: 10px;
      .search-tab {
        position: fixed;
        left: 0;
        top: 78px;
        width: 100%;
        z-index: 4;
        background: white;
        height: 100%;
        display: flex;
        flex-direction: column;
        .recently-search {
          padding: 0 20px;
          margin-top: 30px;
        }
        .history {
          background: white;
          overflow-y: auto;
          padding: 20px 0;
          box-sizing: border-box;
        }
        .tab {
          padding: 14px 0;
          border-bottom: 1px solid #9ea7ad;
          .tab-btn {
            width: 33.333%;
            color: #9ea7ad;
            font-weight: 400;
          }
          .active-tab-btn {
            font-weight: 700;
            color: #303538;
          }
        }
      }
    }
  }
</style>
