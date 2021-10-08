<template>
  <div class="progress_bar">
    <strong class="percent">{{ value }}</strong>
    <progress max="100" :value="value"></progress>
  </div>
</template>
<script lang="ts">
  import { defineComponent, onMounted, getCurrentInstance } from "vue";
  export default defineComponent({
    name: "BaseProgressBar",
    props: {
      value: {
        type: Number,
        required: true,
      },
    },
    setup() {
      console.log("setup호출");
      onMounted(() => {
        console.log("onmounted호출");
      });
    },
  });
</script>
<style scoped lang="scss">
  .progress_bar {
    width: 100%;
    height: 60px;
    position: relative;
    vertical-align: middle;
    display: inline-block;
    .percent {
      color: white;
      height: 18px;
      line-height: 18px;
      text-align: center;
      font-size: 15px;
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      top: 0;
      margin: auto;
      z-index: 2;
    }
    progress {
      position: absolute;
      width: 100%;
      top: 0;
      left: 0;
      border-radius: 1px;
      overflow: hidden;
      height: 100%;
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      border: none;
    }
    progress::-webkit-progress-value {
      background: #111111;
    }
    progress::-moz-progress-bar {
      background: #111111;
    }
    progress::-webkit-progress-bar {
      background: white;
    }
  }
</style>
