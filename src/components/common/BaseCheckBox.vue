<template>
  <label class="container-checkbox">
    <input type="checkbox" checked="checked" />
    <span class="checkmark"></span>
  </label>
</template>
<script lang="ts">
  import { defineComponent, onMounted } from "vue";
  export default defineComponent({
    name: "BaseCheckBox",
    setup() {
      console.log("setup호출");
      onMounted(() => {
        console.log("onmounted호출");
      });
    },
  });
</script>
<style scoped lang="scss">
  input {
    display: none;
  }
  input[type="checkbox"] + .checkmark {
    width: 20px;
    height: 20px;
    display: inline-block;
    background: url("~@/assets/images/check_ico.png") #ccc no-repeat center /
      12px 9px;
  }
  input[type="checkbox"]:checked + .checkmark {
    background: url("~@/assets/images/check_ico.png") black no-repeat center /
      12px 9px;
  }
</style>
