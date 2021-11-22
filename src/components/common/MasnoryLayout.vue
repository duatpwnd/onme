<template>
  <div class="masnory-wrap">
    <div class="masnory">
      <div class="mItem" v-for="(list, index) in feedList" :key="index">
        <router-link
          :to="{ path: '/detail', query: { id: list.id } }"
          @click="clickAdd(list.id)"
        >
          <img
            :src="list.original_images[0]"
            v-if="list.original_images.length > 0"
          />
        </router-link>
      </div>
    </div>
    <div class="scroll-detecting" ref="detector"></div>
    <div class="loading" v-show="loading">
      <img src="@/assets/images/paging_loading_ico.png" />
    </div>
    <p class="no-result" v-if="feedList.length == 0 && route.name == 'Search'">
      검색 결과가 없습니다.
    </p>
  </div>
</template>
<script lang="ts">
  import {
    defineComponent,
    onMounted,
    ref,
    getCurrentInstance,
    watch,
  } from "vue";
  import { useRoute } from "vue-router";
  export default defineComponent({
    name: "MasnoryLayout",
    props: {
      id: {
        type: Number,
      },
      search: {
        type: String,
      },
    },
    setup(props) {
      const globalProperties =
        getCurrentInstance()?.appContext.config.globalProperties;
      const axios = globalProperties?.axios;
      const apiUrl = globalProperties?.apiUrl;
      const detector = ref(null || HTMLElement);
      const page = ref(1);
      const debounce = globalProperties?.$debounce();
      const route = useRoute();
      const loading = ref(false);
      const isLastPage = ref(false);
      const feedList = ref<{ [key: string]: any }>([]);
      const io = new IntersectionObserver(
        (entries) => {
          if (
            entries.some(
              (entry: { [key: string]: any }) => entry.intersectionRatio > 0
            )
          ) {
            if (isLastPage.value == false) {
              infiniteHandler();
            }
          }
        },
        { rootMargin: "50px" }
      );
      watch(
        () => [props.id, props.search, route.query.keyword],
        (curr, prev) => {
          debounce(() => {
            console.log("감시자:", "현재:", curr, "이전:", prev);
            page.value = 1;
            feedList.value = [];
            infiniteHandler();
          });
        }
      );
      const clickAdd = (id: number) => {
        axios
          .post(`${apiUrl.feedList}/${id}/click`)
          .then((response: { [key: string]: any }) => {
            console.log("게시물클릭결과:", response.data.data);
          });
      };
      const infiniteHandler = () => {
        loading.value = true;
        isLastPage.value = true;
        console.log("router", route);
        axios
          .get(`${apiUrl.feedList}/`, {
            params: {
              user: props.id || route.query.id, // 작가찾기
              page: page.value,
              page_size: 30,
              search: props.search || route.query.keyword,
              tag_title: route.query.tag,
            },
          })
          .then((response: { [key: string]: any }) => {
            if (response != undefined) {
              console.log("이미지리스트결과:", response.data.data);
              feedList.value.push(...response.data.data);
              page.value += 1;
              loading.value = false;
              isLastPage.value = false;
            }
          })
          .catch((err: any) => {
            console.log("catch", err);
            loading.value = false;
            isLastPage.value = true;
          });
      };
      onMounted(() => {
        io.observe(detector.value as unknown as HTMLElement);
      });
      return { loading, feedList, detector, route, clickAdd };
    },
  });
</script>
<style scoped lang="scss">
  .no-result {
    text-align: center;
    color: #79828a;
    margin-top: 240px;
  }
  .loading {
    position: fixed;
    top: 0;
    width: 100%;
    height: 100%;
    max-width: 435px;
    background: rgba(0, 0, 0, 0.5);
    z-index: 2;
    img {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
    }
  }
  .masnory {
    column-count: 2;
    column-gap: 16px;
    padding: 0 20px;
    .mItem {
      display: inline-block;
      margin-bottom: 16px;
      width: 100%;
      a {
        width: 100%;
        border-radius: 12px;
        overflow: hidden;
        img {
          width: 100%;
        }
      }
    }
  }
</style>
