<template>
  <div class="wrap">
    <header>
      <router-link to="/myPage" class="back-btn">뒤로가기</router-link>
      <h1 class="header-title">설정</h1>
    </header>
    <div class="setting">
      <!-- <div class="row">
        서비스 이용 알림
        <BaseSwitcherButton v-model="isShow" value="공개" />
      </div> -->
      <router-link to="/accountManage" class="row account-manage"
        >계정관리</router-link
      >
      <div class="row">
        <span>앱버전</span>
        <strong class="version">V0.01</strong>
      </div>
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
  import BaseSwitcherButton from "@/components/common/BaseSwitcherButton.vue";

  export default defineComponent({
    name: "Setting",
    setup() {
      const isShow = ref(true);
      return { isShow };
    },
  });
</script>
<style scoped lang="scss">
  #app {
    .wrap {
      header {
        text-align: center;
        .back-btn {
          left: 20px;
        }
      }
      .setting {
        .row {
          border-bottom: 1px solid #f2f4f5;
          padding: 24px 20px;
          position: relative;
          .version {
            position: absolute;
            top: 0;
            right: 20px;
            bottom: 0;
            margin: auto;
            height: 22px;
            color: #256ee8;
          }
          .switch-btn {
            position: absolute;
            top: 0;
            right: 20px;
            bottom: 0;
            margin: auto;
            height: 32px;
          }
        }
      }
      .account-manage {
        width: 100%;
        box-sizing: border-box;
        background: url("~@/assets/images/arrow_ico.png") no-repeat right 20px
          center / 7px 13px;
      }
    }
  }
</style>
