<template>
  <span class="switch-btn">
    <label class="field-id" :for="fieldId">{{ value }}</label>
    <label class="switch">
      <input
        type="checkbox"
        :checked="modelValue"
        :id="fieldId"
        @click="$emit('update:modelValue', !modelValue)"
      />
      <span class="slider round"></span>
    </label>
  </span>
</template>
<script lang="ts">
  import { defineComponent, onMounted } from "vue";
  export default defineComponent({
    name: "BaseSwitcherButton",
    props: {
      modelValue: {
        type: Boolean,
        required: true,
      },
      value: {
        type: String,
        required: true,
      },
      fieldId: {
        type: String,
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
  .switch-btn {
    .field-id {
      vertical-align: middle;
    }
    .switch {
      position: relative;
      display: inline-block;
      width: 52px;
      height: 32px;
      overflow: hidden;
      border-radius: 34px;
      vertical-align: middle;
      margin-left: 12px;
      .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        -webkit-transition: 0.4s;
        transition: 0.4s;
        background: #ccc;
      }
      .slider.round {
        border-radius: 34px;
      }
      .slider.round:before {
        border-radius: 50%;
      }
      .slider:before {
        position: absolute;
        content: "";
        height: 24px;
        width: 24px;
        left: 4px;
        top: 0;
        bottom: 0;
        margin: auto;
        background: white;
        -webkit-transition: 0.4s;
        transition: 0.4s;
        box-shadow: 1px 1px 1px 0px rgba(0, 0, 0, 0.4);
      }
      input {
        display: none;
      }
      input:checked + .slider {
        background: black;
      }
      input:checked + .slider::before {
        background-color: white;
        -webkit-transform: translateX(52px);
        -ms-transform: translateX(52px);
        transform: translateX(20px);
        box-shadow: 1px 1px 1px 0px rgba(0, 0, 0, 0.4);
      }
    }
  }
</style>
