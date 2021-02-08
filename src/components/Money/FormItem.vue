<template>
  <div class="div_notes">
    <label class="notes">
      <span class="name">{{this.fieldName}}</span>
      <input type="text"
             v-model="inputValue"
             :placeholder="this.placeholder"/>
    </label>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import {Component, Prop, Watch} from 'vue-property-decorator';

@Component
export default class FormItem extends Vue {
  inputValue = '';
  @Prop({required: true}) fieldName!: string;
  @Prop({default: ''}) placeholder?: string;

  @Watch('inputValue')
  oninputValueChanged(newValue: string) {
    this.$emit('update:value', newValue)
  }
}
</script>
<style lang="scss" scoped>
@import "~@/assets/style/global.scss";
.notes {
  background: #f5f5f5;
  display: flex;
  align-items: center;
  font-size: 14px;
  padding-left: 16px;
  .name {
    padding-right: 16px;
    }
  input {
    height: 73px;
    flex-grow: 1;
    background: transparent;
    padding-right: 16px;
    }
  }
</style>