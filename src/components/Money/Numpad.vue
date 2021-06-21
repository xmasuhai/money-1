<template>
  <div class="numpad">
    <numpad-output :output="output"
    ></numpad-output>
    <div class="buttons"
         @[clientEvent]="checkBtn($event); handleButtonFn($event)"
         @mousemove="showSearchlight"
         :style="searchlightStyle">
      <numpad-button
        v-for="(item, index) in numPadText"
        :data-bundle-event="item.bundleEvent"
        :button-index="index"
        :currentIndex="currentIndex"
        :key="item.id"
        :class="{ok: item.id === 'ok', zero: item.id === 'zero'}"
        :button-text="item.text">
        <Icon v-if="['num', 'dot'].indexOf(item.name) === -1"
              :name="item.id"/>
      </numpad-button>
    </div>
  </div>
</template>

<script lang="ts">
import {Component} from 'vue-property-decorator';
import NumpadButton from '@/components/Money/numpad/NumpadButton.vue';
import {mixins} from 'vue-class-component';
import SearchLight from '@/mixins/searchLight';
import OperateNumpad from '@/mixins/operateNumpad';
import NumpadOutput from '@/components/Money/numpad/NumpadOutput.vue';

@Component({
  components: {NumpadOutput, NumpadButton}
})
export default class Numpad extends mixins(SearchLight, OperateNumpad) {
  // 默认当前初始下标
  currentIndex = -1;
  // 默认绑定事件
  eventName = 'click';

  // 返回当前选中按钮的下标
  checkBtn(e: UIEvent) {
    const target = e.target as HTMLElement;
    const className = target.className;
    const index = parseInt(target.dataset.index || '-1', 10);
    if (index !== -1) {
      if (className === 'basic-btn' || className.includes('zero')) {
        this.currentIndex = index;
      }
    }
  }

  // 判断客户端尺寸 返回对应的事件类型
  get clientEvent() {
    if (document.documentElement.clientWidth > 500) {
      this.eventName = 'click';
    } else {
      this.eventName = 'touchstart';
    }
    return this.eventName;
  }

  // 给不同的按钮绑定对应事件的处理函数
  handleButtonFn(e: TapEvent) {
    let target = e.target as HTMLElement;
    while (!target.matches('button')) {
      // 向外寻找父节点
      target = target.parentNode as HTMLElement;
    }
    const bundleEvent = target.dataset.bundleEvent;
    this[bundleEvent as BundleEventString](e);
  }

  // 数字键盘文字图标数据
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

  // 格式化显示金额逻辑
  get localOutput() {
    // 分别 存 整数部分(integer part) 和小数部分(decimal part)
    const outPutInteger = Math.trunc(Number(this.output)).toString();
    const [outPutDecimal = '.00'] = this.output.match(/\.\d{1,2}/g) || '';
    return '¥ ' + outPutInteger
      .replace(/(\d)(?=(?:\d{4})+$)/g, '$1,') + outPutDecimal;
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
