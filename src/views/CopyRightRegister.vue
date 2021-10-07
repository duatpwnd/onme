<template>
  <main>
    <img
      src="@/assets/images/register_img.png"
      class="representative-img"
      alt="대표이미지"
      title="대표이미지"
    />
    <div class="tag">
      <h2 class="title">태그</h2>
      <input type="text" placeholder="태그입력" class="tag-input" />
    </div>
    <div class="is-open">
      <h2 class="title">공개여부</h2>
      <BaseSwitcherButton v-model="open" value="공개" fieldId="공개" />
    </div>
    <div class="license">
      <h2 class="title">타인사용허가</h2>
      <BaseSwitcherButton v-model="license" value="허용" fieldId="허용" />
    </div>
    <div class="condition-set">
      <h2 class="title">사용조건 설정</h2>
      <BaseCheckBox
        v-model="conditionSet"
        value="저작권 표기"
        fieldId="저작권표기"
      />
      <BaseCheckBox v-model="conditionSet" value="비영리" fieldId="비영리" />
      <BaseCheckBox
        v-model="conditionSet"
        value="변경금지"
        fieldId="변경금지"
      />
      <BaseCheckBox
        v-model="conditionSet"
        value="동일조건 변경허락"
        fieldId="동일조건 변경허락"
      />
    </div>
    <div class="certificate">
      <h2 class="title">저작권 인증서</h2>
      <div class="btn-area">
        <button
          :class="[{ active: activeBtn }, 'issued-btn']"
          @click="activeBtn = true"
        >
          발급
        </button>
        <button
          :class="[{ active: activeBtn == false }, 'unissued-btn']"
          @click="activeBtn = false"
        >
          미발급
        </button>
      </div>
    </div>
    <button class="protect-btn">저작권 보호 시작</button>
  </main>
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
  import BaseCheckBox from "@/components/common/BaseCheckBox.vue";
  export default defineComponent({
    components: { BaseCheckBox, BaseSwitcherButton },
    setup() {
      console.log("setup");
      const instance = getCurrentInstance();
      const axios = instance?.appContext.config.globalProperties.axios;
      const conditionSet = ref<string[]>([]); // 사용조건 설정
      const open = ref(true); // 공개 여부
      const license = ref(true); // 타인사용허가 여부
      const activeBtn = ref(true); // 발급/미발급 여부
      return { open, license, activeBtn, conditionSet };
    },
  });
</script>
<style scoped lang="scss">
  main {
    .representative-img {
      width: 100%;
    }
    .tag,
    .license,
    .is-open,
    .condition-set,
    .certificate {
      padding: 32px 20px;
      border-bottom: 1px solid #f2f4f5;
      .title {
        font-size: 16px;
      }
    }
    .tag {
      .tag-input {
        border: 0;
        font-size: 16px;
        outline: none;
      }
    }
    .is-open,
    .license {
      position: relative;
      ::v-deep .switch-btn {
        position: absolute;
        top: 0;
        right: 20px;
        bottom: 0;
        margin: auto;
        height: 32px;
        .field-id {
          color: #9ea7ad;
        }
      }
    }
    .condition-set {
      .base-checkbox {
        width: 50%;
        margin-top: 24px;
      }
    }
    .certificate {
      .btn-area {
        margin-top: 24px;
        &:after {
          display: block;
          content: "";
          clear: both;
        }
        button {
          width: 48.5%;
          font-size: 14px;
          color: #79828a;
          border-radius: 4px;
          border: 1px solid #dbdfe1;
          padding: 13px 0;
        }
        .issued-btn {
          float: left;
        }
        .unissued-btn {
          float: right;
        }
        .active {
          border: 1px solid #111111;
          color: #303538;
        }
      }
    }
    .protect-btn {
      background: black;
      color: white;
      font-size: 18px;
      width: 100%;
      text-align: center;
      padding: 18px 0;
    }
  }
</style>
