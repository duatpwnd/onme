<template>
  <label class="container-checkbox">
    <input
      :id="fieldId"
      @input="checkFunc()"
      type="checkbox"
      :checked="checked"
    />
    <span class="checkmark"></span>
  </label>
  <label :for="fieldId">{{ value }}</label>
</template>
<script lang="ts">
  import { defineComponent, computed, ref } from "vue";
  export default defineComponent({
    name: "BaseCheckBox",
    props: {
      modelValue: {
        type: Array,
        required: true,
      },
      value: {
        type: String,
      },
      fieldId: {
        type: String,
        required: true,
      },
    },
    setup(props: { [key: string]: any }, context) {
      const checked = computed(() => props.modelValue.includes(props.value));
      const checkFunc = () => {
        const updatedValue = props.modelValue;
        if (checked.value) {
          const index = updatedValue.indexOf(props.value);
          updatedValue.splice(index, 1);
        } else {
          updatedValue.push(props.value);
        }
        context.emit("update:modelValue", updatedValue);
      };
      return { checked, checkFunc };
    },
  });
</script>
<style scoped lang="scss">
  input {
    display: none;
  }
  input[type="checkbox"] + .checkmark {
    width: 20px;
    height: 20px;
    display: inline-block;
    background: url("~@/assets/images/check_ico.png") #ccc no-repeat center /
      12px 9px;
  }
  input[type="checkbox"]:checked + .checkmark {
    background: url("~@/assets/images/check_ico.png") black no-repeat center /
      12px 9px;
  }
</style>
