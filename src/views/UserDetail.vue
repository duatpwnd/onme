<template>
  <div class="wrap">
    <header>
      <button class="back-btn" @click="router.go(-1)">뒤로가기</button>
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
      </div>
      <div class="nickname-area">
        <span class="nickname"> {{ userInfo.username }} </span>
      </div>
    </div>
  </div>
  <MasnoryLayout />
</template>
<script lang="ts">
  import {
    defineComponent,
    onMounted,
    reactive,
    ref,
    computed,
    getCurrentInstance,
    toRefs,
  } from "vue";
  import MasnoryLayout from "@/components/common/MasnoryLayout.vue";
  export default defineComponent({
    name: "UserDetail",
    components: {
      MasnoryLayout,
    },
    setup() {
      console.log("setup호출");
      const globalProperties =
        getCurrentInstance()?.appContext.config.globalProperties;
      const axios = globalProperties?.axios;
      const apiUrl = globalProperties?.apiUrl;
      const store = globalProperties?.store;
      const route = globalProperties?.$route;
      const router = globalProperties?.$router;
      const userStore = computed(() => store.state.userStore.userInfo);
      const res = reactive({ userInfo: "" });
      const getUserInfo = () => {
        axios
          .get(apiUrl.userSearch + `/${route.query.id}`)
          .then((result: { [key: string]: any }) => {
            console.log("유저정보검색결과:", result.data.data);
            res.userInfo = result.data.data;
          })
          .catch((err: any) => {
            console.log("유저정보얻기에러:", err);
          });
      };
      getUserInfo();
      return { router, ...toRefs(res) };
    },
  });
</script>
<style scoped lang="scss">
  .masnory-wrap {
    margin-top: 40px;
  }
  .wrap {
    padding: 0 20px;
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
  }
</style>
