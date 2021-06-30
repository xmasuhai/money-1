<template>
  <Layout class="statistics">
    <HeaderBar :header-title="'统计'" router-path="/money"></HeaderBar>
    <Tabs class-prefix="type" :data-source="recordTypeList" :type.sync="type"/>
    <div class="echarts-wrapper" ref="vChartWrapper">
      <ECharts class="echarts" :options="myChartOption" ref="vChartContent"/>
    </div>
    <div class="echarts-wrapper" ref="eChartWrapper">
      <Chart class="echarts" :options="myChartOption" ref="eChartContent"/>
    </div>
    <ol v-if="groupedList.length > 0">
      <li v-for="(group, index) in groupedList" :key="index">
        <h3 class="title">{{ showDay(group.title) }} <span>共计： ￥{{ group.total }}</span></h3>
        <ol>
          <li class="record" v-for="{amount, id, tags, tips} in group.items" :key="id">
            <span class="recordTag">{{ tagToString(tags) }}</span>
            <div class="notes">
              <span class="tips">备注：</span><span class="text">{{ tips }}</span>
            </div>
            <span>￥ {{ amount }}</span>
          </li>
        </ol>
      </li>
    </ol>
    <div v-else class="noResult">
      目前没有相关记录
    </div>
  </Layout>
</template>

<script lang="ts">
// basic
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
// vendor
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import _ from 'lodash';

dayjs.locale('zh-cn');

// utils
import clone from '@/lib/clone.ts';
import clearJetLag from '@/lib/clearJetLag';
// components
import Tabs from '@/components/Tabs.vue';
import HeaderBar from '@/components/HeaderBar.vue';
import recordTypeList from '@/constants/recordTypeList.ts';

// echarts
const ECharts = require('vue-echarts').default;
import 'echarts/lib/chart/line';
import 'echarts/lib/component/tooltip';
// my echarts
import Chart from '@/components/Statistics/Chart.vue';
import getClientWidth from '@/lib/getClientWidth.ts';

@Component({
  components: {HeaderBar, Tabs, ECharts, Chart},
})
export default class Statistics extends Vue {
  type = '-';
  recordTypeList = recordTypeList;
  client = getClientWidth();

  get triggerMethod(): 'click' | 'mousemove' {
    if (this.client === 'mobile') {
      return 'click';
    } else if (this.client === 'PC') {
      return 'mousemove';
    } else {
      return 'click';
    }
  }

  get myChartOption() {
    // 原数据按录入的顺序排列，数据先要排序，按时间排序
    console.log(this.groupedList
      .map(record => _.pick(record, ['createdAt', 'amount']))
    ); // const lastDay = new Date();
    return {
      xAxis: {
        type: 'category',
        data: [
          'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun',
          'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun',
          'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun',
          'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun',
          'Mon', 'Tue'
        ],
        axisTick: {
          alignWithLabel: true
        },
        axisLine: {
          lineStyle: {
            color: '#666'
          }
        }
      },
      yAxis: {
        type: 'value',
        show: false
      },
      tooltip: {
        show: true,
        triggeron: this.triggerMethod,
        confine: true,
        position: 'top',
        formatter: '{c}'
      },
      series: [{
        symbol: 'circle',
        data: [
          820, 932, 901, 934, 1290, 1330, 1320,
          820, 932, 901, 934, 1290, 1330, 1320,
          820, 932, 901, 934, 1290, 1330, 1320,
          820, 932, 901, 934, 1290, 1330, 1320,
          820, 932
        ],
        type: 'line',
        itemStyle: {
          borderWidth: 3,
          borderColor: '#aaa',
          color: '#666'
        },
        symbolSize: 12,
        showBackground: true
      }],
      animationDuration: 888,
      grid: {
        left: 3,
        right: 0,
        top: 0
      }
    };
  }

  // 读取 记录列表 // computed
  get recordList() {
    return this.$store.getters.recordList
  }

  // 计算 分组列表
  get groupedList() {
    const {recordList} = this;
    // newList: { tags: Tag[]; tips: string; type: string; amount: number; createdAt: string; }[]
    const newList = clone(recordList)
      .filter((r: RecordItem) => r.type === this.type)
      .sort((a: RecordItem, b: RecordItem) => (
        dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf()
      ));
    // newList ?[] return
    if (newList.length === 0) {return [] as GroupedType[];}
    // 排序后的第一项 newList[0] 处理后 作为初始项
    const result: GroupedType[] = [{
      title: dayjs(newList[0].createdAt.split('T')[0]).format('YYYY-MM-DD'),
      items: [newList[0],]
    }];

    // 判断 newList[i] 从第二项开始的每一项的 title: '20XX-XX-XX'  是否符合当前 分组项
    for (let i = 1; i < newList.length; i++) {
      const current = newList[i]; // 当前项
      const lastGroupItem = result[result.length - 1]; // 分组数据的最后一项
      const localDay = dayjs(current.createdAt.split('T')[0]);

      if (dayjs(lastGroupItem.title).isSame(localDay, 'day')) {
        lastGroupItem.items.push(current);
      } else {
        result.push({
          title: localDay.format('YYYY-MM-DD'),
          items: [current]
        });
      }
    }

    // 为 result.group 添加 计算总额 group.total 属性
    // result.group.items: { tags: Tag[]; tips: string; type: string; amount: number; createdAt: string; }[]
    result.forEach(group => {
      group.total = group.items.reduce((sum, item) => sum + item.amount, 0);
    });
    return result;
  }

  get tempResult() {
    console.log(this.$store.getters.groupedList);
    console.log(this.$store.getters.switchTriggerMethod);
    console.log(this.$store.getters.myChartOption);
    return 'test tempResult'
  }

  // 显示项目 title 标签组合
  tagToString(tags: Tag[]) {
    return tags.length === 0 ? '无' : tags.map(tag => tag.name).join('、');
  }

  // 显示标题为 日期分组
  /**
   * @param {string} someday: from group.title YY-MM-DD
   * @return {string} formattedDate:
   */
  showDay(someday: string) {
    const now = dayjs(new Date().toISOString());
    const thatDay = dayjs(clearJetLag(new Date(someday), '-'));
    let formattedDate;
    if (thatDay.isSame(now, 'day')) {
      formattedDate = '今天';
    } else if (thatDay.isSame(now.subtract(1, 'day'), 'day')) {
      formattedDate = '昨天';
    } else if (thatDay.isSame(now.subtract(2, 'day'), 'day')) {
      formattedDate = '前天';
    } else if (thatDay.isSame(now, 'year')) {
      formattedDate = thatDay.format('M月D日');
    } else {
      formattedDate = thatDay.format('YYYY年M月D日');
    }
    return formattedDate;
  }

  // hooks
  protected beforeCreate(): void {
    this.$store.commit('fetchRecords');
  }

  mounted() {
    const vchartDiv = (this.$refs.eChartWrapper as HTMLDivElement);
    const echartDiv = (this.$refs.vChartWrapper as HTMLDivElement);
    setTimeout(() => {
      vchartDiv.scrollLeft = vchartDiv.scrollWidth;
      echartDiv.scrollLeft = echartDiv.scrollWidth;
      vchartDiv.scrollBy(vchartDiv.scrollWidth, 0);
      echartDiv.scrollBy(echartDiv.scrollWidth, 0);
    }, 50);
    console.log(this.tempResult);
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/global.scss";

.statistics {
  max-width: 100%;

  ::-webkit-scrollbar {
    display: none; /* Chrome Safari */
  }

  scroll-behavior: smooth;

  &::v-deep {
    .layout-content {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
    }

    %sticky {
      position: sticky;
      z-index: 1;
    }

    .headerBar {
      @extend %sticky;
      top: 0;

      > .left-icon {
        transform: rotate3d(0, 1, 0, 180deg);
      }
    }

    .type-tabs {
      @extend %sticky;
      top: 50px;
    }

    @media (min-width: 500px) {
      .echarts-wrapper {
        margin: 0 auto;
        overflow: auto;

        .echarts {
          max-width: 100%;
        }
      }
    }

    .echarts {
      margin: 0 auto;
      width: 430%;
      height: 220px;

      &-wrapper {
        overflow: auto;
      }
    }

  }

  %item {
    padding: 8px 16px;
    line-height: 24px;
    //min-height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 1px;
  }

  .title {
    @extend %item;
    margin-top: 8px;
    box-shadow: rgba(0, 0, 0, 0.15) 0 3px 3px 0, rgba(7, 7, 7, 0.05) 0 0 0 1px;
  }

  .record {
    background: #fff;
    @extend %item;

    .recordTag {
      @include multiline-ellipsis(2, 40px, 5em);
    }

    .notes {
      display: flex;
      margin-right: auto;
      margin-left: 16px;
      color: #999;

      .tips {
        @include multiline-ellipsis(1, 40px, 3em);
      }

      .text {
        @include multiline-ellipsis(1, 40px, 3em);
      }
    }
  }

  .noResult {
    padding: 16px;
    text-align: center;
  }

}

</style>
