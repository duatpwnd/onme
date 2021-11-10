<template>
  <div class="mask" v-show="mask"></div>
  <BaseModal
    v-show="cancelModal"
    emphasize="등록을 취소하시겠습니까?"
    contents="입력하신 정보가 사라집니다"
    :method="cancel"
    @basemodal-close="
      () => {
        cancelModal = false;
      }
    "
  ></BaseModal>

  <div v-show="loading" class="loading-box">
    <h2 class="loading-title">NR코드 적용중</h2>
    <img
      src="@/assets/images/loading1.png"
      class="loading-ico"
      alt="loading"
      title="loading"
    />
    <div
      class="loading-background"
      :style="{
        'background-image': `url(${original_images[0]})`,
      }"
    ></div>
  </div>
  <div class="wrap">
    <header>
      <router-link to="/" class="back-btn">뒤로가기</router-link>
      <h1 class="header-title">작품 등록</h1>
      <button
        class="cancel-btn"
        v-if="isInputFocus == false"
        @click="cancelModal = true"
      >
        취소
      </button>
      <button
        class="confirm-btn"
        v-else
        @click="
          isInputFocus = false;
          mask = false;
        "
      >
        확인
      </button>
    </header>
    <img
      :src="original_images[0]"
      class="representative-img"
      alt="대표이미지"
      title="대표이미지"
    />
    <div :class="[{ active: isInputFocus }, 'tag']">
      <h2 class="title">태그</h2>
      <span class="selected-tag" v-for="(list, index) in tags" :key="index"
        >{{ "#" + list
        }}<span class="close-btn" @click="deleteTag(index)">X</span></span
      >
      <b class="prefix" v-show="tags.length < 5">#</b>
      <input
        type="text"
        placeholder="태그입력"
        class="tag-input"
        v-show="tags.length < 5"
        v-on:input="keyword = $event.target.value"
        :value="keyword"
        @focus="
          isInputFocus = true;
          mask = true;
        "
        @keyup="
          debounce(() => {
            tagList = [];
            search();
          })
        "
        @keyup.space="keySpace()"
      />
      <p class="guide-message" v-show="tags.length > 4">
        태그 최대 5개까지 입력가능
      </p>
      <!-- 태그 리스트 :: S -->
      <ul class="tag-wrap" ref="detector" v-show="isInputFocus">
        <li
          v-for="(list, index) in tagList"
          :key="index"
          class="tag-list"
          @click="selectTagFunc(list)"
        >
          <img src="@/assets/images/tag.png" alt="" title="" class="tag-img" />
          <div class="tag-info">
            <b class="tag-title"><b>#</b>{{ list.title }}</b>
            <span class="works">작품 {{ list.count_posts }}개</span>
          </div>
        </li>
        <div class="loading1" v-show="loading1">
          <img src="@/assets/images/paging_loading_ico1.png" />
        </div>
      </ul>
      <!-- 태그 리스트 :: E -->
    </div>
    <div class="title-input">
      <input type="text" v-model="post_name" />
    </div>
    <div class="is-open">
      <h2 class="title">공개여부</h2>
      <BaseSwitcherButton
        v-model="is_public"
        :value="is_public ? '함께보기' : '나만보기'"
        :fieldId="is_public ? 'together' : 'onlyme'"
      />
    </div>
    <div class="license">
      <h2 class="title">타인사용허가</h2>
      <BaseSwitcherButton
        v-model="is_usable"
        :value="is_usable ? '허용' : '금지'"
        :fieldId="is_usable ? 'allow' : 'prohibit'"
      />
    </div>
    <div class="condition-set" v-show="is_usable">
      <h2 class="title">사용조건 설정</h2>
      <BaseCheckBox
        v-model="conditionSet"
        value="is_copyright"
        fieldId="저작권 표기"
      />
      <BaseCheckBox
        v-model="conditionSet"
        value="is_no_profit"
        fieldId="비영리"
      />
      <BaseCheckBox
        v-model="conditionSet"
        value="is_no_change"
        fieldId="변경금지"
      />
      <BaseCheckBox
        v-model="conditionSet"
        value="is_conditional_change"
        fieldId="동일조건 변경허락"
      />
    </div>
    <!-- <div class="certificate">
      <h2 class="title">저작권 인증서</h2>
      <div class="btn-area">
        <button
          :class="[{ active: activeBtn }, 'issued-btn']"
          @click="activeBtn = true"
        >
          발급
        </button>
        <button
          :class="[{ active: activeBtn == false }, 'unissued-btn']"
          @click="activeBtn = false"
        >
          미발급
        </button>
      </div>
    </div> -->
    <button
      class="protect-btn"
      @click="route.query.id != undefined ? modify() : register()"
    >
      작품 보호 시작
    </button>
  </div>
</template>
<script lang="ts">
  import {
    defineComponent,
    reactive,
    ref,
    getCurrentInstance,
    computed,
    toRefs,
    onMounted,
  } from "vue";
  import BaseSwitcherButton from "@/components/common/BaseSwitcherButton.vue";
  import BaseCheckBox from "@/components/common/BaseCheckBox.vue";
  import BaseModal from "@/components/common/BaseModal.vue";
  export default defineComponent({
    components: { BaseCheckBox, BaseSwitcherButton, BaseModal },
    setup() {
      const globalProperties =
        getCurrentInstance()?.appContext.config.globalProperties;
      const axios = globalProperties?.axios;
      const apiUrl = globalProperties?.apiUrl;
      const router = globalProperties?.$router;
      const route = globalProperties?.$route;
      const debounce = globalProperties?.$debounce();
      const scrollDetect = globalProperties?.$scrollDetect;
      const detector = ref(null);
      const page = ref(1);
      const isLastPage = ref(false);
      const isInputFocus = ref(false);
      const loading = ref(false);
      const loading1 = ref(false);
      const cancelModal = ref(false);
      const mask = ref(false);
      const arr = [
        "is_copyright",
        "is_no_profit",
        "is_no_change",
        "is_conditional_change",
      ];
      const conditionSet = ref<string[]>(["is_copyright"]); // 사용조건 설정
      const reducer = () => {
        return arr.reduce((acc: any, cur, index) => {
          if (conditionSet.value.indexOf(arr[index]) < 0) {
            acc[cur] = false;
          } else {
            acc[cur] = true;
          }
          return acc;
        }, {});
      };
      // 태그 검색 :: S
      let keyword = ref("");
      const tagSearch = () => {
        const tagList = ref<{ [key: string]: any }[]>([]);
        // 선택된 태그 제거
        const deleteTag = (index: number) => {
          reactiveData.tags.splice(index, 1);
        };
        // 검색 초기화 함수
        const searchInitialize = () => {
          keyword.value = "";
          tagList.value = [];
        };
        const selectTagFunc = (tag: { [key: string]: any }) => {
          console.log("태그선택함수호출", tag);
          const index = reactiveData.tags.filter(
            (el: string) => el == tag.title
          );
          if (index.length == 0) {
            reactiveData.tags.push(tag.title);
          }
          searchInitialize();
        };
        const keySpace = () => {
          if (keyword.value.trim().length != 0) {
            const index = reactiveData.tags.filter(
              (el: string) => el == keyword.value.trim()
            );
            if (index.length == 0) {
              reactiveData.tags.push(keyword.value.trim());
            }
            searchInitialize();
          }
        };
        const search = () => {
          console.log("서치함수호출");
          isLastPage.value = false;
          loading1.value = true;
          axios
            .get(apiUrl.tagSearch, {
              params: {
                page: page.value,
                page_size: 20,
                search: keyword.value,
              },
            })
            .then((result: { [key: string]: any }) => {
              console.log("태그검색결과:", result.data.data);
              tagList.value.push(...result.data.data);
              loading1.value = false;
            })
            .catch((err: any) => {
              console.log("태그마지막페이지다", err);
              isLastPage.value = true;
              loading1.value = false;
              page.value = 1;
            });
        };
        return {
          tagList,
          search,
          selectTagFunc,
          deleteTag,
          keySpace,
        };
      };
      const { tagList, search, selectTagFunc, deleteTag, keySpace } =
        tagSearch();
      // 태그 검색 :: E
      interface Type {
        [index: string]: any;
        post_name: string;
        is_usable: boolean;
        is_public: boolean;
        original_images?: string[];
        tags: string[];
        post_copyrights: { [key: string]: any }[] | null;
      }
      let reactiveData: Type = reactive({
        post_name: "제목 입력",
        is_usable: true,
        is_public: true,
        original_images: [localStorage.getItem("base64") as string],
        tags: ref([]),
        post_copyrights: computed(() =>
          reactiveData.is_usable
            ? reducer()
            : {
                is_copyright: false,
                is_no_profit: false,
                is_no_change: false,
                is_conditional_change: false,
              }
        ),
      });
      const cancel = () => {
        router.go(-1);
      };
      // 작품수정링크 타고왔을경우 :: S
      const getDetailList = (id: number) => {
        axios
          .get(apiUrl.feedList + `/${id}`)
          .then((result: { [key: string]: any }) => {
            console.log("작품상세조회 결과:", result.data.data);
            Object.keys(reactiveData).forEach((property) => {
              reactiveData[property] = result.data.data[property];
            });
            console.log(reactiveData);
          });
      };
      // 작품수정링크 타고왔을경우 :: E
      const modify = () => {
        loading.value = true;
        mask.value = true;
        delete reactiveData["original_images"];
        axios
          .patch(apiUrl.register + `/${route.query.id}`, reactiveData)
          .then((result: any) => {
            console.log("작품수정결과:", result);
            loading.value = false;
            mask.value = false;
            router.push("/");
          });
      };
      const register = () => {
        loading.value = true;
        mask.value = true;
        axios.post(apiUrl.register, reactiveData).then((result: any) => {
          loading.value = false;
          mask.value = false;
          router.push("/");
        });
      };
      onMounted(() => {
        if (route.query.id != undefined) {
          getDetailList(route.query.id);
        }
        scrollDetect(detector.value, () => {
          if (isLastPage.value == false) {
            page.value += 1;
            search();
          }
        });
      });
      return {
        mask,
        detector,
        loading,
        loading1,
        debounce,
        keyword,
        conditionSet,
        route,
        cancelModal,
        tagList,
        isInputFocus,
        search,
        selectTagFunc,
        deleteTag,
        keySpace,
        cancel,
        modify,
        register,
        ...toRefs(reactiveData),
      };
    },
  });
</script>
<style scoped lang="scss">
  #app {
    .mask {
      position: fixed;
      top: 60px;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      z-index: 2;
      max-width: 435px;
    }
    .loading-box {
      text-align: center;
      .loading-title {
        font-size: 17px;
        line-height: 60px;
        height: 60px;
        text-align: center;
        position: fixed;
        top: 0;
        z-index: 1;
        width: 100%;
        max-width: 435px;
        background: white;
      }
      .loading-background,
      .loading-ico {
        position: fixed;
        top: 60px;
        max-width: 435px;
        width: 100%;
        height: 100%;
        z-index: 1;
      }
      .loading-background {
        background-repeat: no-repeat;
        background-size: 100% 100%;
        background-color: white;
      }
      .loading-ico {
        position: relative;
        z-index: 3;
        width: 198px;
        height: 174px;
        top: calc(50vh - 60px);
      }
    }
    .wrap {
      header {
        text-align: center;
        .back-btn {
          left: 20px;
        }
        .cancel-btn,
        .confirm-btn {
          position: absolute;
          top: 0;
          right: 20px;
          bottom: 0;
          margin: auto;
        }
      }
      .representative-img {
        width: 100%;
        max-height: 750px;
      }
      .tag,
      .license,
      .is-open,
      .condition-set,
      .title-input,
      .certificate {
        padding: 32px 20px;
        border-bottom: 1px solid #f2f4f5;
        .title {
          font-size: 16px;
        }
      }
      .tag {
        .selected-tag {
          margin-top: 14px;
          margin-right: 12px;
          color: #525a61;
          .close-btn {
            margin-left: 4px;
            color: white;
            font-weight: bold;
            background: #b8bfc4;
            border-radius: 50px;
            width: 16px;
            text-align: center;
            height: 16px;
            line-height: 18px;
            font-size: 10px;
            vertical-align: 1px;
          }
        }
        .prefix {
          display: inline-block;
          width: 12px;
        }
        .tag-input {
          border: 0;
          margin-left: 2px;
        }
        .guide-message {
          position: absolute;
          bottom: -40px;
          color: white;
        }
        .tag-wrap {
          margin-top: 30px;
          max-height: 324px;
          overflow-y: auto;
          .tag-list {
            &:not(:first-child) {
              margin-top: 16px;
            }
            .tag-info {
              display: inline-block;
              vertical-align: middle;
              width: calc(100% - 85px);
              .tag-title {
                display: -webkit-box;
                -webkit-line-clamp: 1;
                -webkit-box-orient: vertical;
                text-overflow: ellipsis;
                overflow: hidden;
                word-break: break-all;
                word-wrap: break-word;
              }
              .works {
                display: block;
                font-size: 12px;
                color: #79828a;
                margin-top: 4px;
              }
            }
            .tag-img {
              margin-right: 16px;
            }
          }
          .loading1 {
            position: absolute;
            bottom: 32px;
            text-align: center;
            width: 100%;
          }
        }
      }
      .active {
        position: absolute;
        top: 60px;
        background: white;
        width: 100%;
        box-sizing: border-box;
        z-index: 10;
        max-width: 435px;
      }
      .title-input {
        input {
          width: 100%;
          border: 0;
        }
      }
      .is-open,
      .license {
        position: relative;
        :deep .switch-btn {
          position: absolute;
          top: 0;
          right: 20px;
          bottom: 0;
          margin: auto;
          height: 32px;
          .field-id {
            color: #9ea7ad;
          }
        }
      }
      .condition-set {
        .base-checkbox {
          width: 50%;
          margin-top: 24px;
        }
      }
      .certificate {
        .btn-area {
          margin-top: 24px;
          &:after {
            display: block;
            content: "";
            clear: both;
          }
          button {
            width: 48.5%;
            font-size: 14px;
            color: #79828a;
            border-radius: 4px;
            border: 1px solid #dbdfe1;
            padding: 13px 0;
          }
          .issued-btn {
            float: left;
          }
          .unissued-btn {
            float: right;
          }
          .active {
            border: 1px solid #111111;
            color: #303538;
          }
        }
      }
      .protect-btn {
        margin-top: 188px;
        background: black;
        color: white;
        font-size: 18px;
        width: 100%;
        text-align: center;
        padding: 18px 0;
      }
    }
  }
</style>
