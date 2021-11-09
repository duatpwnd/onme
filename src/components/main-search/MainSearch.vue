<template>
  <div class="nopy-full-bg"></div>
  <article class="home-left-area">
    <h1 class="logo">
      <img src="@/assets/images/pc_logo.png" @click="router.push('/')" />
    </h1>
    <h2 class="title">ONMI 웹사이트<br />타이틀 영역</h2>
    <p class="message">
      NOPY 웹사이트 서브 타이틀 영역입니다. NOPY가 어떤 서비스인지 설명할 문구를
      알려주세요.
    </p>
    <div class="search-area">
      <input
        type="text"
        class="text-input"
        v-model="text"
        placeholder="어떤 작품을 찾으세요?"
        @keyup.enter="search()"
      />
      <button class="search-btn" @click="search()"></button>
    </div>
    <div class="btn-wrap">
      <button class="btn apple-download-btn"></button>
      <button class="btn google-download-btn"></button>
    </div>
  </article>
</template>
<script lang="ts">
  import { useRouter, useRoute } from "vue-router";
  import { ref, defineComponent, getCurrentInstance, onMounted } from "vue";
  export default defineComponent({
    name: "MainSearch",
    setup(props) {
      console.log("setup호출");
      const globalProperties =
        getCurrentInstance()?.appContext.config.globalProperties;
      const router = useRouter();
      const emitter = globalProperties?.emitter;
      const text = ref("");
      const search = () => {
        if (text.value.trim().length > 0) {
          router.push({
            path: "/search",
            query: {
              keyword: (text.value as string).trim(),
            },
          });
          setTimeout(() => {
            emitter.emit("search-result", (text.value as string).trim());
          }, 100);
        }
      };
      return { router, text, search };
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
      margin-top: 16vh;
    }
    .message {
      color: #79828a;
      font-size: 18px;
      margin-top: 16px;
      line-height: 26px;
    }
    .search-area {
      margin-top: 3.1vh;
      .text-input {
        color: white;
        font-size: 20px;
        width: calc(100% - 80px);
        vertical-align: middle;
        padding: 27px;
        box-sizing: border-box;
        background: #32343d;
        border: 0;
        border-top-left-radius: 12px;
        border-bottom-left-radius: 12px;
        &::placeholder {
          color: #5a5d67;
        }
      }
      .search-btn {
        cursor: pointer;
        vertical-align: middle;
        width: 80px;
        height: 80px;
        background: url("~@/assets/images/search_btn.png") no-repeat center /
          80px 80px;
      }
    }
    .btn-wrap {
      margin-top: 8vh;
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
