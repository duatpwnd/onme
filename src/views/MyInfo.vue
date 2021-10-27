<template>
  <div class="mask" v-show="nicknameChangeModal" @click="initialize()">
    <div class="nickname-change-modal" @click.stop>
      <div class="body">
        <div class="header">
          <b>닉네임</b
          ><span class="character-count">({{ nickname.length }}/20)</span>
          <button @click="nicknameChange('default')" class="save-btn">
            저장
          </button>
        </div>
        <input
          type="text"
          class="input"
          :value="nickname"
          v-on:input="nickname = $event.target.value"
          :oninput="maxlengthCheck()"
          placeholder="이름 또는 필명 입력"
        />
      </div>
      <p class="error-message" v-show="errorMessage != null">
        {{ errorMessage }}
      </p>
    </div>
  </div>
  <BaseBottomModal v-show="menu" @close="menu = false">
    <template #button>
      <label for="upload">사진 선택</label>
      <input
        type="file"
        accept=".png,.jpg,.jpeg"
        id="upload"
        ref="file"
        @change="handleFileUpload()"
      />
      <button class="basic-btn" @click="handleFileUpload('default')">
        기본 이미지
      </button>
    </template>
  </BaseBottomModal>
  <div class="wrap">
    <header>
      <button class="back-btn" @click="router.go(-1)">뒤로가기</button>
      <h1 class="header-title">내정보</h1>
    </header>
    <div class="profile">
      <div class="gallery">
        <img
          class="profile-img"
          :src="
            userInfo.image_profile == null
              ? require('@/assets/images/signout_profile_img2.png')
              : userInfo.image_profile
          "
        />
        <button class="profile-change-btn" @click="menu = true"></button>
      </div>
      <div class="nickname-area">
        <span class="nickname"> {{ userInfo.username }} </span>
        <button
          class="nickname-change-btn"
          @click="nicknameChangeModal = true"
        ></button>
      </div>
    </div>
    <section class="my-account">
      <h2 class="h2-title">내 계정</h2>
      <!-- <section>
        <h3 class="h3-title">연동계정</h3>
        <input
          type="text"
          class="connect-account"
          placeholder="애플 로그인"
          readonly
        />
      </section> -->
      <section>
        <h3 class="h3-title">이메일</h3>
        <input type="text" :placeholder="userInfo.email" readonly />
      </section>
      <!-- <section>
        <h3 class="h3-title">비밀번호</h3>
        <input type="password" value="asdlaskdklasd" readonly />
      </section> -->
    </section>
  </div>
</template>
<script lang="ts">
  import {
    defineComponent,
    onMounted,
    ref,
    getCurrentInstance,
    toRefs,
    computed,
    reactive,
  } from "vue";
  import BaseBottomModal from "@/components/common/BaseBottomModal.vue";
  export default defineComponent({
    name: "MyInfo",
    components: {
      BaseBottomModal,
    },
    setup() {
      const globalProperties =
        getCurrentInstance()?.appContext.config.globalProperties;
      const axios = globalProperties?.axios;
      const apiUrl = globalProperties?.apiUrl;
      const router = globalProperties?.$router;
      const cookie = globalProperties?.$cookie;
      const store = globalProperties?.$store;
      const userStore = computed(() => store.state.userStore.userInfo);
      const res = reactive({ userInfo: "" });
      const menu = ref(false);
      const file = ref(null);
      const errorMessage = ref(null);
      const imageUrl = ref(null);
      const nickname = ref("");
      const nicknameChangeModal = ref(false);
      // 초기화
      const initialize = () => {
        nickname.value = "";
        nicknameChangeModal.value = false;
        errorMessage.value = null;
      };
      // 닉네임변경
      const nicknameChange = () => {
        axios
          .patch(apiUrl.profileNicknameChange, { username: nickname.value })
          .then((result: { [key: string]: any }) => {
            console.log("닉네임수정결과:", result.data.data.username);
            initialize();
            getMyInfo().then((result: { [key: string]: any }) => {
              cookie.setCookie("userInfo", { ...userStore.value, ...result });
              store.commit("userStore/USER_INFO", {
                ...userStore.value,
                ...result,
              });
            });
          })
          .catch((err: any) => {
            console.log("닉네임수정에러:", err);
            errorMessage.value = err.data.message;
          });
      };
      // 이미지 업로드
      const handleFileUpload = async (type: string) => {
        const formData = new FormData();
        const inputFile = file.value as unknown as HTMLFormElement;
        menu.value = false;
        if (type == "default") {
          formData.append("image_profile", "");
        } else {
          formData.append("image_profile", inputFile.files[0]);
        }
        axios
          .patch(apiUrl.profileImageChange, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((result: { [key: string]: any }) => {
            console.log("프로필이미지수정결과:", result);
            getMyInfo().then((result: { [key: string]: any }) => {
              cookie.setCookie("userInfo", { ...userStore.value, ...result });
              store.commit("userStore/USER_INFO", {
                ...userStore.value,
                ...result,
              });
            });
          })
          .catch((err: any) => {
            console.log("파일업로드에러:", err);
          });
      };
      // 마이페이지 조회
      const getMyInfo = () => {
        return axios
          .get(apiUrl.getMyInfo)
          .then((result: { [key: string]: any }) => {
            console.log("마이페이지호회결과:", result);
            res.userInfo = result.data.data;
            return result.data.data;
          });
      };
      const maxlengthCheck = () => {
        if (nickname.value.length > 20) {
          nickname.value = nickname.value.slice(0, 20);
        }
      };
      const { userInfo } = toRefs(res);
      onMounted(() => {
        getMyInfo();
      });
      return {
        maxlengthCheck,
        menu,
        file,
        imageUrl,
        nickname,
        userInfo,
        nicknameChangeModal,
        errorMessage,
        router,
        nicknameChange,
        handleFileUpload,
        initialize,
      };
    },
  });
</script>
<style scoped lang="scss">
  .modal {
    input[type="file"] {
      display: none;
    }
    button,
    label {
      font-weight: 400;
      width: 100%;
      text-align: center;
      font-size: 24px;
      display: block;
    }
    .basic-btn {
      margin-top: 40px;
    }
  }
  .mask {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 5;
    .nickname-change-modal {
      position: fixed;
      bottom: 0;
      width: 100%;
      .body {
        background: white;
        padding: 20px;
        height: 192px;
        box-sizing: border-box;
        .header {
          b {
            font-size: 18px;
          }
          .character-count {
            color: #9ea7ad;
            font-size: 18px;
            margin-left: 4px;
          }
          .save-btn {
            float: right;
            color: #256ee8;
            font-size: 14px;
          }
        }
        .input {
          width: 150px;
          margin: 0 auto;
          font-size: 18px;
          margin-top: 50px;
          border: 0;
          display: block;
        }
      }
      .error-message {
        background: rgba(13, 16, 26, 0.7);
        font-size: 14px;
        color: white;
        padding: 16px 20px;

        &::before {
          content: url("~@/assets/images/caution_ico.png");
          vertical-align: middle;
          margin-right: 8px;
        }
      }
    }
  }
  .wrap {
    padding: 0 20px;
    header {
      text-align: center;
    }
    .profile {
      margin-top: 40px;
      text-align: center;
      .gallery {
        position: relative;
        display: inline-block;
        .profile-img {
          width: 80px;
          height: 80px;
          border-radius: 50px;
        }
        .profile-change-btn {
          position: absolute;
          bottom: 0;
          right: 0;
          width: 28px;
          height: 28px;
          background: url("~@/assets/images/profile_change_btn.png") no-repeat
            center / 28px 28px;
        }
      }
      .nickname-area {
        margin-top: 20px;
        .nickname {
          font-size: 18px;
          font-weight: 700;
          vertical-align: middle;
          margin-right: 8px;
        }
        .nickname-change-btn {
          width: 20px;
          height: 20px;
          vertical-align: middle;
          background: url("~@/assets/images/nickname_change_btn.png") no-repeat
            center / 20px 20px;
        }
      }
    }
    section {
      .h2-title {
        font-size: 18px;
      }
      .h3-title {
        font-size: 14px;
        font-weight: 400;
        color: #525a61;
        margin-top: 20px;
        margin-bottom: 8px;
      }
      input {
        width: 100%;
        padding: 12px 20px;
        box-sizing: border-box;
        background: #f2f4f5;
        border-radius: 4px;
        border: 0;
      }
      .connect-account {
        padding-left: 50px;
        background: url("~@/assets/images/apple_ico.png") #f2f4f5 no-repeat
          center left 20px / 20px 20px;
      }
    }
  }
</style>
