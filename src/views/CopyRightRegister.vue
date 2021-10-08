<template>
  <main>
    <img
      src="@/assets/images/register_img.png"
      class="representative-img"
      alt="대표이미지"
      title="대표이미지"
    />
    <div class="tag">
      <h2 class="title">태그</h2>
      <b class="prefix">#</b>
      <span v-for="(list, index) in selectedTag" :key="index">{{
        list.title
      }}</span>
      <input
        type="text"
        placeholder="태그입력"
        class="tag-input"
        v-on:input="keyword = $event.target.value"
        :value="keyword"
        @keyup="search()"
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
    <div class="is-open">
      <h2 class="title">공개여부</h2>
      <BaseSwitcherButton v-model="open" value="공개" fieldId="공개" />
    </div>
    <div class="license">
      <h2 class="title">타인사용허가</h2>
      <BaseSwitcherButton v-model="license" value="허용" fieldId="허용" />
    </div>
    <div class="condition-set" v-show="license">
      <h2 class="title">사용조건 설정</h2>
      <BaseCheckBox
        v-model="conditionSet"
        value="저작권 표기"
        fieldId="저작권표기"
      />
      <BaseCheckBox v-model="conditionSet" value="비영리" fieldId="비영리" />
      <BaseCheckBox
        v-model="conditionSet"
        value="변경금지"
        fieldId="변경금지"
      />
      <BaseCheckBox
        v-model="conditionSet"
        value="동일조건 변경허락"
        fieldId="동일조건 변경허락"
      />
    </div>
    <div class="certificate">
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
    </div>
    <button class="protect-btn">저작권 보호 시작</button>
  </main>
</template>
<script lang="ts">
  import {
    defineComponent,
    onMounted,
    reactive,
    ref,
    getCurrentInstance,
  } from "vue";
  import BaseSwitcherButton from "@/components/common/BaseSwitcherButton.vue";
  import BaseCheckBox from "@/components/common/BaseCheckBox.vue";
  const instance = getCurrentInstance();
  const axios = instance?.appContext.config.globalProperties.axios;
  // 태그 검색 :: S
  const tagSearch = () => {
    let keyword = ref("");
    // 선택된 태그
    let selectedTag = ref<{ [key: string]: any }[]>([]);
    // api로부터 조회된 태그 리스트
    let tagList = ref<{ [key: string]: any }[]>([]);
    // 선택된 태그 제거
    const deleteTag = (id: number) => {
      console.log("태그제거함수호출");
      const findId: { [key: string]: any } = selectedTag.value.find(
        (item: { [key: string]: any }) => {
          return item.id === id;
        }
      ) as { [key: string]: any };
      const idx = selectedTag.value.indexOf(findId);
      const result = selectedTag.value.splice(idx, 1);
    };
    const selectTagFunc = (tag: { [key: string]: any }) => {
      console.log("태그선택함수호출", tag);
      selectedTag.value.push(tag);
      keyword.value = "";
      console.log(selectedTag.value, keyword.value);
    };
    const search = () => {
      console.log("서치함수호출");
      tagList.value = [
        {
          title: "일러스트",
          id: 1,
          works: "1,000",
        },
        {
          title: "일러",
          id: 2,
          works: "1,100",
        },
        {
          title: "일러스",
          id: 3,
          works: "1,200",
        },
      ];
      // axios.post("", "").then((result: { [key: string]: any }) => {
      //   console.log(result);
      //   tagList.value = result.data;
      // });
    };
    return { keyword, tagList, selectedTag, search, selectTagFunc, deleteTag };
  };
  // 태그 검색 :: E
  export default defineComponent({
    components: { BaseCheckBox, BaseSwitcherButton },
    setup() {
      console.log("setup");
      const conditionSet = ref<string[]>([]); // 사용조건 설정
      const open = ref(true); // 공개 여부
      const license = ref(true); // 타인사용허가 여부
      const activeBtn = ref(true); // 발급/미발급 여부
      return {
        open,
        license,
        activeBtn,
        conditionSet,
        ...tagSearch(),
      };
    },
  });
</script>
<style scoped lang="scss">
  main {
    .representative-img {
      width: 100%;
    }
    .tag,
    .license,
    .is-open,
    .condition-set,
    .certificate {
      padding: 32px 20px;
      border-bottom: 1px solid #f2f4f5;
      .title {
        font-size: 16px;
      }
    }
    .tag {
      .title {
        margin-bottom: 14px;
      }
      .prefix {
        display: inline-block;
        width: 12px;
      }
      .tag-input {
        width: calc(100% - 12px);
        border: 0;
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
      background: black;
      color: white;
      font-size: 18px;
      width: 100%;
      text-align: center;
      padding: 18px 0;
    }
  }
</style>
