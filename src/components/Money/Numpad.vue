<template>
  <div class="numpad">
    <div class="output">{{ localOutput || '0' }}</div>
    <div class="buttons" @mousemove="showSearchlight" :style="searchlightStyle">
      <button v-for="(item, index) in numPadText"
              :data-index="index"
              :key="item.id"
              @[clientEvent]="handleButtonFn($event, item.bundleEvent)"
              :class="{ok: item.id === 'ok', zero: item.id === 'zero' }">{{ item.text }}
        <Icon v-if="['num', 'dot'].indexOf(item.name) === -1" :name="item.id"/>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';

@Component
export default class Numpad extends Vue {

  @Prop(Number) readonly amount!: number;
  @Prop(Boolean) readonly isReset!: boolean;

  eventName = 'click';
  output = this.amount.toString() || '0';

  get clientEvent() {
    if (document.documentElement.clientWidth > 500) {
      this.eventName = 'click';
    } else {
      this.eventName = 'touchstart';
    }
    return this.eventName;
  }

  // TODO 待优化重构 使用事件代理
  numPadText = [
    {id: '1', text: '1', name: 'num', bundleEvent: 'inputNum'},
    {id: '2', text: '2', name: 'num', bundleEvent: 'inputNum'},
    {id: '3', text: '3', name: 'num', bundleEvent: 'inputNum'},
    {id: 'delete', text: '', name: 'delete', bundleEvent: 'removeNum'},
    {id: '4', text: '4', name: 'num', bundleEvent: 'inputNum'},
    {id: '5', text: '5', name: 'num', bundleEvent: 'inputNum'},
    {id: '6', text: '6', name: 'num', bundleEvent: 'inputNum'},
    {id: 'clear', text: '', name: 'clear', bundleEvent: 'clearNum'},
    {id: '7', text: '7', name: 'num', bundleEvent: 'inputNum'},
    {id: '8', text: '8', name: 'num', bundleEvent: 'inputNum'},
    {id: '9', text: '9', name: 'num', bundleEvent: 'inputNum'},
    {id: 'ok', text: '', name: 'ok', bundleEvent: 'confirmNum'},
    {id: 'zero', text: '0', name: 'num', bundleEvent: 'inputNum'},
    {id: 'dot', text: '.', name: 'dot', bundleEvent: 'inputNum'},
  ];

  handleButtonFn(e: TapEvent, bundleEvent: string) {
    this[bundleEvent as BundleEventString](e);
  }

  // 实时显示 金额
  // TODO 当输入小数点 时 也显示万分位
  showLocalAmount = true;
  get localOutput() {
    // 分别 存 整数部分(integer part) 和小数部分(decimal part)
    const outPutInteger = Math.trunc(Number(this.output)).toString();
    const [outPutDecimal = '.00'] = this.output.match(/\.\d{2}/g) || '';
    const localAmount = outPutInteger
        .replace(/(\d)(?=(?:\d{4})+$)/g, '$1,') + outPutDecimal;
    return this.showLocalAmount ? localAmount : this.output;
  }

  checkInputNum(button: HTMLButtonElement, input: string, event: TapEvent) {
    // '0'开头的逻辑
    if (['0'].indexOf(this.output) !== -1) {
      // 输入不含'.' 的数字 1234567890
      if ('0123456789'.indexOf(input) >= 0) {
        return this.output = input;
      } else {
        // 输入 '.' 字符 '0.'
        return this.output += input;
      }
    }
    // '.'的逻辑
    const dotIndex = this.output.indexOf('.');
    // 存在'.'的情况 // 特殊 '0.'  不存在单独'.'
    if (dotIndex >= 0) {
      this.showLocalAmount = false;
      // '.' 判断重复输入
      if (input === '.') {return;}
      // 判断字符 为 '.'开头
      if (dotIndex === 0) {return this.output = '0.';}
      // '.'限制小数位 2位
      if (this.output.slice(dotIndex, -1).length > 1) {return;}
    } else {
      this.showLocalAmount = true;
    }
    // 限制显示数字长度
    if (this.output.length >= 11) {
      alert('你的小目标金额超过喵内记账记录范围');
      return this.removeNum(event, -3);
    }
    return this.output += input;
  }

  inputNum(event: TapEvent) {
    const button = event.target as HTMLButtonElement;
    const input = button.textContent?.trim() as string;
    if(input === '.') {
      this.showLocalAmount = false;
    }
    this.checkInputNum(button, input, event);
  }

  removeNum(event: TapEvent, number = -1) {
    this.showLocalAmount = false;
    this.output = this.output.slice(0, number);
    if (this.output === '') {
      this.clearNum();
    }
    return this.output;
  }

  clearNum() {
    this.showLocalAmount = true;
    return this.output = '0';
  }

  confirmNum() {
    this.showLocalAmount = true;
    const number = parseFloat(this.output);
    if (number === 0) {
      this.$emit('checkZero');
      this.output = '0';
      return;
    }
    this.$emit('update:amount', number);
    this.$emit('submit');
    this.$nextTick(() => {
      this.reset();
    });
  }

  reset() {
    if (this.isReset) {
      this.output = '0';
      this.$emit('update:deselectTags', true);
    }
    this.$emit('update:deselectTags', false);
  }

  getParent(curEl: HTMLButtonElement, parentEl: HTMLElement) {
    while (curEl !== parentEl) {
      curEl = curEl.parentElement as HTMLButtonElement;
    }
    return curEl;
  }

  searchlightPosition = {
    x: 0,
    y: 0
  };

  get searchlightStyle() {
    return {
      '--x-pos': this.searchlightPosition.x + 'px',
      '--y-pos': this.searchlightPosition.y + 'px',
    };
  }

  showSearchlight(e: MouseEvent) {
    let elem = e.target as HTMLButtonElement;
    const wrapper = document.querySelector('.buttons');
    if (e.target && elem !== wrapper) {
      elem = this.getParent(e.target as HTMLButtonElement, wrapper as HTMLElement);
    }
    this.searchlightPosition.x = e.clientX - elem.offsetLeft;
    this.searchlightPosition.y = e.clientY - elem.offsetTop;
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
      > .icon {
        width: 32px;
        height: 32px;
        }
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
