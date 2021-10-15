<template>
  <router-view />
</template>
<script lang="ts">
  import { computed, defineComponent, onUpdated, ref } from "vue";
  export default defineComponent({
    name: "Home",
    setup() {
      console.log("App.uve::setup호출");
      onUpdated(() => {
        console.log("App.uve::updated 호출");
      });
    },
  });
</script>

<style lang="scss">
  @import "@/assets/reset.scss";
  body {
    header {
      height: 60px;
      position: relative;
      .back-btn {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        margin: auto;
        text-indent: 100%;
        white-space: nowrap;
        overflow: hidden;
        width: 24px;
        height: 30px;
        background: url("~@/assets/images/back_btn.png") no-repeat center / 24px
          24px;
      }
      .header-title {
        font-size: 17px;
        line-height: 60px;
      }
    }
  }
</style>
