<template>
  <img
    src="@/assets/images/example.png"
    class="representative-img"
    alt="대표이미지"
    title="대표이미지"
  />
  <!-- 유저 정보 :: S -->
  <div class="user-info">
    <div class="user-intro">
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
    <div class="tag-list">
      <span class="tag">#일러스트</span>
      <span class="tag">#파인아트</span>
      <span class="tag">#북아트</span>
      <span class="tag">#일러스트4</span>
      <span class="tag">#일러스트5</span>
      <span class="tag">#일러스트트트트트트트</span>
    </div>
  </div>
  <!-- 유저 정보 :: E -->

  <!-- 저작물 사용 조건 :: S -->
  <article class="service-condition">
    <h2 class="h2-title">저작물 사용조건</h2>
    <span>저작권표시</span>
    <span>비영리</span>
    <span>변경금지</span>
  </article>
  <!-- 저작물 사용 조건 :: E -->

  <!-- 저작물 가이드 :: S -->
  <article class="guide">
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
  </article>
  <!-- 저작물 가이드 :: E -->
  <div class="fixed-btn">
    <button class="copy-btn">출처복사</button>
    <button class="download-btn">다운로드</button>
  </div>
</template>
<script lang="ts">
  import { defineComponent, onMounted } from "vue";
  export default defineComponent({
    name: "CopyRightWorksDetail",
    setup() {
      console.log("setup호출");
      onMounted(() => {
        console.log("onmounted호출");
      });
    },
  });
</script>
<style scoped lang="scss">
  .representative-img {
    width: 100%;
  }
  .user-info {
    padding: 32px 20px;
    border-bottom: 1px solid #e6e8eb;
    .user-intro {
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
    .tag-list {
      margin-top: 8px;
      .tag {
        margin-top: 8px;
        padding: 10px 8px;
        margin-right: 8px;
        color: white;
        background: black;
        border-radius: 5px;
        font-size: 12px;
        text-align: center;
      }
    }
  }
  .service-condition {
    span {
      width: 50%;
      &:not(:first-child) {
        margin-top: 18px;
      }
      &::before {
        content: url("~@/assets/images/list_ico1.png");
        margin-right: 16px;
        vertical-align: middle;
      }
    }
  }
  article {
    padding: 32px 20px;
    .h2-title {
      font-size: 18px;
      margin-bottom: 6px;
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
          content: url("~@/assets/images/list_ico2.png");
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
