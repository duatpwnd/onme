<template>
  <div class="wrap">
    <header>
      <button class="back-btn" @click="back()"></button>
      <div class="search-area">
        <input
          type="text"
          v-on:input="keyword = $event.target.value"
          placeholder="작품, 작가, 태그 검색"
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
      <h2
        class="h2-title"
        v-html="resultedKeyword"
        v-if="route.query.keyword != undefined"
      ></h2>
      <h2 class="h2-title" v-else>추천</h2>
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
        <h2
          class="recently-search"
          v-show="keyword.trim().length == 0 && userInfo.id != undefined"
        >
          최근검색
        </h2>
        <keep-alive>
          <component :is="currentComponent" :style="styleObject"></component>
        </keep-alive>
      </div>
    </div>
  </div>
  <div v-show="searchTab == false">
    <MasnoryLayout :search="tag" />
  </div>
</template>
<script lang="ts">
  import {
    defineComponent,
    onMounted,
    ref,
    getCurrentInstance,
    computed,
    onUnmounted,
  } from "vue";
  import { useRoute } from "vue-router";
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
      const router = globalProperties?.$router;
      const route = useRoute();
      const debounce = globalProperties?.$debounce();
      const search = ref("");
      const tag = ref<null | string>(null); // 태그검색 리스트의 타이틀값으로 이미지 리스트 뿌리기
      const resultedKeyword = ref(
        `<strong class="resulted-keyword">${route.query.keyword}</strong> 검색결과`
      );
      const currentComponent = ref("post");
      const searchTab = ref(false);
      const emitter = globalProperties?.emitter;
      const store = globalProperties?.$store;
      const userInfo = computed(() => store.state.userStore.userInfo);
      const type = {
        post: "작품",
        user: "작가",
        tag: "태그",
      };
      const styleObject = computed(() =>
        keyword.value.trim().length == 0
          ? {
              height: "calc(100% - 195px)",
            }
          : {
              height: "calc(100% - 131px)",
            }
      );
      // 태그검색
      const { keyword, getHistory } = searchHistory();
      // 검색탭 닫기
      const closeSearchTab = () => {
        searchTab.value = false;
        getHistory();
      };
      const back = () => {
        router.go(-1);
      };
      onUnmounted(() => {
        keyword.value = "";
        getHistory();
      });
      onMounted(() => {
        if (keyword.value.trim().length == 0) {
          getHistory();
        }
        emitter.on("search-result-tags", (result: string) => {
          router.push({
            query: {
              tag: result,
            },
          });
          searchTab.value = false;
          resultedKeyword.value =
            `<strong class="resulted-keyword">${result}</strong>` + "검색결과";
        });
        emitter.on("search-result", (result: string) => {
          router.push({
            query: {
              keyword: result,
            },
          });
          searchTab.value = false;
          resultedKeyword.value =
            `<strong class="resulted-keyword">${result}</strong>` + "검색결과";
        });
      });
      return {
        type,
        currentComponent,
        searchTab,
        search,
        debounce,
        tag,
        resultedKeyword,
        styleObject,
        route,
        userInfo,
        back,
        closeSearchTab,
        ...searchHistory(),
      };
    },
  });
</script>
<style scoped lang="scss">
  #app {
    .wrap {
      padding: 20px 0;
      padding-top: 0;
      header {
        position: sticky;
        top: 0;
        z-index: 2;
        background: white;
        padding: 20px;
        height: unset;
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
        :deep .h2-title {
          margin-top: 20px;
          padding: 0 20px;
          .resulted-keyword {
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
            text-overflow: ellipsis;
            overflow: hidden;
            word-break: break-all;
            word-wrap: break-word;
          }
        }
        .search-tab {
          position: fixed;
          top: 78px;
          max-width: 435px;
          width: 100%;
          z-index: 4;
          background: white;
          height: 100%;
          display: flex;
          flex-direction: column;
          .recently-search {
            padding: 0 20px;
            margin-top: 20px;
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
  }
</style>
