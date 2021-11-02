<template>
  <div class="home-left-area">
    <img
      src="@/assets/images/pc_logo.png"
      class="logo"
      @click="router.push('/')"
    />
    <h2 class="title">NPPY 웹사이트<br />타이틀 영역</h2>
    <p class="message">
      NOPY 웹사이트 서브 타이틀 영역입니다. NOPY가 어떤 서비스인지 설명할 문구를
      알려주세요.
    </p>
    <div class="search-area">
      <input
        type="text"
        class="text-input"
        placeholder="어떤 작품을 찾으세요?"
      />
      <button class="search-btn"></button>
    </div>
    <div class="btn-wrap">
      <button class="btn apple-download-btn"></button>
      <button class="btn google-download-btn"></button>
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
  import { useStore } from "vuex";
  export default defineComponent({
    name: "HelloWorld",
    setup() {
      console.log("setup호출");
      const globalProperties =
        getCurrentInstance()?.appContext.config.globalProperties;
      const axios = globalProperties?.axios;
      const apiUrl = globalProperties?.apiUrl;
      const store = globalProperties?.store;
      const router = globalProperties?.$router;
      return { router };
    },
  });
</script>
<style scoped lang="scss">
  .home-left-area {
    position: fixed;
    z-index: 0;
    width: 100%;
    max-width: 512px;
    height: 100%;
    left: calc(50vw - 512px);
    .logo {
      cursor: pointer;
      margin-top: 35px;
    }
    .title {
      font-size: 52px;
      color: white;
      line-height: 68px;
      margin-top: 210px;
    }
    .message {
      color: #79828a;
      font-size: 18px;
      margin-top: 16px;
      line-height: 26px;
    }
    .search-area {
      width: 530px;
      margin-top: 40px;
      .text-input {
        color: #5a5d67;
        font-size: 20px;
        width: calc(100% - 80px);
        vertical-align: middle;
        padding: 27px;
        box-sizing: border-box;
        background: #32343d;
        border: 0;
        border-top-left-radius: 12px;
        border-bottom-left-radius: 12px;
      }
      .search-btn {
        vertical-align: middle;
        width: 80px;
        height: 80px;
        background: url("~@/assets/images/search_btn.png") no-repeat center /
          80px 80px;
      }
    }
    .btn-wrap {
      margin-top: 100px;
      .btn {
        &:hover {
          background-color: #5a5d67;
          border-radius: 12px;
        }
      }
      .apple-download-btn {
        width: 198px;
        height: 60px;
        background: url("~@/assets/images/apple_download_btn.png") no-repeat
          center / 198px 60px;
      }
      .google-download-btn {
        width: 198px;
        height: 60px;
        margin-left: 12px;
        background: url("~@/assets/images/google_download_btn.png") no-repeat
          center / 198px 60px;
      }
    }
  }
</style>
