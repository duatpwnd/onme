<template>
  <div class="wrap">
    <header>
      <router-link to="/" class="back-btn">뒤로가기</router-link>
      <h1 class="header-title">작품 등록</h1>
      <button class="cancel-btn" v-show="isInputFocus">취소</button>
    </header>
    <img
      src="@/assets/images/register_img.png"
      class="representative-img"
      alt="대표이미지"
      title="대표이미지"
    />
    <div :class="[{ active: isInputFocus }, 'tag']">
      <h2 class="title">태그</h2>
      <span
        class="selected-tag"
        v-for="(list, index) in selectedTag"
        :key="index"
        >{{ "#" + list.title
        }}<span class="close-btn" @click="deleteTag(index)">X</span></span
      >
      <b class="prefix">#</b>
      <input
        type="text"
        placeholder="태그입력"
        class="tag-input"
        v-on:input="keyword = $event.target.value"
        :value="keyword"
        @focus="isInputFocus = true"
        @blur="isInputFocus = false"
        @keyup="
          debounce(() => {
            search();
          })
        "
        @keyup.space="keySpace()"
      />
      <!-- 태그 리스트 :: S -->
      <ul class="tag-wrap" v-if="tagList.length > 0">
        <li
          v-for="(list, index) in tagList"
          :key="index"
          class="tag-list"
          @click="selectTagFunc(list)"
        >
          <img
            src="@/assets/images/tag_img.png"
            alt=""
            title=""
            class="tag-img"
          />
          <div class="tag-info">
            <b class="tag-title"><b>#</b>{{ list.title }}</b>
            <span class="works">저작물 {{ list.works }}</span>
          </div>
        </li>
      </ul>
      <!-- 태그 리스트 :: E -->
    </div>
    <div class="title-input">
      <input type="text" v-model="post_name" placeholder="제목 입력" />
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
    <button class="protect-btn" @click="register()">작품 보호 시작</button>
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
  } from "vue";
  import BaseSwitcherButton from "@/components/common/BaseSwitcherButton.vue";
  import BaseCheckBox from "@/components/common/BaseCheckBox.vue";

  export default defineComponent({
    components: { BaseCheckBox, BaseSwitcherButton },
    setup() {
      interface Type {
        post_name: string;
        is_usable: boolean;
        is_public: boolean;
        original_images: string[];
        tags: { [key: string]: any }[];
        post_copyrights: { [key: string]: any }[] | null;
      }
      const globalProperties =
        getCurrentInstance()?.appContext.config.globalProperties;
      const axios = globalProperties?.axios;
      const apiUrl = globalProperties?.apiUrl;
      const debounce = globalProperties?.$debounce();
      const isInputFocus = ref(false);
      const arr = [
        "is_copyright",
        "is_no_profit",
        "is_no_change",
        "is_conditional_change",
      ];
      const conditionSet = ref<string[]>([]); // 사용조건 설정
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
      let selectedTag = ref<{ [key: string]: any }[]>([]); // 선택된 태그
      const tagSearch = () => {
        // 선택된 태그 제거
        const deleteTag = (index: number) => {
          selectedTag.value.splice(index, 1);
        };
        // 검색 초기화 함수
        const tagList = ref<{ [key: string]: any }[]>([]);
        const searchInitialize = () => {
          keyword.value = "";
          tagList.value = [];
        };
        const selectTagFunc = (tag: { [key: string]: any }) => {
          console.log("태그선택함수호출", tag);
          const index = selectedTag.value.filter((el) => el.title == tag.title);
          if (index.length == 0) {
            selectedTag.value.push(tag);
          }
          searchInitialize();
        };
        const keySpace = () => {
          if (keyword.value.trim().length != 0) {
            const index = selectedTag.value.filter(
              (el) => el.title == keyword.value.trim()
            );
            if (index.length == 0) {
              selectedTag.value.push({ title: keyword.value.trim() });
            }
            searchInitialize();
          }
        };
        const search = () => {
          console.log("서치함수호출", keyword.value.trim().length);
          if (keyword.value.trim().length != 0) {
            axios
              .get(apiUrl.tagSearch, {
                params: {
                  search: keyword.value,
                },
              })
              .then((result: { [key: string]: any }) => {
                console.log("태그검색결과:", result);
                tagList.value = result.data.data;
              });
          } else {
            tagList.value = [];
          }
        };
        return {
          keyword,
          tagList,
          debounce,
          selectedTag,
          isInputFocus,
          search,
          selectTagFunc,
          deleteTag,
          keySpace,
        };
      };
      // 태그 검색 :: E

      const reactiveData: Type = reactive({
        post_name: "",
        is_usable: true,
        is_public: true,
        original_images: ref([
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAEwSURBVHgBrZW9bYUwEMeP9yIBDR8LoAxA4dSwAQswAhJNRkjLACC6NAwQUVBHCOqkYIAEFjAlFfFZeU3k0+O9+C9ZBzr7J9/5fDZAyPO8R2FeDcNg+As3at/3N2GeOeffBsIE6OMe0B9xAWZny7IuO/uvLDGY4fv+DvrET6BX3mFgmqbQtu3VeYeArutCVVUwjuPVuWQOHceBLMsgCAKYpklacYrSV9c1LMuiBD4AobIsIUkSpU+UGuR5Dod3GIYh9H2vXLCuKzDGpFVJmUPMGSUEUTASSOUHhbmMoug24DzPMAwDuahpGjIKsmyKoqBc0HUdGfbZtu0XleMSdhzHsv6wdEzTlBZPeNs2JVD3XZYhc9AoBH6CJmGj1d5gT6Jtf4mPp982fhdIjHeE4RPwA8S4ekNPvo/3AAAAAElFTkSuQmCC",
        ]),
        tags: computed(() => selectedTag.value.map((el) => el.title)),
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
      const register = () => {
        console.log({
          post_name: reactiveData.post_name,
          is_usable: reactiveData.is_usable,
          is_public: reactiveData.is_public,
          original_images: [
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAEwSURBVHgBrZW9bYUwEMeP9yIBDR8LoAxA4dSwAQswAhJNRkjLACC6NAwQUVBHCOqkYIAEFjAlFfFZeU3k0+O9+C9ZBzr7J9/5fDZAyPO8R2FeDcNg+As3at/3N2GeOeffBsIE6OMe0B9xAWZny7IuO/uvLDGY4fv+DvrET6BX3mFgmqbQtu3VeYeArutCVVUwjuPVuWQOHceBLMsgCAKYpklacYrSV9c1LMuiBD4AobIsIUkSpU+UGuR5Dod3GIYh9H2vXLCuKzDGpFVJmUPMGSUEUTASSOUHhbmMoug24DzPMAwDuahpGjIKsmyKoqBc0HUdGfbZtu0XleMSdhzHsv6wdEzTlBZPeNs2JVD3XZYhc9AoBH6CJmGj1d5gT6Jtf4mPp982fhdIjHeE4RPwA8S4ekNPvo/3AAAAAElFTkSuQmCC",
          ],
          tags: reactiveData.tags,
          post_copyrights: reactiveData.post_copyrights,
        });
        axios
          .post(apiUrl.register, {
            post_name: reactiveData.post_name,
            is_usable: reactiveData.is_usable,
            is_public: reactiveData.is_public,
            original_images: [
              "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAEwSURBVHgBrZW9bYUwEMeP9yIBDR8LoAxA4dSwAQswAhJNRkjLACC6NAwQUVBHCOqkYIAEFjAlFfFZeU3k0+O9+C9ZBzr7J9/5fDZAyPO8R2FeDcNg+As3at/3N2GeOeffBsIE6OMe0B9xAWZny7IuO/uvLDGY4fv+DvrET6BX3mFgmqbQtu3VeYeArutCVVUwjuPVuWQOHceBLMsgCAKYpklacYrSV9c1LMuiBD4AobIsIUkSpU+UGuR5Dod3GIYh9H2vXLCuKzDGpFVJmUPMGSUEUTASSOUHhbmMoug24DzPMAwDuahpGjIKsmyKoqBc0HUdGfbZtu0XleMSdhzHsv6wdEzTlBZPeNs2JVD3XZYhc9AoBH6CJmGj1d5gT6Jtf4mPp982fhdIjHeE4RPwA8S4ekNPvo/3AAAAAElFTkSuQmCC",
            ],
            tags: reactiveData.tags,
            post_copyrights: reactiveData.post_copyrights,
          })
          .then((result: any) => {
            console.log("작품등록결과:", result);
          });
      };
      return {
        conditionSet,
        ...toRefs(reactiveData),
        ...tagSearch(),
        register,
      };
    },
  });
</script>
<style scoped lang="scss">
  .wrap {
    header {
      text-align: center;
      .back-btn {
        left: 20px;
      }
      .cancel-btn {
        position: absolute;
        top: 0;
        right: 20px;
        bottom: 0;
        margin: auto;
      }
    }
    .representative-img {
      width: 100%;
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
        margin-right: 5px;
        background: #f2f4f5;
        border-radius: 4px;
        padding: 8px 10px;
        border: 1px solid #e6e8eb;
        .close-btn {
          margin-left: 3px;
          color: #3a3434;
          font-weight: bold;
          background: #a19b9b;
          border-radius: 50px;
          width: 20px;
          text-align: center;
          height: 20px;
          line-height: 22px;
          font-size: 12px;
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
      .tag-wrap {
        .tag-list {
          margin-top: 16px;
          .tag-info {
            display: inline-block;
            vertical-align: middle;
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
      }
    }
    .active {
      position: fixed;
      top: 60px;
      left: 0;
      background: white;
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      z-index: 10;
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
      ::v-deep .switch-btn {
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
</style>
