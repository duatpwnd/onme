<template>
  <!-- <lottie-player
    v-if="splash"
    class="lottie-player"
    :src="require('@/assets/json/splash.json')"
    speed="1"
    autoplay
    @complete="
      () => {
        splash = false;
      }
    "
  /> -->
  <MainSearch />
  <router-view />
</template>
<script lang="ts">
  import { defineComponent, getCurrentInstance, ref } from "vue";
  import MainSearch from "@/components/main-search/MainSearch.vue";
  import "@lottiefiles/lottie-player";
  export default defineComponent({
    name: "Home",
    components: {
      MainSearch,
    },
    setup() {
      const globalProperties =
        getCurrentInstance()?.appContext.config.globalProperties;
      const cookie = globalProperties?.$cookie;
      const store = globalProperties?.$store;
      const userInfo = cookie.getCookie("userInfo");
      const splash = ref(true);
      if (userInfo != null) {
        store.commit("userStore/USER_INFO", userInfo);
      }
      return { splash };
    },
  });
</script>

<style lang="scss">
  @import "@/assets/reset.scss";
  #app {
    max-width: 435px;
    min-height: 100%;
    background: white;
    .lottie-player {
      width: 100%;
      height: 100%;
      position: fixed;
      top: 0;
      left: 0;
      background: white;
      z-index: 1000;
    }
    header {
      height: 60px;
      position: relative;
      .back-btn {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        margin: auto;
        text-indent: 100%;
        white-space: nowrap;
        overflow: hidden;
        width: 24px;
        height: 30px;
        background: url("~@/assets/images/back_btn.png") no-repeat center / 24px
          24px;
      }
      .header-title {
        font-size: 17px;
        line-height: 60px;
      }
    }
  }
  @media only screen and (min-width: 1024px) {
    #app {
      margin: 0 0 0 calc(55vw - 1px);
      .nopy-full-bg {
        position: fixed;
        top: 0;
        left: 0;
        z-index: -1;
        width: 100%;
        height: 100%;
        background: url("~@/assets/images/bg_pc.png") #e9e9e9 no-repeat 50% 50% /
          cover;
      }
    }
  }
  @media only screen and (min-width: 421px) and (max-width: 1023px) {
    #app {
      margin: 0 auto;
      .nopy-full-bg {
        position: fixed;
        left: 0;
        z-index: -1;
        width: 100%;
        height: 100%;
        background-color: #22232d;
      }
    }
  }
  @media only screen and (max-width: 1023px) {
    .home-left-area {
      display: none;
    }
  }
</style>
