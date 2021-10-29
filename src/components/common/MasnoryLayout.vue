<template>
  <div class="masnory">
    <div class="mItem" v-for="(list, index) in feedList" :key="index">
      <router-link :to="{ path: '/detail', query: { id: list.id } }">
        <img
          :src="list.original_images[0]"
          v-if="list.original_images.length > 0"
        />
        <img :src="require('@/assets/images/logo.png')" v-else />
      </router-link>
    </div>
  </div>
  <div class="loading" v-show="loading">
    <img src="@/assets/images/paging_loading_ico.png" />
  </div>
  <div class="scroll-detecting" ref="detector"></div>
</template>
<script lang="ts">
  import {
    defineComponent,
    onMounted,
    ref,
    getCurrentInstance,
    watch,
  } from "vue";
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
    components: {},
    setup(props) {
      const globalProperties =
        getCurrentInstance()?.appContext.config.globalProperties;
      const axios = globalProperties?.axios;
      const apiUrl = globalProperties?.apiUrl;
      const detector = ref(null || HTMLElement);
      const page = ref(1);
      const loading = ref(false);
      const feedList = ref<{ [key: string]: any }>([]);
      const io = new IntersectionObserver(
        (entries, observer) => {
          if (entries.some((entry) => entry.intersectionRatio > 0)) {
            infiniteHandler();
          }
        },
        { rootMargin: "10px" }
      );
      watch(
        () => [props.id, props.search],
        (curr, prev) => {
          console.log("감시자:", curr, prev);
          page.value = 1;
          feedList.value = [];
          io.unobserve(detector.value as unknown as HTMLElement);
          infiniteHandler();
        }
      );

      const infiniteHandler = () => {
        loading.value = true;
        axios
          .get(`${apiUrl.feedList}/`, {
            params: {
              user: props.id,
              page: page.value,
              page_size: 10,
              search: props.search,
            },
          })
          .then((response: { [key: string]: any }) => {
            if (response != undefined) {
              console.log("이미지리스트결과:", response);
              feedList.value.push(...response.data.data);
              page.value += 1;
              loading.value = false;
            }
          })
          .catch((err: any) => {
            console.log("catch", err);
            loading.value = false;
            io.unobserve(detector.value as unknown as HTMLElement);
          });
      };
      onMounted(() => {
        io.observe(detector.value as unknown as HTMLElement);
      });
      return { loading, feedList, detector };
    },
  });
</script>
<style scoped lang="scss">
  .loading {
    text-align: center;
    padding: 20px 0;
  }
  .masnory {
    margin-top: 16px;
    column-count: 2;
    column-gap: 16px;
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
