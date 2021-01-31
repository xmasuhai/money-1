<template>
  <div class="numpad">
    <div class="output">{{ output || '0' }}</div>
    <div class="buttons">
      <button @touchstart="inputContent">1</button>
      <button @touchstart="inputContent">2</button>
      <button @touchstart="inputContent">3</button>
      <button @touchstart="removeContent">删除</button>
      <button @touchstart="inputContent">4</button>
      <button @touchstart="inputContent">5</button>
      <button @touchstart="inputContent">6</button>
      <button @touchstart="clearContent">清空</button>
      <button @touchstart="inputContent">7</button>
      <button @touchstart="inputContent">8</button>
      <button @touchstart="inputContent">9</button>
      <button @touchstart="confirmContent" class="ok">OK</button>
      <button @touchstart="inputContent" class="zero">0</button>
      <button @touchstart="inputContent">.</button>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';

@Component
export default class Numpad extends Vue {
  @Prop() readonly value!: number;
  output = this.value.toString();

  inputContent(event: MouseEvent) {
    const button = (event.target as HTMLButtonElement);
    const input = button.textContent as string;
    // 显示的数字长短限制
    if (this.output.length >= 11) {
      alert('别做白日梦啦');
      return;
    }
    // '0'开头的逻辑
    if (this.output === '0') {
      if ('0123456789'.indexOf(input) >= 0) {
        this.output = input;
      } else { // '.'的逻辑
        // 按数字位数 拼接 字符串
        this.output += input;
      }
      return;
    }
    // '.'开头的逻辑
    const dotIndex = this.output.indexOf('.');
    if (dotIndex >= 0) {
      // '.'重复判断
      if (input === '.') {return;}
      // '.'限制小数位 2位
      if (this.output.slice(dotIndex, -1).length > 1) {return;}
    }
    this.output += input;
  }

  removeContent() {
    this.output = this.output.slice(0, -1);
    if (this.output === '') {
      this.output = '0';
    }
  }

  clearContent() {
    this.output = '0';
  }

  confirmContent() {
    // confirm save to Tags
    this.$emit('update:value', this.output);
    this.$emit('submit', this.output);
    // recover
    this.output = '0';
  }
}
</script>
<style lang="scss" scoped>
@import "~@/assets/style/global.scss";
.numpad {
  .output {
    @extend %innerShadow;
    font-size: 36px;
    font-family: Consolas, monospace;
    padding: 9px 16px;
    text-align: right;
    }
  .buttons {
    @extend %clearFix;
    > button {
      width: 25%;
      height: 64px;
      float: left;
      background: transparent;
      border: none;
      &.ok {
        height: (64px) * 2;
        float: right;
        }
      &.zero {
        width: 25 * 2%;
        }
      $bg: #f2f2f2;
      &:nth-child(1) {
        background: $bg;
        }
      &:nth-child(2),
      &:nth-child(5) {
        background: darken($bg, 5%);
        }
      &:nth-child(3),
      &:nth-child(6),
      &:nth-child(9) {
        background: darken($bg, 5 * 2%);
        }
      &:nth-child(4),
      &:nth-child(7),
      &:nth-child(10) {
        background: darken($bg, 5 * 3%);
        }
      &:nth-child(8),
      &:nth-child(11),
      &:nth-child(13) {
        background: darken($bg, 5 * 4%);
        }
      &:nth-child(14) {
        background: darken($bg, 5 * 5%);
        }
      &:nth-child(12) {
        background: darken($bg, 5 * 6%);
        }
      }
    }
  }
</style>