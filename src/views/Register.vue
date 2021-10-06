<template>
  <img
    src="@/assets/images/example.png"
    class="representative-img"
    alt="대표이미지"
    title="대표이미지"
  />
  <h2>사용조건 설정</h2>
  <BaseCheckBox
    v-model="conditionSet"
    value="저작권 표기"
    fieldId="저작권표기"
  ></BaseCheckBox>
  <BaseCheckBox
    v-model="conditionSet"
    value="비영리"
    fieldId="비영리"
  ></BaseCheckBox>
  <BaseCheckBox
    v-model="conditionSet"
    value="변경금지"
    fieldId="변경금지"
  ></BaseCheckBox>
  <BaseCheckBox
    v-model="conditionSet"
    value="동일조건 변경허락"
    fieldId="동일조건 변경허락"
  ></BaseCheckBox>
</template>
<script lang="ts">
  import { defineComponent, reactive, ref } from "vue";
  import BaseCheckBox from "@/components/common/BaseCheckBox.vue";
  export default defineComponent({
    components: { BaseCheckBox },
    setup() {
      console.log("setup");
      const conditionSet = ref([]);
      return { conditionSet };
    },
  });
</script>
<style scoped lang="scss"></style>
