<template>
  <BaseBottomModal v-show="menu" @close="menu = false">
    <template #button>
      <label for="upload">사진 선택</label>
      <input type="file" id="upload" ref="file" @change="handleFileUpload()" />
      <button class="basic-btn">기본 이미지</button>
    </template>
  </BaseBottomModal>
  <div class="wrap">
    <header>
      <router-link to="/setting" class="back-btn">뒤로가기</router-link>
      <h1 class="header-title">내정보</h1>
    </header>
    <div class="profile">
      <div class="gallery">
        <img
          class="profile-img"
          :src="
            imageUrl == ''
              ? require('@/assets/images/profile_big_img.png')
              : imageUrl
          "
        />
        <button class="profile-change-btn" @click="menu = true"></button>
      </div>
      <div class="nickname-area">
        <span class="nickname">snaptag</span>
        <button class="nickname-change-btn"></button>
      </div>
    </div>
    <section class="my-account">
      <h2 class="h2-title">내 계정</h2>
      <section>
        <h3 class="h3-title">연동계정</h3>
        <input
          type="text"
          class="connect-account"
          placeholder="애플 로그인"
          readonly
        />
      </section>
      <section>
        <h3 class="h3-title">이메일</h3>
        <input type="text" placeholder="duatpwnd1@naver.com" readonly />
      </section>
      <section>
        <h3 class="h3-title">비밀번호</h3>
        <input type="password" value="asdlaskdklasd" readonly />
      </section>
    </section>
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
  import BaseBottomModal from "@/components/common/BaseBottomModal.vue";
  export default defineComponent({
    name: "MyInfo",
    components: {
      BaseBottomModal,
    },
    setup() {
      console.log("setup호출");
      const globalProperties =
        getCurrentInstance()?.appContext.config.globalProperties;
      const axios = globalProperties?.axios;
      const apiUrl = globalProperties?.apiUrl;
      const store = globalProperties?.store;
      const menu = ref(false);
      const file = ref();
      const imageUrl = ref("");
      const handleFileUpload = async () => {
        const formData = new FormData();
        const url = URL.createObjectURL(file.value.files[0]);
        imageUrl.value = url;
        menu.value = false;
        // formData.append('user', JSON.stringify(body['user']));
        formData.append("image_profile", file.value.files[0]);
        formData.append("username", "test");
        axios
          .post(apiUrl.test, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((result: { [key: string]: any }) => {
            console.log("프로필이미지수정결과:", result);
          });
      };
      // 마이페이지 조회
      const getMyInfo = () => {
        axios.get(apiUrl.getMyInfo).then((result: { [key: string]: any }) => {
          console.log(result);
        });
      };
      onMounted(() => {
        console.log("onmounted호출");
        getMyInfo();
      });
      return { menu, file, imageUrl, handleFileUpload };
    },
  });
</script>
<style scoped lang="scss">
  .mask {
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
