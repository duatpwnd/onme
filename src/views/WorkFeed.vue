<template>
  <div class="wrap">
    <header>
      <h1>작품피드</h1>
      <div class="btn-wrap">
        <router-link class="add-btn" to="/register">추가</router-link>
        <router-link class="search-btn" to="/search">찾기</router-link>
        <router-link
          class="profile-btn"
          :style="{ background: `url(${isSignin})` }"
          :to="userInfo.id == undefined ? '/signin' : '/myPage'"
          >프로필</router-link
        >
      </div>
    </header>
    <infinite-scroll @infinite-scroll="loadDataFromServer" :noResult="noResult">
      <div class="masnory">
        <div class="mItem" v-for="(list, index) in feedList" :key="index">
          <router-link :to="{ path: '/detail', query: { id: list.id } }">
            <img :src="list.original_images[0].image" />
          </router-link>
        </div>
      </div>
    </infinite-scroll>
  </div>
  <button class="scan-btn" v-show="scanBtn.show"></button>
</template>
<script lang="ts">
  import {
    defineComponent,
    onMounted,
    reactive,
    ref,
    getCurrentInstance,
    computed,
    isProxy,
  } from "vue";
  import InfiniteScroll from "infinite-loading-vue3";
  // 스캔버튼 스크롤 업/다운시 노출 및 숨겨짐 함수 :: S
  const showScanBtn = () => {
    const scanBtn = reactive({
      show: true,
      lastScrollPosition: 0,
    });
    const onScroll = () => {
      if (scanBtn.lastScrollPosition <= window.scrollY) {
        scanBtn.show = false;
      } else {
        scanBtn.show = true;
      }
      scanBtn.lastScrollPosition = window.scrollY;
    };
    return { scanBtn, onScroll };
  };
  // 스캔버튼 스크롤 업/다운시 노출 및 숨겨짐 함수 :: E

  export default defineComponent({
    name: "WorkFeed",
    components: { InfiniteScroll },
    setup(props, context) {
      const globalProperties =
        getCurrentInstance()?.appContext.config.globalProperties;
      const axios = globalProperties?.axios;
      const apiUrl = globalProperties?.apiUrl;
      const store = globalProperties?.$store;
      const userInfo = computed(() => store.state.userStore.userInfo);
      const { scanBtn, onScroll } = showScanBtn();
      const feedList = ref<{ [key: string]: any }>([]);
      const alarm = ref(false);
      const page = ref(1);
      const noResult = ref(false);
      const isSignin =
        userInfo.value.id == undefined
          ? require("@/assets/images/signout_profile_img1.png")
          : require("@/assets/images/signin_profile_img1.png");

      const loadDataFromServer = async () => {
        console.log("getlist호출");
        try {
          await axios
            .get(`${apiUrl.feedList}/`, {
              params: {
                page: page.value,
                page_size: 10,
              },
            })
            .then((response: { [key: string]: any }) => {
              if (response != undefined) {
                console.log("리스트결과:", response, context);
                feedList.value.push(...response.data.data);
                page.value += 1;
              } else {
                console.log("없다");
                noResult.value = true;
              }
            });
        } catch (err) {
          console.log("err:", err);
        }
      };
      onMounted(() => {
        window.addEventListener("scroll", onScroll);
        loadDataFromServer();
      });
      return {
        scanBtn,
        feedList,
        alarm,
        userInfo,
        isSignin,
        noResult,
        loadDataFromServer,
      };
    },
  });
</script>
<style scoped lang="scss">
  .wrap {
    padding: 0 20px;
    header {
      position: sticky;
      h1 {
        font-size: 18px;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        margin: auto;
        height: 20px;
      }
      .btn-wrap {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        height: 30px;
        a {
          vertical-align: middle;
          text-indent: 100%;
          white-space: nowrap;
          overflow: hidden;
        }
        .add-btn {
          width: 20px;
          height: 20px;
          background: url("~@/assets/images/register_btn.png") no-repeat center /
            20px 20px;
        }
        .search-btn {
          margin: 0 20px;
          width: 24px;
          height: 24px;
          background: url("~@/assets/images/search.png") no-repeat center / 24px
            24px;
        }
        .profile-btn {
          width: 30px;
          height: 30px;
          background-repeat: no-repeat;
          background-position: center;
          background-size: 30px 30px;
        }
      }
    }
    .alarm-msg {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      box-sizing: border-box;
      font-size: 14px;
      padding: 19px 20px;
      color: white;
      background: rgba(13, 16, 26, 0.7);
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
  }
  .scan-btn {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 46px;
    margin: auto;
    width: 60px;
    height: 60px;
    background: url("~@/assets/images/scan_btn.png") no-repeat center / 60px
      60px;
  }
</style>
