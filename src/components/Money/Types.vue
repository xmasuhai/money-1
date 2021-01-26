<template>
  <div class="div_types">
    <ul class="types">
      <li :class="type === '-' && 'selected'" @click="selectType('-')">支出</li>
      <li :class="type === '+' && 'selected'" @click="selectType('+')">收入</li>
    </ul>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';

@Component
export default class Types extends Vue {
  // initial data
  type = '-'; // '-' 表示支出， '+'表示收入

  // 使用非官方 vue-property-decorator 的装饰器 @Props
  // Prop 告诉 Vue xxx 不是 data 而是 prop
  // Number 告诉 Vue xxx 运行时是个 Number
  // number | undefined 告诉 TS xxx 编译时的类型
  @Prop(Number) readonly xxx: number | undefined;

  // method
  selectType(type: string) { // type 中能是 “-” 或 “+”，否则报错
    if (type !== '-' && type !== '+') {
      throw new Error('type is unknown');
    }
    this.type = type;
  }
  mounted() {
    if(this.xxx === undefined) {
      console.log('没有xxx')
    }else {
      console.log(this.xxx.toString())
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~@/assets/style/global.scss";
.types {
  background: #c4c4c4;
  display: flex;
  text-align: center;
  > li {
    font-size: 24px;
    width: 50%;
    height: 64px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    &.selected {
      background: #c4c4c4;
      &::after {
        content: "";
        display: block;
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 4px;
        background: #333;
        }
      }
    }
  }
</style>