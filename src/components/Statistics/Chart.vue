<template>
  <div class="content" ref="content">
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';
import echart, {EChartOption} from 'echarts';

@Component
export default class Chart extends Vue {
  name = 'Chart';
  @Prop() options?: EChartOption;

  mounted() {
    if (this.options === undefined) {
      return console.error('options is empty');
    }
    const chart = echart.init(this.$refs.content as HTMLDivElement);
    chart.setOption(this.options);
  }
}
</script>

<style lang="scss" scoped>
.content {
  margin: 0 auto;
}
</style>
