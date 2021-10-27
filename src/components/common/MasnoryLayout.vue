<template>
  <img
    src="@/assets/images/paging_loading_ico.png"
    class="loading"
    v-show="loading"
  />
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
  <div class="scroll-detecting" ref="detector"></div>
</template>
<script lang="ts">
  import {
    defineComponent,
    onMounted,
    reactive,
    ref,
    getCurrentInstance,
    onUpdated,
    nextTick,
    onBeforeMount,
  } from "vue";
  export default defineComponent({
    name: "MasnoryLayout",
    props: {
      id: {
        type: Number,
      },
    },
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
      const infiniteHandler = () => {
        console.log("핸들러감시시작");
        loading.value = true;
        axios
          .get(`${apiUrl.feedList}/`, {
            params: {
              page: page.value,
              page_size: 10,
              user: props.id,
            },
          })
          .then((response: { [key: string]: any }) => {
            if (response != undefined) {
              console.log("리스트결과:", response);
              feedList.value.push(...response.data.data);
              page.value += 1;
              loading.value = false;
            }
          })
          .catch((err: any) => {
            loading.value = false;
            console.log("err:", err);
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
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    height: 75px;
    z-index: 2;
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
