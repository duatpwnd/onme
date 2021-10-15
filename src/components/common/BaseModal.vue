<template>
  <div class="mask">
    <div class="modal">
      <p class="contents">
        <strong>{{ emphasize }}</strong
        ><br />{{ contents }}
      </p>
      <button class="cancel-btn" @click="cancel()">취소</button>
      <button class="ok-btn" @click="method()">확인</button>
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent, onMounted, getCurrentInstance } from "vue";
  import { useStore } from "vuex";
  export default defineComponent({
    name: "BaseModal",
    props: {
      method: {
        type: Function,
      },
      emphasize: {
        type: String,
      },
      contents: {
        type: String,
      },
    },
    setup(props, context) {
      console.log("setup호출");
      const globalProperties =
        getCurrentInstance()?.appContext.config.globalProperties;
      const cancel = () => {
        context.emit("basemodal-close", true);
      };
      onMounted(() => {
        console.log("onmounted호출");
      });
      return { cancel };
    },
  });
</script>
<style scoped lang="scss">
  .mask {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 2;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    .modal {
      background: white;
      position: fixed;
      width: 90%;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      .contents {
        font-size: 18px;
        text-align: center;
        padding: 34px 0;
        line-height: 40px;
      }
      button {
        color: white;
        font-size: 400;
        width: 50%;
        padding: 18px 0;
      }
      .cancel-btn {
        background: #79828a;
      }
      .ok-btn {
        background: black;
      }
    }
  }
</style>
