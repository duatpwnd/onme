<template>
  <lottie-player
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
  />
  <router-view />
</template>
<script lang="ts">
  import { defineComponent, getCurrentInstance, ref } from "vue";
  import "@lottiefiles/lottie-player";
  export default defineComponent({
    name: "Home",
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
  body {
    .lottie-player {
      width: 100%;
      height: 100%;
      position: fixed;
      top: 0;
      left: 0;
      background: white;
      z-index: 1;
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
</style>
