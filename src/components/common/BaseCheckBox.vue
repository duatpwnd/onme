<template>
  <span class="base-checkbox">
    <label class="container-checkbox">
      <input
        v-if="value == 'all'"
        :id="value"
        type="checkbox"
        :checked="allChecked"
        @click="allCheck()"
      />
      <input
        v-else
        :id="value"
        @input="checkFunc()"
        type="checkbox"
        :checked="checked"
      />
      <span class="checkmark"></span>
    </label>
    <label :for="value" class="field-id">{{ fieldId }}</label>
  </span>
</template>
<script lang="ts">
  import { defineComponent, computed, ref } from "vue";
  export default defineComponent({
    name: "BaseCheckBox",
    props: {
      allChecked: {
        type: Boolean,
      },
      modelValue: {
        type: Array,
      },
      value: {
        type: String,
      },
      fieldId: {
        type: String,
      },
    },
    setup(props: { [key: string]: any }, context) {
      const checked = computed(() => props.modelValue.includes(props.value));
      const allCheck = () => {
        context.emit("all-check", !props.allChecked);
      };
      const checkFunc = () => {
        console.log(checked.value, props.modelValue);

        const updatedValue = props.modelValue;
        if (checked.value) {
          const index = updatedValue.indexOf(props.value);
          updatedValue.splice(index, 1);
        } else {
          updatedValue.push(props.value);
        }
        context.emit("update:modelValue", updatedValue);
      };
      return { checked, checkFunc, allCheck };
    },
  });
</script>
<style scoped lang="scss">
  .container-checkbox {
    margin-right: 12px;
    .checkmark {
      vertical-align: middle;
    }
  }
  input {
    display: none;
  }
  input[type="checkbox"] + .checkmark {
    width: 20px;
    height: 20px;
    display: inline-block;
    border-radius: 4px;

    background: url("~@/assets/images/check_ico.png") #ccc no-repeat center /
      12px 9px;
  }
  input[type="checkbox"]:checked + .checkmark {
    background: url("~@/assets/images/check_ico.png") black no-repeat center /
      12px 9px;
  }
</style>
