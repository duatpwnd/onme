<template>
  <BaseBottomModal v-show="menu" @close="menu = false">
    <template #button>
      <router-link :to="{ path: '/register', query: { id: route.query.id } }"
        >내용수정</router-link
      >
      <button class="delete-btn" @click="deleteModal = true">삭제</button>
    </template>
  </BaseBottomModal>
  <BaseModal
    v-show="deleteModal"
    emphasize="정말 삭제하시겠습니까?"
    contents="삭제된 작품은 복구되지 않습니다"
    :method="postDelete"
    @basemodal-close="
      () => {
        deleteModal = false;
      }
    "
  ></BaseModal>
  <div class="mask1" v-show="mask"></div>
  <div class="guide-modal" v-show="guideModal">
    <button
      class="close-btn"
      @click="
        guideModal = false;
        mask = false;
      "
    ></button>
    <img src="@/assets/images/guide_modal.png" />
  </div>
  <div class="background">
    <img
      :src="detailInfo.original_images[0]"
      class="representative-img"
      alt="대표이미지"
      title="대표이미지"
    />
    <div class="btn-wrap">
      <button
        class="menu-btn"
        v-if="userInfo.id == detailInfo.user"
        @click="menu = true"
      ></button>
      <button class="close-btn" @click="router.go(-1)"></button>
      <p class="toast-message" v-show="guideMessage != ''">
        {{ guideMessage }}
      </p>
    </div>
  </div>
  <div class="tag-list-wrap">
    <h2 class="title">{{ detailInfo.post_name }}</h2>
    <div class="tag-list">
      <span class="tag" v-for="(tag, index) in detailInfo.tags" :key="index"
        >#{{ tag }}</span
      >
    </div>
  </div>
  <!-- 유저 정보 :: S -->
  <div class="user-info">
    <div class="user-intro">
      <img
        src="@/assets/images/profile_img.png"
        alt="유저프로필"
        title="유저프로필"
      />
      <span class="user-name">{{ detailInfo.username }}</span>
    </div>
  </div>
  <!-- 유저 정보 :: E -->

  <!-- 저작물 사용 조건 :: S -->
  <article class="service-condition">
    <h2 class="h2-title">
      {{ detailInfo.is_usable ? "작품 사용 가이드" : "작품 사용금지" }}
    </h2>
    <button
      class="guide-btn"
      @click="
        guideModal = true;
        mask = true;
      "
    ></button>
    <p class="guide-message" v-show="detailInfo.is_usable == false">
      이 작품은 작가가 타인의 사용을 금지한 작품입니다.
    </p>
    <div v-if="detailInfo.post_copyrights != null">
      <span class="notice-ico" v-if="detailInfo.post_copyrights.is_copyright"
        >저작권표시</span
      >
      <span
        class="non-profit-ico"
        v-if="detailInfo.post_copyrights.is_no_profit"
        >비영리</span
      >
      <span class="no-change-ico" v-if="detailInfo.post_copyrights.is_no_change"
        >변경금지</span
      >
      <span
        class="change-permission-ico"
        v-if="detailInfo.post_copyrights.is_conditional_change"
        >변경금지</span
      >
    </div>
  </article>
  <!-- 저작물 사용 조건 :: E -->

  <!-- 저작물 가이드 :: S -->
  <!-- <article class="guide">
    <h2 class="h2-title">저작물 가이드</h2>
    <dl>
      <dt>저작권 표시</dt>
      <dd>
        저작물에 성명표시권을 행사한다는 의미. 이 저작물을 이용하려면 반드시
        저작자를 표기하여야 한다는 의미
      </dd>
      <dt>비영리</dt>
      <dd>저작물을 영리의 목적으로 쓰지말라는 의미.</dd>
      <dt>변경금지</dt>
      <dd>저작물을 새로운 2차 저작물로 변경하지 말아야한다.</dd>
      <dt>동일조건병경하락</dt>
      <dd>2차적인 변경을 허락하되, 원작물과 동일한 아이콘을 표기해야한다.</dd>
    </dl>
  </article> -->
  <!-- 저작물 가이드 :: E -->
  <div class="fixed-btn">
    <button
      class="copy-btn"
      v-clipboard:copy="url"
      v-clipboard:success="
        () => {
          toastModal('작품 출처 [URL]가 복사되었어요');
        }
      "
    >
      출처복사
    </button>
    <button class="download-btn" @click="download()">다운로드</button>
  </div>
</template>
<script lang="ts">
  import {
    defineComponent,
    ref,
    getCurrentInstance,
    reactive,
    toRefs,
    computed,
  } from "vue";
  import BaseBottomModal from "@/components/common/BaseBottomModal.vue";
  import BaseModal from "@/components/common/BaseModal.vue";
  export default defineComponent({
    name: "CopyRightWorksDetail",
    components: {
      BaseBottomModal,
      BaseModal,
    },
    setup() {
      console.log("setup호출");
      const globalProperties =
        getCurrentInstance()?.appContext.config.globalProperties;
      const axios = globalProperties?.axios;
      const apiUrl = globalProperties?.apiUrl;
      const route = globalProperties?.$route;
      const router = globalProperties?.$router;
      const store = globalProperties?.$store;
      const toDataURL = globalProperties?.$toDataURL;
      const userInfo = computed(() => store.state.userStore.userInfo);
      const url = window.document.location.href;
      const guideModal = ref(false);
      const menu = ref(false);
      const mask = ref(false);
      const deleteModal = ref(false);
      const guideMessage = ref("");
      let res = reactive({ detailInfo: {} as { [key: string]: any } });
      const toastModal = (message: string) => {
        guideMessage.value = message;
        const set = setTimeout(() => {
          guideMessage.value = "";
          clearTimeout(set);
        }, 1500);
      };
      const download = () => {
        axios
          .post(apiUrl.feedList + `/${route.query.id}/image_share/`)
          .then((result: any) => {
            axios
              .get(
                apiUrl.getBase64 +
                  `/${result.data.data.original_images_id}/base64`
              )
              .then((result: any) => {
                toastModal("작품을 사진 앨범에 다운로드했어요");
                let link = document.createElement("a");
                link.href = "data:image/jpeg;base64," + result.data.data;
                link.target = "_self";
                link.download = "NOPY";
                link.click();
              });
          });
      };
      const postDelete = () => {
        axios
          .delete(apiUrl.register + `/${route.query.id}`)
          .then((result: any) => {
            console.log("작품삭제 결과:", result.data.data);
            router.push("/");
          });
      };

      const getDetailList = (id: number) => {
        axios.get(apiUrl.feedList + `/${id}`).then((result: any) => {
          console.log("상세조회 결과:", result.data.data);
          res.detailInfo = result.data.data;
        });
      };
      getDetailList(route.query.id);
      const { detailInfo } = toRefs(res);
      return {
        menu,
        mask,
        res,
        detailInfo,
        url,
        guideModal,
        userInfo,
        route,
        router,
        guideMessage,
        deleteModal,
        download,
        toastModal,
        postDelete,
      };
    },
  });
</script>
<style scoped lang="scss">
  .mask1 {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1;
  }
  .guide-modal {
    position: fixed;
    bottom: 0;
    z-index: 2;
    width: 100%;
    img {
      width: 100%;
    }
    .close-btn {
      width: 100%;
      margin-bottom: 24px;
      height: 21px;
      background: url("~@/assets/images/close_btn.png") no-repeat center right
        24px / 21px 21px;
    }
  }
  .mask {
    button,
    a {
      font-weight: 400;
      width: 100%;
      text-align: center;
      font-size: 24px;
      display: block;
    }
    .delete-btn {
      margin-top: 40px;
    }
  }
  .background {
    position: relative;
    .representative-img {
      width: 100%;
    }
    .btn-wrap {
      position: absolute;
      z-index: 2;
      top: 56px;
      right: 0px;
      width: 100%;
      text-align: right;
      .menu-btn {
        width: 36px;
        height: 36px;
        margin-right: 24px;
        background: url("~@/assets/images/menu_btn1.png") no-repeat center /
          36px 36px;
      }
      .close-btn {
        width: 36px;
        height: 36px;
        margin-right: 20px;
        background: url("~@/assets/images/close_btn1.png") no-repeat center /
          36px 36px;
      }
      .toast-message {
        background: rgba(0, 0, 0, 0.5);
        color: white;
        font-size: 14px;
        width: 100%;
        padding: 19px 20px;
        box-sizing: border-box;
        text-align: left;
        margin-top: 12px;
      }
    }
  }
  .tag-list-wrap {
    padding: 20px;
    .tag-list {
      margin-top: 8px;
      .tag {
        margin-top: 8px;
        padding: 10px 8px;
        margin-right: 8px;
        color: #525a61;
        background: #f2f4f5;
        border: 1px solid #e6e8eb;
        border-radius: 5px;
        font-size: 12px;
        text-align: center;
      }
    }
  }
  .user-info {
    padding: 32px 20px;
    border-bottom: 1px solid #e6e8eb;
    border-top: 1px solid #e6e8eb;
    .user-intro {
      position: relative;
      .user-name {
        width: 185px;
        font-weight: 700;
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
  }
  .service-condition {
    padding-bottom: 144px;
    .guide-message {
      font-size: 14px;
      color: #79828a;
    }
    span {
      width: 50%;
      padding-left: 52px;
      box-sizing: border-box;
      position: relative;
      height: 36px;
      line-height: 36px;
      &:not(:first-child) {
        margin-top: 18px;
      }
      &::before {
        margin-right: 16px;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        margin: auto;
        height: 36px;
      }
    }
    .notice-ico {
      &::before {
        content: url("~@/assets/images/copyright_notice_ico.png");
      }
    }
    .no-change-ico {
      &::before {
        content: url("~@/assets/images/no_change_ico.png");
      }
    }
    .non-profit-ico {
      &::before {
        content: url("~@/assets/images/non_profit_ico.png");
      }
    }
    .change-permission-ico {
      &::before {
        content: url("~@/assets/images/change_permission_ico.png");
      }
    }
  }
  article {
    padding: 32px 20px;
    .h2-title {
      display: inline-block;
      vertical-align: 1px;
      font-size: 18px;
      margin-bottom: 6px;
    }
    .guide-btn {
      width: 16px;
      height: 16px;
      margin-left: 8px;
      background: url("~@/assets/images/guide_btn.png") no-repeat center / 16px
        16px;
    }
    dl {
      margin-top: 18px;
      dt {
        color: #303538;
        font-size: 14px;
        margin-left: 46px;
        &:not(:first-child) {
          margin-top: 18px;
        }
        &::before {
          position: absolute;
          left: 20px;
        }
      }
      dd {
        color: #79828a;
        font-size: 12px;
        margin-top: 4px;
        margin-left: 46px;
      }
    }
  }
  .guide {
    background: #f2f4f5;
    padding-bottom: 92px;
  }
  .fixed-btn {
    position: fixed;
    bottom: 0;
    width: 100%;
    button {
      color: white;
      padding: 19px 0px;
    }
    .copy-btn {
      background: #777777;
      width: 37%;
    }
    .download-btn {
      width: 63%;
      background: black;
    }
  }
</style>
