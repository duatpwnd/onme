<template>
  <router-view />
</template>
<script lang="ts">
  import { computed, defineComponent, onUpdated, ref } from "vue";
  export default defineComponent({
    name: "Home",
    setup() {
      console.log("setup호출");
      onUpdated(() => {
        console.log("updated 호출");
      });
    },
  });
</script>

<style lang="scss">
  @import "@/assets/reset.scss";
</style>
