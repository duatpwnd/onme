<template>
  <div class="wrap">
    <header>
      <router-link to="/signIn" class="back-btn">뒤로가기</router-link>
      <h1 class="header-title">회원가입</h1>
    </header>
    <span><b>1</b>3</span>
    {{ selected.length }}

    <h2>NOPY<br />이용약관동의</h2>
    <BaseCheckBox v-model="allSelect" value="all" fieldId="모두 동의" />
    <BaseCheckBox
      v-model="selected"
      value="1"
      fieldId="[필수] 서비스 이용약관 동의"
    />
    <BaseCheckBox
      v-model="selected"
      value="2"
      fieldId="[필수] 개인 정보 수집 및 동의"
    />
    <BaseCheckBox
      v-model="selected"
      value="3"
      fieldId="[선택] 마케팅 수신 정보 동의"
    />
  </div>
</template>
<script lang="ts">
  import { defineComponent, onMounted, ref, watchEffect, watch } from "vue";
  import BaseCheckBox from "@/components/common/BaseCheckBox.vue";

  export default defineComponent({
    name: "SignUp",
    components: {
      BaseCheckBox,
    },
    setup() {
      console.log("setup호출");
      const allSelect = ref<string[]>([]);
      const selected = ref<string[]>([]);
      onMounted(() => {
        console.log("onmounted호출");
      });
      return { allSelect, selected };
    },
  });
</script>
<style scoped lang="scss">
  .wrap {
    header {
      text-align: center;
    }
  }
</style>
