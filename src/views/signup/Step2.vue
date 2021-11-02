<template>
  <div class="wrap">
    <h2>작가님의<br />닉네임</h2>
    <input
      type="text"
      v-on:input="
        name = $event.target.value;
        debounce(() => {
          checkNickname();
        });
      "
      class="name-input"
      placeholder="이름"
      maxlength="20"
    />
    <p class="alert-msg" v-show="isActive == false">
      {{ errorMessage }}
    </p>
    <p class="guide-msg">
      작가님의 알려진 이름, 필명을 사용하여 사람들이 작가님의 계정을 찾을 수
      있도록 도와주세요.<br />작가님의 이름은 나중에 언제든지 변경할 수 있어요.
    </p>
    <router-link
      class="next active"
      v-if="isActive"
      :to="{
        path: '/signup/step3',
        query: { name: name, agree: query.agree },
      }"
      >다음</router-link
    >
    <button v-else class="next">다음</button>
  </div>
</template>
<script lang="ts">
  import {
    defineComponent,
    onMounted,
    getCurrentInstance,
    ref,
    computed,
  } from "vue";
  export default defineComponent({
    name: "Step2",
    setup() {
      console.log("setup호출");
      const globalProperties =
        getCurrentInstance()?.appContext.config.globalProperties;
      const axios = globalProperties?.axios;
      const apiUrl = globalProperties?.apiUrl;
      const query = globalProperties?.$route.query;
      const name = ref(""); // 작가이름
      const errorMessage = ref(""); // 에러메시지
      const isActive = ref(false);
      // const regExp = computed(() => /^[a-zA-Z]*$/.test(name.value));
      const debounce = globalProperties?.$debounce();
      const checkNickname = () => {
        console.log("이름:", name);

        axios
          .post(apiUrl.checkNickname, { username: name.value.trim() })
          .then((result: any) => {
            console.log("유저닉네임결과:", result);
            isActive.value = true;
          })
          .catch((err: any) => {
            console.log("중복결과:", err);
            isActive.value = false;
            errorMessage.value = err.data.message;
          });
      };
      onMounted(() => {
        console.log("onmounted호출");
      });
      return { name, query, debounce, checkNickname, errorMessage, isActive };
    },
  });
</script>
<style scoped lang="scss">
  .wrap {
    padding: 0 20px;
    .alert-msg {
      color: #ef284c;
      font-size: 12px;
      margin-top: 8px;
      margin-left: 15px;
    }
    .guide-msg {
      color: #9ea7ad;
      font-size: 12px;
      margin-top: 40px;
    }

    .name-input {
      margin-top: 32px;
      width: 100%;
      padding: 18px 20px;
      box-sizing: border-box;
      background: #f2f4f5;
      border-radius: 4px;
      font-size: 18px;
      border: 0;
    }
    .next {
      color: white;
      background: #b8bfc4;
      text-align: center;
      width: 100%;
      padding: 16px 0;
      font-size: 18px;
      border-radius: 4px;
      margin-top: 40px;
    }
    .active {
      background: black;
    }
  }
</style>
