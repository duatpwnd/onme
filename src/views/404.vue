<template>
  <p class="not-found">페이지를 찾을수 없습니다.</p>
</template>
<script lang="ts">
  import { defineComponent, onMounted, getCurrentInstance } from "vue";
  export default defineComponent({
    name: "404",
  });
</script>
<style scoped lang="scss">
  .not-found {
    font-size: 28px;
    height: 27px;
    position: fixed;
    top: 0;
    bottom: 0;
    margin: auto;
    text-align: center;
    width: 100%;
    max-width: 435px;
  }
</style>
