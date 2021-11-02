<template>
  <div class="mask">
    <div class="modal">
      <div class="close-area">
        <button class="close-btn" @click="close()"></button>
      </div>
      <div class="btn-wrap">
        <slot name="button"></slot>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import {
    defineComponent,
    onMounted,
    reactive,
    ref,
    getCurrentInstance,
  } from "vue";
  export default defineComponent({
    name: "BaseBottomModal",
    setup(props, context) {
      console.log("setup호출");
      const close = () => {
        context.emit("close", true);
      };
      return { close };
    },
  });
</script>
<style scoped lang="scss">
  .mask {
    position: fixed;
    z-index: 2;
    top: 0;
    height: 100%;
    max-width: 435px;
    width: 100%;
    background: rgba(0, 0, 0, 0.6);
    .modal {
      position: absolute;
      bottom: 0;
      max-width: 435px;
      width: 100%;
      .close-area {
        text-align: right;
        padding-right: 24px;
        padding-bottom: 24px;
        .close-btn {
          width: 21px;
          height: 21px;
          background: url("~@/assets/images/close_btn.png") no-repeat center /
            21px 21px;
        }
      }
      .btn-wrap {
        background: white;
        padding: 70px 0;
      }
    }
  }
</style>
