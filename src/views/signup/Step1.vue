<template>
  <div class="wrap">
    <h2>NOPY<br />이용약관동의</h2>
    <div class="checkbox-wrap">
      <BaseCheckBox
        @all-check="allCheck"
        :allChecked="selected.length == list.length"
        value="all"
        fieldId="모두 동의"
        class="all-checkbox"
      />
      <div v-for="(item, index) in list" :key="index" class="row">
        <BaseCheckBox
          v-model="selected"
          :value="'agree' + index"
          :fieldId="item"
        />
        <button class="view">보기</button>
      </div>
    </div>
  </div>
  <router-link v-if="agreeIncludes == false" to="/signup/step1" class="agree"
    >동의하고 계속 진행</router-link
  >
  <router-link
    v-else
    :to="{ path: '/signup/step2', query: { agree: selected.length } }"
    class="agree active"
    >동의하고 계속 진행</router-link
  >
</template>
<script lang="ts">
  import { computed, defineComponent, onMounted, ref } from "vue";
  import BaseCheckBox from "@/components/common/BaseCheckBox.vue";

  export default defineComponent({
    name: "Step1",
    components: {
      BaseCheckBox,
    },
    setup() {
      console.log("setup호출");
      const list = [
        "[필수] 서비스 이용약관 동의",
        "[필수] 개인 정보 수집 및 동의",
        "[선택] 마케팅 수신 정보 동의",
      ];
      const selected = ref<string[]>([]);
      const agreeIncludes = computed(
        () =>
          selected.value.includes("agree0") && selected.value.includes("agree1")
      );
      const allCheck = (param: boolean) => {
        selected.value = [];
        if (param) {
          list.forEach((el, index) => {
            selected.value.push("agree" + index);
          });
        }
      };
      onMounted(() => {
        console.log("onmounted호출");
      });
      return { selected, list, agreeIncludes, allCheck };
    },
  });
</script>
<style scoped lang="scss">
  .wrap {
    padding: 0 20px;
    .checkbox-wrap {
      margin-top: 40px;
      .row {
        position: relative;
        &:not(:first-child) {
          margin-top: 20px;
        }
        .view {
          position: absolute;
          top: 0;
          right: 0;
          font-size: 14px;
          color: #9ea7ad;
          font-weight: 400;
        }
      }

      .all-checkbox {
        width: 100%;
        font-weight: 700;
        font-size: 18px;
        padding-bottom: 20px;
        border-bottom: 1px solid #f2f4f5;
      }
    }
  }
  .agree {
    position: fixed;
    left: 0;
    bottom: 0;
    color: white;
    background: #b8bfc4;
    text-align: center;
    width: 100%;
    padding: 16px 0;
    font-size: 18px;
  }
  .active {
    background: black;
  }
</style>
