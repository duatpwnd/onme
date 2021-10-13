<template>
  <div class="wrap">
    <header>
      <router-link to="/setting" class="back-btn">뒤로가기</router-link>
      <h1 class="header-title">계정관리</h1>
    </header>
    <router-link to="/accountManage" class="row">로그아웃</router-link>
    <router-link to="/withdrawal" class="row">회원탈퇴</router-link>
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
    name: "AccountManage",
    components: {},
    setup() {
      console.log("setup호출");
      const globalProperties =
        getCurrentInstance()?.appContext.config.globalProperties;
      const axios = globalProperties?.axios;
      const apiUrl = globalProperties?.apiUrl;
      const store = globalProperties?.store;
      onMounted(() => {
        console.log("onmounted호출");
      });
    },
  });
</script>
<style scoped lang="scss">
  .wrap {
    header {
      text-align: center;
    }
    .row {
      border-bottom: 1px solid #f2f4f5;
      padding: 24px 20px;
      width: 100%;
      box-sizing: border-box;
      background: url("~@/assets/images/arrow_ico.png") no-repeat right 20px
        center / 7px 13px;
    }
  }
</style>
