<template>
  <div class="output">
    {{ localOutput }}
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';

@Component
export default class NumpadOutput extends Vue {
  @Prop() output!: string;

  // computed // 格式化显示金额逻辑
  get localOutput() {
    // 分别 存 整数部分(integer part) 和小数部分(decimal part)
    const outPutInteger = Math.trunc(Number(this.output)).toString();
    const [outPutDecimal = '.00'] = this.output.match(/\.\d{1,2}/g) || '';
    return `¥ ${outPutInteger.replace(/(\d)(?=(?:\d{4})+$)/g, '$1,')}${outPutDecimal}`;
  }

  renderSessionMoneyOutput() {
    this.$emit('update:output', this.$store.state.moneySessionStore.amountStore);
  }

  mounted() {
    // 读取session信息 渲染页面
    this.renderSessionMoneyOutput();
  }

}
</script>

<style lang="scss" scoped>
@import '~@/assets/style/global.scss';

.output {
  @extend %inner-shadow;
  font-size: 1.5em;
  font-family: Consolas, monospace;
  padding: .5em 1.2em;
  text-align: right;
}
</style>
