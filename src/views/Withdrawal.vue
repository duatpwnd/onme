<template>
  <BaseModal
    v-show="iswithdraw"
    emphasize="정말 탈퇴 하실 건가요?"
    contents="NOPY에서 활동한 모든 정보가 삭제됩니다."
    :method="withdraw"
    @basemodal-close="
      () => {
        iswithdraw = false;
      }
    "
  ></BaseModal>
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
        <option value="SERVICE">서비스를 자주 이용안해요</option>
        <option value="APP_ERROR">앱 오류가 있어요</option>
        <option value="UNCOMFORTABLE">사용하기 불편해요</option>
        <option value="ETC">기타</option>
      </select>
    </div>
  </div>
  <button class="withdrawal-btn" v-if="reason == null">회원탈퇴</button>
  <button class="withdrawal-btn active" v-else @click="iswithdraw = true">
    회원탈퇴
  </button>
</template>
<script lang="ts">
  import { defineComponent, onMounted, ref, getCurrentInstance } from "vue";
  import BaseModal from "@/components/common/BaseModal.vue";
  export default defineComponent({
    name: "Withdrawal",
    components: { BaseModal },
    setup() {
      console.log("setup호출");
      const globalProperties =
        getCurrentInstance()?.appContext.config.globalProperties;
      const axios = globalProperties?.axios;
      const apiUrl = globalProperties?.apiUrl;
      const signOut = globalProperties?.$signOut;
      const reason = ref(null);
      const iswithdraw = ref(false);
      const withdraw = () => {
        console.log(reason.value);
        axios
          .delete(apiUrl.withdraw, {
            data: { withdraw_reason: reason.value },
          })
          .then((result: any) => {
            console.log("탈퇴결과:", result);
            signOut();
          });
      };
      onMounted(() => {
        console.log("onmounted호출");
      });
      return { reason, iswithdraw, withdraw };
    },
  });
</script>
<style scoped lang="scss">
  .wrap {
    padding: 0 20px;
    header {
      text-align: center;
    }
    .contents {
      padding: 40px 0;
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
  }
  .withdrawal-btn {
    background: #dbdfe1;
    color: white;
    text-align: center;
    font-size: 18px;
    padding: 18px 0;
    position: fixed;
    bottom: 0;
    max-width: 435px;
    width: 100%;
  }
  .active {
    background: black;
  }
</style>
