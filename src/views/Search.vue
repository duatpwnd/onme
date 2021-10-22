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
        />
        <button
          class="delete-btn"
          @click="keyword = ''"
          v-show="keyword.trim().length > 0"
        >
          지우기
        </button>
      </div>
    </header>
    <div class="recommend-list">
      <h2 class="h2-title">추천</h2>
      <div class="feed">
        <div class="left-feed">
          <router-link to="/detail"
            ><img src="@/assets/images/feed1.png"
          /></router-link>
          <router-link to="/">
            <img src="@/assets/images/feed5.png" />
          </router-link>
        </div>
        <div class="right-feed">
          <router-link to="/">
            <img src="@/assets/images/feed2.png" />
          </router-link>
          <router-link to="/">
            <img src="@/assets/images/feed3.png" />
          </router-link>
          <router-link to="/">
            <img src="@/assets/images/feed4.png" />
          </router-link>
        </div>
      </div>
      <div v-show="searchTab" class="search-tab">
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
        <keep-alive>
          <component :is="currentComponent"></component>
        </keep-alive>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import {
    defineComponent,
    onMounted,
    reactive,
    ref,
    getCurrentInstance,
  } from "vue";
  import Total from "@/components/search-category/Total.vue";
  import Writer from "@/components/search-category/Writer.vue";
  import Tag from "@/components/search-category/Tag.vue";
  export default defineComponent({
    name: "Search",
    components: {
      Total,
      Tag,
      Writer,
    },
    setup() {
      console.log("setup호출");
      const instance = getCurrentInstance();
      const axios = instance?.appContext.config.globalProperties.axios;
      const keyword = ref("");
      const currentComponent = ref("Total");
      const searchTab = ref(false);
      const type = {
        total: "전체",
        writer: "작가",
        tag: "태그",
      };
      onMounted(() => {
        console.log("onmounted호출");
      });
      return { keyword, type, currentComponent, searchTab };
    },
  });
</script>
<style scoped lang="scss">
  .wrap {
    padding: 20px;
    .search-area {
      background: #f2f4f5;
      padding: 12px 20px;
      border-radius: 8px;
      width: calc(100% - 46px);
      box-sizing: border-box;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      height: 48px;
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
    .recommend-list {
      position: relative;
      .h2-title {
        margin-top: 30px;
      }
      .feed {
        &:after {
          display: block;
          content: "";
          clear: both;
        }
        div {
          width: 48.5%;
          vertical-align: top;
          a {
            margin-top: 20px;
            width: 100%;
            img {
              width: 100%;
            }
          }
        }
        .left-feed {
          float: left;
        }
        .right-feed {
          float: right;
        }
      }

      .search-tab {
        position: absolute;
        top: 0;
        width: 100%;
        z-index: 4;
        background: white;
        height: 100%;
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
</style>
