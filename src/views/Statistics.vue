<template>
  <Layout>
    <Types class-prefix="zzz" :type.sync="yyy"/>
    <Tabs :data-source="array" :type.sync="hhh"/>
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
  yyy = '-';
  array = [
    {text: '按天', value: 'day'},
    {text: '按周', value: 'week'},
    {text: '按月', value: 'month'},
  ];
  hhh = 'day';
}
</script>

<style lang="scss" scoped>
::v-deep .zzz-item {
  background: #fff;
  &.selected {
    border: 1px solid red;
    background: #c4c4c4;
    &::after {
      display: none;
      }
    }
  }
</style>
