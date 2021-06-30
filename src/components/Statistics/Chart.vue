<template>
  <div class="content" ref="content">
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop, Watch} from 'vue-property-decorator';
import echart, {EChartOption, ECharts} from 'echarts';

@Component
export default class Chart extends Vue {
  name = 'Chart';
  chart?: ECharts;

  @Prop() options?: EChartOption;

  @Watch('options', {deep: true})
  onOptionChange(newOption: EChartOption) {
    if (this.chart) {
      this.chart.setOption(newOption);
    }
  }

  mounted() {
    // 挂载时 必须先初始化 echart 先于@Watch('options') 监听变化
    if (this.options === undefined) {
      return console.error('options is empty');
    }
    if (this.chart) {
      this.chart = echart.init(this.$refs.content as HTMLDivElement);
      this.chart.setOption(this.options);
    }
  }

}
</script>

<style lang="scss" scoped>
.content {
  margin: 0 auto;
}
</style>
