<template>
  <section class="numpad">
    <numpad-output :output="output"
                   @update:output="getSessionOutput"/>
    <div class="buttons"
         @[clientEvent]="markButton($event); handleButtonFn($event)"
         @mousemove="showSearchlight"
         :style="searchlightCoordinate">
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
  </section>
</template>

<script lang="ts">
import {Component} from 'vue-property-decorator';
import {mixins} from 'vue-class-component';
import NumpadButton from '@/components/Money/numpad/NumpadButton.vue';
import SearchLight from '@/mixins/searchLight.ts';
import OperateNumpad from '@/mixins/operateNumpad.ts';
import NumpadOutput from '@/components/Money/numpad/NumpadOutput.vue';
import getClientType from '@/lib/getClientWidth.ts';

@Component({
  components: {NumpadOutput, NumpadButton}
})
export default class Numpad extends mixins(SearchLight, OperateNumpad) {
  // 默认当前初始下标
  currentIndex = -1;
  // 默认绑定事件
  eventName = 'click';
  // 客户端设备信息
  clientType = getClientType();
  // 数字键盘文字图标数据 0~9 delete ok clear
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

  // 返回当前选中按钮的下标
  markButton(e: UIEvent) {
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
  get clientEvent(): string {
    if (this.clientType === 'PC') {
      this.eventName = 'click';
    } else if (this.clientType === 'mobile') {
      this.eventName = 'touchstart';
    }
    return this.eventName;
  }

  // 给不同的按钮绑定对应事件的处理函数
  // 事件代理
  handleButtonFn(e: TapEvent) {
    let target = e.target as HTMLElement;
    // 获取 按钮 节点
    while (!target.matches('button')) {
      // 非按钮  则获取 父节点
      target = target.parentNode as HTMLElement;
    }
    const bundleEvent = target.dataset.bundleEvent;
    this[bundleEvent as BundleEventString](e);
  }

  getSessionOutput(output: string) {
    this.output = output.toString();
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
