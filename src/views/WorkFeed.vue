<template>
  <div class="wrap">
    <div>
      <h2>작품피드</h2>
    </div>
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
  <button class="scan-btn" @scroll="test" v-show="scanBtn.show"></button>
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
