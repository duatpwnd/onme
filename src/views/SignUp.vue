<template>
  <header>
    <button class="back-btn" @click="router.go(-1)">뒤로가기</button>
    <h1 class="header-title">회원가입</h1>
  </header>
  <span class="step"
    ><b>{{ step }}</b
    >/3</span
  >
  <router-view />
</template>
<script lang="ts">
  import { defineComponent, getCurrentInstance, watch, ref } from "vue";
  import { useRoute } from "vue-router";
  export default defineComponent({
    name: "SignUp",
    setup() {
      const globalProperties =
        getCurrentInstance()?.appContext.config.globalProperties;
      const route = useRoute() as any;
      const router = globalProperties?.$router;
      const step = ref(1);
      watch(
        () => route.name,
        (curr, prev) => {
          step.value = curr.split("Step")[1];
        },
        { immediate: true }
      );
      return { router, route, step };
    },
  });
</script>
<style scoped lang="scss">
  header {
    text-align: center;
    .back-btn {
      left: 20px;
    }
  }
  .step {
    color: #ccc;
    margin-top: 52px;
    margin-bottom: 20px;
    padding: 0 20px;
    b {
      color: #303538;
    }
  }
</style>
