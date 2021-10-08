<template>
  <div class="wrap">
    <h1 class="logo">NOPY</h1>
    <form class="login-form">
      <fieldset>
        <legend>로그인</legend>
        <input type="text" class="user-id" placeholder="이메일" />
        <input type="password" class="user-pw" placeholder="비밀번호" />
        <button class="signin-btn">로그인</button>
      </fieldset>
    </form>
  </div>
  <router-link to="/email" class="signup-email">이메일로 가입하기</router-link>
  <div class="find">
    <router-link to="/" class="find-email">이메일 찾기</router-link>
    <router-link to="/">비밀번호 찾기</router-link>
  </div>
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
    name: "Signin",
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
<style scoped lang="scss">
  :global(#app) {
    height: 100%;
    overflow: hidden;
  }
  .wrap {
    padding: 20px;
    .logo {
      text-align: center;
    }
    .login-form {
      margin-top: 20px;
      input {
        width: 100%;
        padding: 12px 20px;
        box-sizing: border-box;
        background: #f2f4f5;
        border-radius: 4px;
        border: 0;
      }
      .user-pw {
        margin-top: 12px;
      }
      .signin-btn {
        background: black;
        color: white;
        text-align: center;
        width: 100%;
        padding: 18px 0;
        margin-top: 20px;
        border-radius: 4px;
      }
    }
  }
  .signup-email {
    position: absolute;
    bottom: 77px;
    text-align: center;
    width: 100%;
    border: 1px solid #dbdfe1;
    border-right: 0;
    border-left: 0;
    padding: 28px 0;
  }
  .find {
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 28px 0;
    a {
      font-size: 14px;
      color: #79828a;
      width: 50%;
      text-align: center;
    }
    .find-email {
      border-right: 1px solid #dbdfe1;
      box-sizing: border-box;
    }
  }
</style>
