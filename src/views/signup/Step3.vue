<template>
  <div class="wrap">
    <h2>NOPY<br />이메일, 비밀번호</h2>
    <form class="signup-form">
      <fieldset>
        <legend>회원가입</legend>
        <input
          type="text"
          v-on:input="userEmail = $event.target.value"
          class="user-email"
          placeholder="이메일 입력"
        />
        <p
          class="guide-msg"
          v-show="userEmail.length > 0 && email.error == false"
        >
          이메일을 다시 확인해 주세요.
        </p>
        <!-- 1차입력 -->
        <div class="user-pw">
          <input
            :type="show.pw1 ? 'text' : 'password'"
            v-on:input="userPw1 = $event.target.value"
            placeholder="비밀번호 입력"
          />
          <img
            @click="show.pw1 = !show.pw1"
            :src="
              show.pw1
                ? require('@/assets/images/password_show_ico.png')
                : require('@/assets/images/password_hide_ico.png')
            "
          />
        </div>
        <!-- 2차입력 -->
        <div
          class="user-pw"
          v-show="errorType.error1 == false && errorType.error2 == false"
        >
          <input
            :type="show.pw2 ? 'text' : 'password'"
            v-on:input="userPw2 = $event.target.value"
            placeholder="비밀번호 재입력"
          />
          <img
            @click="show.pw2 = !show.pw2"
            :src="
              show.pw2
                ? require('@/assets/images/password_show_ico.png')
                : require('@/assets/images/password_hide_ico.png')
            "
          />
        </div>
        <p class="guide-msg" v-if="userPw1.length > 0 && errorType.error1">
          8자리 이상 입력해주세요.
        </p>
        <p class="guide-msg" v-else-if="userPw1.length > 0 && errorType.error2">
          같은 문자가 3회 이상 반복될 수 없습니다.
        </p>
        <p
          class="guide-msg"
          v-if="
            userPw2.length > 0 &&
            errorType.error1 == false &&
            errorType.error2 == false &&
            errorType.error3 == false
          "
        >
          비밀번호가 일치하지 않습니다.
        </p>
        <p class="guide-msg">{{ errorMessage }}</p>
        <button
          type="button"
          :class="[
            {
              active:
                email.error &&
                errorType.error1 == false &&
                errorType.error2 == false &&
                errorType.error3,
            },
            'signup-btn',
          ]"
          @click="
            email.error &&
            errorType.error1 == false &&
            errorType.error2 == false &&
            errorType.error3
              ? signUpSubmit(userEmail, userPw1)
              : ''
          "
        >
          회원가입 완료
        </button>
      </fieldset>
    </form>
  </div>
</template>
<script lang="ts">
  import {
    defineComponent,
    reactive,
    computed,
    ref,
    getCurrentInstance,
  } from "vue";
  // 이메일 유효성 체크
  const emailCheck = () => {
    const userEmail = ref("");
    const emailRegExp =
      /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    const email = reactive({
      error: computed(() => emailRegExp.test(userEmail.value.trim())),
    });
    return { userEmail, email };
  };
  // 비밀번호 유효성 체크
  const passwordCheck = () => {
    const userPw1 = ref("");
    const userPw2 = ref("");
    const errorType = reactive({
      error1: computed(() => userPw1.value.length < 8),
      error2: computed(() => /(\w)\1\1/.test(userPw1.value)),
      error3: computed(() => userPw1.value == userPw2.value),
    });
    return { userPw1, userPw2, errorType };
  };
  // 비밀번호 보여주기
  const showPassword = () => {
    const show = reactive({
      pw1: false,
      pw2: false,
    });
    return { show };
  };
  export default defineComponent({
    name: "Step3",
    setup() {
      const globalProperties =
        getCurrentInstance()?.appContext.config.globalProperties;
      const axios = globalProperties?.axios;
      const apiUrl = globalProperties?.apiUrl;
      const route = globalProperties?.$route;
      const router = globalProperties?.$router;
      const emitter = globalProperties?.emitter;
      const cookie = globalProperties?.$cookie;
      const store = globalProperties?.$store;
      const errorMessage = ref("");
      const signUpSubmit = (email: string, pw: string) => {
        const body = {
          is_service: true,
          is_information: true,
          is_marketing: route.query == 2 ? false : true,
          username: route.query.name,
          email: email,
          password: pw,
        };
        console.log("바디:", body);
        axios
          .post(apiUrl.signUp, body)
          .then((result: any) => {
            console.log("회원가입결과:", result);
            cookie.setCookie("userInfo", result.data.data);
            store.commit("userStore/USER_INFO", result.data.data);
            router.push("/");
          })
          .catch((err: any) => {
            console.log("vvv,", err.data);
            errorMessage.value = err.data.message;
          });
      };
      return {
        signUpSubmit,
        ...emailCheck(),
        ...passwordCheck(),
        ...showPassword(),
        errorMessage,
      };
    },
  });
</script>
<style scoped lang="scss">
  .wrap {
    padding: 0 20px;
    .signup-form {
      margin-top: 32px;
      input {
        font-size: 18px;
        border: 0;
      }
      .user-email {
        background: #f2f4f5;
        border-radius: 4px;
        width: 100%;
        padding: 18px 20px;
        box-sizing: border-box;
      }
      .user-pw {
        margin-top: 12px;
        background: #f2f4f5;
        padding: 18px 20px;
        box-sizing: border-box;
        border-radius: 4px;
        input {
          background: transparent;
          width: calc(100% - 20px);
        }
      }
      .guide-msg {
        color: #ef284c;
        font-size: 12px;
        margin-top: 8px;
        margin-left: 20px;
      }
      .signup-btn {
        color: white;
        background: #b8bfc4;
        text-align: center;
        width: 100%;
        padding: 16px 0;
        font-size: 18px;
        margin-top: 12px;
        border-radius: 4px;
      }
      .active {
        background: black;
      }
    }
  }
</style>
