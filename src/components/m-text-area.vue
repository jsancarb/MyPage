<template>
  <div class="container">
    <textarea
      ref="input"
      v-model="localValue"
      placeholder=" "
      :type="type"
      class="input"
      cols="1"
      rows="3"
      maxlength="120"
      :required="required"
    ></textarea>
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
    required: Boolean
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
  padding: 35px 50px 2px 50px;
  height: 100px;
  font-size: 1.2em;
  width: 100%;
  resize: none;
  overflow: hidden;
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
  transform: translate(-15px, -50px) scale(0.75);
}
</style>
