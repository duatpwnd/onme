<template>
  <BaseModal
    v-show="isSignout"
    emphasize="로그아웃"
    contents="로그아웃 하시겠습니까?"
    :method="signOut"
    @basemodal-close="
      () => {
        isSignout = false;
      }
    "
  ></BaseModal>
  <div class="wrap">
    <header>
      <router-link to="/setting" class="back-btn">뒤로가기</router-link>
      <h1 class="header-title">계정관리</h1>
    </header>
    <button class="row" @click="isSignout = true">로그아웃</button>
    <router-link to="/withdrawal" class="row">회원탈퇴</router-link>
  </div>
</template>
<script lang="ts">
  import { defineComponent, onMounted, getCurrentInstance, ref } from "vue";
  import BaseModal from "@/components/common/BaseModal.vue";

  export default defineComponent({
    name: "AccountManage",
    components: { BaseModal },
    setup() {
      console.log("setup호출");
      const globalProperties =
        getCurrentInstance()?.appContext.config.globalProperties;
      const signOut = globalProperties?.$signOut;
      const isSignout = ref(false);

      onMounted(() => {
        console.log("onmounted호출");
      });
      return { isSignout, signOut };
    },
  });
</script>
<style scoped lang="scss">
  .wrap {
    header {
      text-align: center;
      .back-btn {
        left: 20px;
      }
    }
    .row {
      border-bottom: 1px solid #f2f4f5;
      padding: 24px 20px;
      width: 100%;
      box-sizing: border-box;
      background: url("~@/assets/images/arrow_ico.png") no-repeat right 20px
        center / 7px 13px;
    }
    button {
      font-weight: 400;
      text-align: left;
    }
  }
</style>
