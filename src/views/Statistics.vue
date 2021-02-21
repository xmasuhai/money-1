<template>
  <Layout class="statistics">
    <Tabs class-prefix="type" :data-source="typeList" :type.sync="type"/>
    <Tabs class-prefix="interval" :data-source="intervalList" :type.sync="interval"/>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import Types from '@/components/Money/Types.vue';
import Tabs from '@/components/Tabs.vue';

@Component({
  components: {Tabs, Types}
})
export default class Statistics extends Vue {
  type = '-';
  interval = 'day';

  intervalList = [
    {text: '按天', type: 'day'},
    {text: '按周', type: 'week'},
    {text: '按月', type: 'month'}
  ];

  typeList = [
    {text: '支出', type: '-'},
    {text: '收入', type: '+'}
  ]
}
</script>

<style lang="scss" scoped>
.statistics {
  ::v-deep .type-tabs-item {
    background: #fff;
    position: relative;
    &.selected {
      background: #c4c4c4;
      &::after {
        display: none;
        }
      }
    }
  }
</style>
