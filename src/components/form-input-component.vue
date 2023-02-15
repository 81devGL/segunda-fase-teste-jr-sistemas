<template>
  <div class="form-group">
    <div class="">
      <label for="">{{ label }}</label>
      <input
        type="text"
        class="form-control"
        @input="handleInput"
        :value="vModelValue"
        v-mask="mask"
        :placeholder="label"
      />
      <span class="help-block" v-show="hasError">{{ error }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import VueMask from "v-mask";
Vue.use(VueMask);

export default Vue.extend({
  props: {
    value: {
      type: String,
    },
    label: {
      type: String,
      default() {
        return "";
      },
    },
    error: {
      type: String,
      default() {
        return "";
      },
    },
    placeholder: {
      type: String,
      default() {
        return "";
      },
    },
    mask: {
      type: String,
    },
  },
  data() {
    return {
      vModelValue: "",
    };
  },
  created() {
    this.vModelValue = this.value;
  },
  watch: {
    value() {
      this.vModelValue = this.value;
    },
  },
  methods: {
    handleInput(event: any) {
      this.$emit("input", event.target.value);
    },
  },
  computed: {
    hasError(): boolean {
      return this.error ? true : false;
    },
  },
});
</script>

import Vue from "vue"
