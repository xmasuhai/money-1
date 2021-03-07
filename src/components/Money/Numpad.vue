<template>
  <div class="numpad">
    <div class="output">{{ output || '0' }}</div>
    <div class="buttons" @mousemove="showMask">
      <button @touchstart="inputNum">1</button>
      <button @touchstart="inputNum">2</button>
      <button @touchstart="inputNum">3</button>
      <button @touchstart="removeNum">删除</button>
      <button @touchstart="inputNum">4</button>
      <button @touchstart="inputNum">5</button>
      <button @touchstart="inputNum">6</button>
      <button @touchstart="clearNum">清空</button>
      <button @touchstart="inputNum">7</button>
      <button @touchstart="inputNum">8</button>
      <button @touchstart="inputNum">9</button>
      <button @touchstart="confirmNum" class="ok">OK</button>
      <button @touchstart="inputNum" class="zero">0</button>
      <button @touchstart="inputNum">.</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';

@Component
export default class Numpad extends Vue {
  @Prop(Number) readonly amount!: number;

  output = this.amount.toString()

  inputNum(event: TouchEvent) {
    const button = (event.target as HTMLButtonElement);
    const input = button.textContent as string;
    // 显示的数字长短限制
    if (this.output.length >= 15) {
      alert('别做白日梦啦');
      this.removeNum(event, -3);
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

  removeNum(event: TouchEvent, number = -1) {
    this.output = this.output.slice(0, number);
    if (this.output === '') {
      this.clearNum();
    }
  }

  clearNum() {
    this.output = '0';
  }

  confirmNum() {
    const number = parseFloat(this.output);
    this.$emit('update:amount', number);
    this.$emit('submit');
    // inform Parent saveRecord
    this.output = '0';
    this.$emit('update:deselectTags', true);
  }

  getParent(curEl: HTMLButtonElement, parentEl: HTMLElement) {
    while (curEl !== parentEl) {
      curEl = curEl.parentElement as HTMLButtonElement;
    }
    return curEl;
  }

  showMask(e: MouseEvent) {
    let elem = e.target as HTMLButtonElement;
    const wrapper = document.querySelector('.buttons');
    if (e.target && elem !== wrapper) {
      elem = this.getParent(e.target as HTMLButtonElement, wrapper as HTMLElement);
    }
    const x = e.clientX - elem.offsetLeft;
    const y = e.clientY - elem.offsetTop;

    document.documentElement.style.setProperty('--x-pos', x + 'px');
    document.documentElement.style.setProperty('--y-pos', y + 'px');
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/global.scss";
.numpad {
  .output {
    @extend %inner-shadow;
    font-size: 36px;
    font-family: Consolas, monospace;
    padding: 9px 16px;
    text-align: right;
    }
  .buttons {
    display: grid;
    grid-template: repeat(4, 1fr) / repeat(4, 1fr);
    padding: 1px;
    grid-gap: 1px;
    height: 256px;
    overflow: hidden;
    justify-items: stretch;
    align-items: stretch;
    &:hover {
      background: radial-gradient(circle at var(--x-pos) var(--y-pos), #aaa, transparent 100px);
      }
    > button {
      width: 100%;
      height: 100%;
      background: transparent;
      border: 2px solid transparent;
      transition: border-color .25s;
      &:hover {
        border-color: #ccc;
        }
      &:last-child {
        grid-column: 2/4;
        grid-row: 4/5;
        }
      &.ok {
        grid-column: 4/5;
        grid-row: 3/5;
        }
      &.zero {
        grid-column: 1/2;
        grid-row: 4/5;
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