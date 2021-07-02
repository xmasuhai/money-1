<template>
  <div class="content" ref="content"></div>
</template>

<script lang="ts">
import {Component, Prop, Watch, Vue} from 'vue-property-decorator';
import echart, {EChartOption, ECharts} from 'echarts';

@Component
export default class Chart extends Vue {
  name = 'Chart';
  chart?: ECharts;

  @Prop() options?: EChartOption;

  @Watch('options', {immediate: true, deep: true})
  onOptionChange(newOption: EChartOption) {
    if (this.chart) {
      this.chart.setOption(newOption);
    }
  }

  initChart() {
    // 挂载时 必须先初始化 echart
    // 挂载先于@Watch('options') 监听变化，即使用了 immediate 参数
    if (this.options === undefined) {
      return console.error('options is empty');
    }
    this.chart = echart.init(this.$refs.content as HTMLDivElement);
    this.chart.setOption(this.options);
  }

  mounted() {
    this.initChart();
  }


}
</script>
