<template>
  <div class="wrap">
    <header>
      <h2>작품피드</h2>
      <div class="btn-wrap">
        <router-link class="add-btn" to="/register">추가</router-link>
        <router-link class="search-btn" to="/">찾기</router-link>
        <router-link class="profile-btn" to="/">프로필</router-link>
      </div>
    </header>
    <div class="feed">
      <div class="left-feed">
        <img src="@/assets/images/feed1.png" />
        <img src="@/assets/images/feed5.png" />
      </div>
      <div class="right-feed">
        <img src="@/assets/images/feed2.png" />
        <img src="@/assets/images/feed3.png" />
        <img src="@/assets/images/feed4.png" />
      </div>
    </div>
  </div>
  <router-link
    class="scan-btn"
    @scroll="test"
    v-show="scanBtn.show"
  ></router-link>
</template>
<script lang="ts">
  import { defineComponent, onMounted, reactive } from "vue";
  // 스캔버튼 스크롤 업/다운시 노출 및 숨겨짐 함수 :: S
  const showScanBtn = () => {
    const scanBtn = reactive({
      show: true,
      lastScrollPosition: 0,
    });
    const onScroll = () => {
      console.log(scanBtn.lastScrollPosition);

      if (scanBtn.lastScrollPosition <= window.scrollY) {
        scanBtn.show = false;
      } else {
        scanBtn.show = true;
      }
      scanBtn.lastScrollPosition = window.scrollY;
    };
    return { scanBtn, onScroll };
  };
  // 스캔버튼 스크롤 업/다운시 노출 및 숨겨짐 함수 :: E
  export default defineComponent({
    name: "HelloWorld",
    setup() {
      const { scanBtn, onScroll } = showScanBtn();

      onMounted(() => {
        window.addEventListener("scroll", onScroll);
      });
      return { scanBtn };
    },
  });
</script>
<style scoped lang="scss">
  .wrap {
    padding: 40px 20px;
    header {
      position: relative;
      .btn-wrap {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        height: 34px;
        a {
          vertical-align: middle;
          text-indent: 100%;
          white-space: nowrap;
          overflow: hidden;
        }
        .add-btn {
          background: url("~@/assets/images/Vector.png") no-repeat center / 20px
            20px;
        }
        .search-btn {
          margin: 0 20px;
          background: url("~@/assets/images/search.png") no-repeat center / 24px
            24px;
        }
        .profile-btn {
          background: url("~@/assets/images/my.png") no-repeat center / 30px
            30px;
          height: 30px;
        }
      }
    }
    .feed {
      &:after {
        display: block;
        content: "";
        clear: both;
      }
      div {
        width: 48.5%;
        vertical-align: top;
        img {
          width: 100%;
          margin-top: 20px;
        }
      }
      .left-feed {
        float: left;
      }
      .right-feed {
        float: right;
      }
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
</style>
