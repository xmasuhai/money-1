<template>
  <div class="output">
    {{ localOutput }}
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';

@Component
export default class NumpadOutput extends Vue {
  @Prop() output!: string;

  // computed // 格式化显示金额逻辑
  get localOutput() {
    // 分别 存 整数部分(integer part) 和小数部分(decimal part)
    const outPutInteger = Math.trunc(Number(this.output)).toString();
    const [outPutDecimal = '.00'] = this.output.match(/\.\d{1,2}/g) || '';
    return `¥ ${outPutInteger.replace(/(\d)(?=(?:\d{4})+$)/g, '$1,')} ${outPutDecimal}`;
  }

  renderSessionMoneyOutput() {
    this.$emit('update:output', this.$store.state.moneySessionStore.moneyStore);
  }

  mounted() {
    this.renderSessionMoneyOutput();
  }

}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/global.scss";

.output {
  @extend %inner-shadow;
  font-size: 36px;
  font-family: Consolas, monospace;
  padding: 9px 16px;
  text-align: right;
}
</style>
