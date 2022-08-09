<template>
  <div class="container">
    <input
      ref="input"
      v-model="localValue"
      placeholder=" "
      :type="type"
      class="input"
      :required="required"
      :pattern="pattern"
    />
    <label class="label" @click="$refs.input.focus()">{{ label }}</label>
  </div>
</template>

<script>
import { computed } from "vue";
export default {
  name: "mInput",
  props: {
    type: String,
    modelValue: String,
    label: String,
    required: Boolean,
    pattern: String
  },
  setup(props, context) {
    const localValue = computed({
      get() {
        return props.modelValue;
      },
      set(val) {
        context.emit("update:modelValue", val);
      },
    });
    return {
      localValue,
    };
  },
};
</script>

<style lang="scss" scoped>
.container {
  position: relative;
}
.input {
  box-sizing: border-box;
  border-radius: 5px;
  border: 1px solid black;
  background-color: white;
  padding: 10px 20px 5px 20px;
  height: 45px;
  font-size: 1.2em;
  width: 100%;
}
.label {
  color: black;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 50px;
  transition: all 0.2s ease-in;
}
.input:focus ~ .label,
.input:not(:placeholder-shown) ~ .label {
  transform: translate(-15px, -25px) scale(0.75);
}
</style>
