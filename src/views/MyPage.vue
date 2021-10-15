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
        <router-link class="add-btn" to="/register">추가</router-link>
        <button class="menu-btn" @click="menu = true">메뉴</button>
      </div>
    </header>
    <!-- 유저 정보 :: S -->
    <div class="info">
      <div class="user-info">
        <img
          src="@/assets/images/profile_img.png"
          alt="유저프로필"
          title="유저프로필"
        />
        <span class="user-name">파인아트작가</span>
        <span class="sns-link">
          <img src="@/assets/images/facebook_ico1.png" class="ico1" />
          <img src="@/assets/images/facebook_ico2.png" class="ico2" />
        </span>
      </div>
      <p class="guide-msg"><strong>0개</strong>의 자산을<br />보호중입니다.</p>
    </div>
    <!-- 유저 정보 :: E -->
    <!-- 0개의 자산일 경우 -->
    <div class="register-area">
      <p class="msg">보호중인 자산이 없습니다.</p>
      <button class="register-btn">내 자산 등록</button>
    </div>

    <!-- <img src="@/assets/images/feed1.png" /> -->
  </div>
</template>
<script lang="ts">
  import { defineComponent, onMounted, ref, getCurrentInstance } from "vue";
  import BaseBottomModal from "@/components/common/BaseBottomModal.vue";
  export default defineComponent({
    name: "MyPage",
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
      onMounted(() => {
        console.log("onmounted호출");
      });

      return { menu };
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
          width: 20px;
          vertical-align: middle;
          background: url("~@/assets/images/register_btn.png") no-repeat center /
            20px 20px;
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
