<template>
  <div></div>
</template>
<script lang="ts">
  import {
    defineComponent,
    onMounted,
    reactive,
    ref,
    getCurrentInstance,
  } from "vue";
  export default defineComponent({
    name: "UploadProgress",
    setup() {
      console.log("setup호출");
      const instance = getCurrentInstance();
      const axios = instance?.appContext.config.globalProperties.axios;
      onMounted(() => {
        console.log("onmounted호출");
      });
    },
  });
</script>
<style scoped lang="scss"></style>
