<template>
  <header>
    <h2>작품피드</h2>
    <div class="btn-wrap">
      <label for="upload" class="add-btn" v-if="userInfo.id != undefined">
        <input
          type="file"
          accept=".png,.jpg,.jpeg"
          id="upload"
          ref="file"
          @change="fileUploadFunc()"
        />
      </label>
      <label v-else class="add-btn" @click="router.push('/signIn')"></label>
      <router-link class="search-btn" to="/search"></router-link>
      <router-link
        v-if="userInfo.id == undefined"
        to="/signIn"
        class="profile-btn"
        :style="{
          'background-image': `url(${require('@/assets/images/signout_profile_img1.png')})`,
        }"
      ></router-link>
      <router-link
        v-else-if="userInfo.id != undefined && userInfo.image_profile != null"
        class="profile-btn"
        :style="[{ 'background-image': `url(${userInfo.image_profile})` }]"
        to="/myPage"
      ></router-link>
      <router-link
        v-else
        class="profile-btn"
        :style="{
          'background-image': `url(${require('@/assets/images/signout_profile_img1.png')})`,
        }"
        to="/myPage"
      ></router-link>
    </div>
  </header>
  <div class="wrap">
    <!-- <button class="scan-btn" v-show="scanBtn.show"></button> -->
  </div>
  <MasnoryLayout />
</template>
<script lang="ts">
  import {
    defineComponent,
    onMounted,
    ref,
    getCurrentInstance,
    computed,
  } from "vue";
  import MasnoryLayout from "@/components/common/MasnoryLayout.vue";
  // 스캔버튼 스크롤 업/다운시 노출 및 숨겨짐 함수 :: S
  // const showScanBtn = () => {
  //   const scanBtn = reactive({
  //     show: true,
  //     lastScrollPosition: 0,
  //   });
  //   const onScroll = () => {
  //     if (scanBtn.lastScrollPosition <= window.scrollY) {
  //       scanBtn.show = false;
  //     } else {
  //       scanBtn.show = true;
  //     }
  //     scanBtn.lastScrollPosition = window.scrollY;
  //   };
  //   return { scanBtn, onScroll };
  // };
  // 스캔버튼 스크롤 업/다운시 노출 및 숨겨짐 함수 :: E

  export default defineComponent({
    name: "WorkFeed",
    components: {
      MasnoryLayout,
    },
    setup(props, context) {
      const globalProperties =
        getCurrentInstance()?.appContext.config.globalProperties;
      const axios = globalProperties?.axios;
      const apiUrl = globalProperties?.apiUrl;
      const store = globalProperties?.$store;
      const router = globalProperties?.$router;
      const getBase64 = globalProperties?.$getBase64;
      const userInfo = computed(() => store.state.userStore.userInfo);
      // const { scanBtn, onScroll } = showScanBtn();
      const alarm = ref(false);
      // 파일업로드 함수 :: S //
      const fileUpload = () => {
        const file = ref(null);
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
        return { file, fileUploadFunc };
      };
      console.log(userInfo.value);
      // 파일업로드 함수 :: E //
      const folderCreate = () => {
        axios.get("/folderCreate").then((result: any) => {
          console.log("파일결과:", result);
        });
      };
      onMounted(() => {
        // window.addEventListener("scroll", onScroll);
      });
      return {
        folderCreate,
        alarm,
        userInfo,
        router,
        ...fileUpload(),
      };
    },
  });
</script>
<style scoped lang="scss">
  #app {
    .masnory-wrap {
      margin-top: 16px;
    }
    header {
      position: sticky;
      top: 0;
      background: white;
      h2 {
        font-size: 24px;
        position: absolute;
        top: 0;
        left: 20px;
        bottom: 0;
        margin: auto;
        height: 34px;
      }
      .btn-wrap {
        position: absolute;
        top: 0;
        right: 20px;
        bottom: 0;
        margin: auto;
        height: 44px;
        a {
          vertical-align: middle;
          text-indent: 100%;
          white-space: nowrap;
          overflow: hidden;
        }
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
        .search-btn {
          margin: 0 10px;
          padding: 10px;
          width: 24px;
          height: 24px;
          background: url("~@/assets/images/search.png") no-repeat center / 24px
            24px;
        }
        .profile-btn {
          width: 30px;
          height: 30px;
          border-radius: 50px;
          background-repeat: no-repeat;
          background-position: center;
          background-size: 30px 30px;
        }
      }
    }
    .wrap {
      padding: 0 20px;
      .alarm-msg {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        box-sizing: border-box;
        font-size: 14px;
        padding: 19px 20px;
        color: white;
        background: rgba(13, 16, 26, 0.7);
      }
    }

    .scan-btn {
      position: fixed;
      left: 0;
      right: 0;
      bottom: 46px;
      margin: auto;
      width: 60px;
      height: 60px;
      background: url("~@/assets/images/scan_btn.png") no-repeat center / 60px
        60px;
    }
  }
</style>
