<template>
  <div class="numpad">
    <div class="output">{{ localOutput || '0' }}</div>
    <div class="buttons" @mousemove="showSearchlight" :style="searchlightStyle">
      <numpad-button
          v-for="(item, index) in numPadText"
          @[clientEvent].native="handleButtonFn($event, item.bundleEvent)"
          @selectBtn="checkBtn(index)"
          :button-index="index"
          :curIndex="curIndex"
          :key="item.id"
          :class="{ok: item.id === 'ok', zero: item.id === 'zero'}"
          :button-text="item.text">
        <Icon v-if="['num', 'dot'].indexOf(item.name) === -1" :name="item.id"/>
      </numpad-button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';
import NumpadButton from '@/components/Money/numpad/NumpadButton.vue';

@Component({
  components: {NumpadButton}
})
export default class Numpad extends Vue {
  curIndex = 0;
  @Prop(Number) readonly amount!: number;
  @Prop(Boolean) readonly isReset!: boolean;

  eventName = 'click';
  output = this.amount.toString() || '0';

  checkBtn(index) {
    console.log(index);
    this.curIndex = index;
  }

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
  showLocalAmount = true;

  get localOutput() {
    // 分别 存 整数部分(integer part) 和小数部分(decimal part)
    const outPutInteger = Math.trunc(Number(this.output)).toString();
    const [outPutDecimal = '.00'] = this.output.match(/\.\d{1,2}/g) || '';
    return outPutInteger
        .replace(/(\d)(?=(?:\d{4})+$)/g, '$1,') + outPutDecimal;
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
    if ((this.output.replace(/\.\d{1,2}/g, '')).length >= 10) {
      alert('你的小目标金额超过喵内记账记录范围');
      return this.removeNum(event, -3);
    }
    return this.output += input;
  }

  inputNum(event: TapEvent) {
    const button = event.target as HTMLButtonElement;
    const input = button.textContent?.trim() as string;
    if (input === '.') {
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
      background: radial-gradient(circle at var(--x-pos) var(--y-pos), #bbb, transparent 100px);
      }
    }
  }
</style>
