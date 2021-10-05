<template>
  <div id="nav"></div>
</template>
<script lang="ts">
  import { computed, defineComponent, onUpdated, ref } from "vue";
  import BaseCheckBox from "@/components/common/BaseCheckBox.vue";
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
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  #nav {
    padding: 30px;

    a {
      font-weight: bold;
      color: #2c3e50;

      &.router-link-exact-active {
        color: #42b983;
      }
    }
  }
</style>
