<template>
  <div class="wrap">
    <header>
      <router-link to="/setting" class="back-btn">뒤로가기</router-link>
      <h1 class="header-title">계정삭제</h1>
    </header>
    <div class="contents">
      <p class="msg1">
        <strong>더 나은 서비스</strong>가<br />되도록 귀담아 듣겠습니다.
      </p>
      <p class="msg2">탈퇴하시는 이유를 알려주세요.</p>
      <select class="reason-select-box" v-model="reason">
        <option value="null" disabled>선택해주세요</option>
        <option value="1">서비스를 자주 이용안해요</option>
      </select>
    </div>
    <button :class="[{ active: reason != null }, 'withdrawal-btn']">
      회원탈퇴
    </button>
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
      const reason = ref(null);
      onMounted(() => {
        console.log("onmounted호출");
      });
      return { reason };
    },
  });
</script>
<style scoped lang="scss">
  .wrap {
    header {
      text-align: center;
    }
    .contents {
      padding: 40px 20px;
      .msg1 {
        font-size: 24px;
        font-weight: 700;
        strong {
          color: #256ee8;
        }
      }
      .msg2 {
        margin-top: 12px;
        margin-bottom: 32px;
        color: #79828a;
      }
      .reason-select-box {
        width: 100%;
        padding: 16px 20px;
        box-sizing: border-box;
        border-radius: 10px;
        color: #303538;
        border: 0;
        background: url("~@/assets/images/bottom_arrow_ico.png") #f2f4f5
          no-repeat right 20px center / 12px 6px;
      }
    }
    .withdrawal-btn {
      background: #dbdfe1;
      color: white;
      text-align: center;
      font-size: 18px;
      padding: 18px 0;
      position: fixed;
      left: 0;
      bottom: 0;
      width: 100%;
    }
    .active {
      background: black;
    }
  }
</style>
