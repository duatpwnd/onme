<template>
  <BaseBottomModal v-show="menu" @close="menu = false">
    <template #button>
      <router-link to="/myInfo">내 정보</router-link>
      <router-link to="/setting" class="set-btn">설정</router-link>
    </template>
  </BaseBottomModal>
  <div class="wrap">
    <header>
      <router-link to="/" class="back-btn">뒤로가기</router-link>
      <div class="right-menu">
        <label for="upload" class="add-btn">
          <input
            type="file"
            accept=".png,.jpg,.jpeg"
            id="upload"
            ref="file"
            @change="fileUploadFunc()"
          />
        </label>
        <button class="menu-btn" @click="menu = true">메뉴</button>
      </div>
    </header>
    <!-- 유저 정보 :: S -->
    <div class="info">
      <div class="user-info">
        <img
          class="profile-img"
          :src="
            userInfo.data.image_profile == null
              ? require('@/assets/images/signout_profile_img2.png')
              : userInfo.data.image_profile
          "
        />
        <span class="user-name">{{ userInfo.data.username }}</span>
        <!-- <span class="sns-link">
          <img src="@/assets/images/facebook_ico1.png" class="ico1" />
          <img src="@/assets/images/facebook_ico2.png" class="ico2" />
        </span> -->
      </div>
      <p class="guide-msg">
        <strong>{{ userInfo.data.count_posts }}개</strong>의 자산을<br />보호중입니다.
      </p>
    </div>
    <!-- 유저 정보 :: E -->
    <!-- 0개의 자산일 경우 -->
    <!-- <div class="register-area" v-if="feedList.length == 0">
      <p class="msg">보호중인 자산이 없습니다.</p>
      <button class="register-btn">내 자산 등록</button>
    </div> -->

    <!-- <img src="@/assets/images/feed1.png" /> -->
  </div>
  <MasnoryLayout v-if="masnory" :id="userInfo.data.id" />
</template>
<script lang="ts">
  import {
    defineComponent,
    onMounted,
    computed,
    ref,
    getCurrentInstance,
    reactive,
  } from "vue";
  import BaseBottomModal from "@/components/common/BaseBottomModal.vue";
  import MasnoryLayout from "@/components/common/MasnoryLayout.vue";
  export default defineComponent({
    name: "MyPage",
    components: {
      MasnoryLayout,
      BaseBottomModal,
    },
    setup() {
      const globalProperties =
        getCurrentInstance()?.appContext.config.globalProperties;
      const axios = globalProperties?.axios;
      const apiUrl = globalProperties?.apiUrl;
      const store = globalProperties?.$store;
      const getBase64 = globalProperties?.$getBase64;
      const router = globalProperties?.$router;
      const userStore = computed(() => store.state.userStore.userInfo);
      const masnory = ref(false);
      const menu = ref(false);
      const file = ref(null);
      let userInfo: { [key: string]: any } = reactive({ data: {} });
      const getMyInfo = () => {
        axios.get(apiUrl.getMyInfo).then((result: any) => {
          console.log("나의페이지조회:", result.data.data);
          userInfo.data = result.data.data;
          masnory.value = true;
        });
      };
      const fileUploadFunc = () => {
        const inputFile = file.value as unknown as HTMLFormElement;
        const output = getBase64(inputFile.files[0]);
        output.then((base64: string) => {
          localStorage.setItem("base64", base64);
          router.push({
            path: "/register",
          });
        });
      };
      getMyInfo();
      return { menu, userInfo, userStore, masnory, file, fileUploadFunc };
    },
  });
</script>
<style scoped lang="scss">
  .mask {
    a {
      font-weight: 400;
      width: 100%;
      text-align: center;
      font-size: 24px;
      display: block;
    }
    .set-btn {
      margin-top: 40px;
    }
  }
  .masnory-wrap {
    margin-top: 16px;
  }
  .wrap {
    padding: 0 20px;
    .mask {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.6);
      .modal {
        position: absolute;
        bottom: 0;
        width: 100%;
        .close-area {
          text-align: right;
          padding-right: 24px;
          padding-bottom: 24px;
          .close-btn {
            width: 21px;
            height: 21px;
            background: url("~@/assets/images/close_btn.png") no-repeat center /
              21px 21px;
          }
        }
        .nav-btn {
          background: white;
          padding: 70px 0;
          a {
            width: 100%;
            text-align: center;
            font-size: 24px;
          }
        }
        .set-btn {
          margin-top: 40px;
        }
      }
    }
    header {
      position: sticky;
      &:after {
        display: block;
        content: "";
        clear: both;
      }
      .add-btn,
      .menu-btn {
        text-indent: 100%;
        white-space: nowrap;
        overflow: hidden;
      }
      .right-menu {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        height: 24px;
        .add-btn {
          display: inline-block;
          vertical-align: middle;
          width: 20px;
          height: 20px;
          background: url("~@/assets/images/register_btn.png") no-repeat center /
            20px 20px;
          input[type="file"] {
            display: none;
          }
        }
        .menu-btn {
          background: url("~@/assets/images/menu.png") no-repeat center / 24px
            24px;
          width: 24px;
          vertical-align: middle;
          margin-left: 28px;
        }
      }
    }
    .info {
      margin-top: 24px;
      .user-info {
        position: relative;
        .profile-img {
          width: 80px;
          height: 80px;
          border-radius: 50px;
        }
        .user-name {
          width: 185px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          margin-left: 16px;
          vertical-align: middle;
        }
        .sns-link {
          position: absolute;
          right: 0;
          top: 0;
          bottom: 0;
          margin: auto;
          height: 24px;
          .ico1 {
            margin-right: 16px;
          }
        }
      }
      .guide-msg {
        margin-top: 16px;
        font-size: 24px;
      }
    }
    .masnory {
      margin-top: 40px;
      column-count: 2;
      column-gap: 16px;
      .mItem {
        display: inline-block;
        margin-bottom: 16px;
        width: 100%;
        a {
          width: 100%;
          border-radius: 12px;
          overflow: hidden;
          img {
            width: 100%;
          }
        }
      }
    }
    .register-area {
      margin-top: 30px;
      text-align: center;
      .msg {
        color: #79828a;
        font-weight: 700;
      }
      .register-btn {
        background: black;
        color: white;
        text-align: center;
        width: 80%;
        padding: 16px 0;
        border-radius: 4px;
        margin-top: 24px;
      }
    }
  }
</style>
