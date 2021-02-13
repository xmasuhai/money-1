<template>
  <div class="form-wrapper">
    <label class="form-item">
      <span class="name">{{ fieldName }}</span>
      <input type="text"
             :value="inputValue"
             @input="oninputValueChanged($event.target.value)"
             :placeholder="placeholder"/>
    </label>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';

@Component
export default class FormItem extends Vue {
  @Prop({default: ''}) inputValue!: string;
  @Prop({required: true}) fieldName!: string;
  @Prop({default: ''}) placeholder?: string;

  // @Watch('inputValue')
  oninputValueChanged(newValue: string) {
    this.$emit('update:inputValue', newValue);
  }
}
</script>
<style lang="scss" scoped>
@import "~@/assets/style/global.scss";

.form-wrapper {
  background: transparent;
  .form-item {
    align-items: center;
    display: flex;
    font-size: 14px;
    padding-left: 16px;
    .name {
      padding-right: 16px;
      }
    input {
      height: 40px;
      flex-grow: 1;
      background: transparent;
      padding-right: 16px;
      }
    }
  }
</style>
