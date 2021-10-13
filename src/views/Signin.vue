<template>
  <div class="wrap">
    <router-link to="/" class="logo">NOPY</router-link>
    <form class="login-form">
      <fieldset>
        <legend>로그인</legend>
        <input
          type="text"
          v-model="userInput.userEmail"
          @keyup="
            userInput.userEmailValidation
              ? (userInput.guideMsg1 = false)
              : (userInput.guideMsg1 = true)
          "
          class="user-email"
          placeholder="이메일 입력"
        />
        <p class="guide-msg" v-show="userInput.guideMsg1">
          이메일을 다시 확인해 주세요.
        </p>
        <input
          type="password"
          v-model="userInput.userPw"
          class="user-pw"
          placeholder="비밀번호 입력"
        />
        <p class="guide-msg" v-show="userInput.guideMsg2">
          입력하신 정보와 일치하는 계정이 없습니다.로그인 정보를 다시
          확인해주세요.
        </p>
        <button type="button" class="signin-btn" @click="signInSubmit()">
          로그인
        </button>
      </fieldset>
    </form>
  </div>
  <router-link to="/signUp" class="signup-email">이메일로 가입하기</router-link>
</template>
<script lang="ts">
  import {
    defineComponent,
    onMounted,
    reactive,
    ref,
    getCurrentInstance,
    computed,
  } from "vue";
  import { useStore } from "vuex";
  export default defineComponent({
    name: "SignIn",
    setup() {
      console.log("setup호출");
      const globalProperties =
        getCurrentInstance()?.appContext.config.globalProperties;
      const axios = globalProperties?.axios;
      const apiUrl = globalProperties?.apiUrl;
      const cookie = globalProperties?.$cookie;
      const store = globalProperties?.$store;
      // 로그인 함수 :: S //
      const signIn = () => {
        console.log("로그인함수호출");
        interface ModelType {
          userEmail: string;
          userPw: string;
          userEmailValidation: boolean;
          guideMsg1: boolean;
          guideMsg2: boolean;
        }
        const regExp =
          /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
        const userInput: ModelType = reactive({
          userEmail: "",
          userPw: "",
          userEmailValidation: computed(() => regExp.test(userInput.userEmail)),
          guideMsg1: false, // 이메일 유효성검사 통과 못했을때
          guideMsg2: false, // 이메일 유효성검사는 통과했지만 아이디 또는 비밀번호가 틀렸을때
        });
        const signInSubmit = () => {
          const body = {
            email: userInput.userEmail,
            password: userInput.userPw,
          };
          console.log(body);
          axios
            .post(apiUrl.signIn, JSON.stringify(body))
            .then((result: any) => {
              console.log("로그인결과:", result);
              cookie.setCookie("userInfo", result.data);
              store.commit("userStore/USER_INFO", result.data);
            });
        };
        return { userInput, signInSubmit };
      };
      // 로그인 함수 :: E //
      onMounted(() => {
        console.log("onmounted호출");
      });
      return { ...signIn() };
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
      .guide-msg {
        color: #ef284c;
        font-size: 12px;
        margin-top: 8px;
        margin-left: 20px;
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
    bottom: 0px;
    text-align: center;
    width: 100%;
    border: 1px solid #dbdfe1;
    border-right: 0;
    border-left: 0;
    padding: 28px 0;
  }
</style>
