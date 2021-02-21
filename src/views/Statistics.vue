<template>
  <Layout class="statistics">
    <Tabs class-prefix="type" :data-source="recordTypeList" :type.sync="type"/>
    <Tabs class-prefix="interval" :data-source="intervalList" :type.sync="interval" tabs-height="48px"/>
    type: {{ type }}
    <br>
    interval: {{ interval }}
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import Tabs from '@/components/Tabs.vue';
import recordTypeList from '@/constants/recordTypeList';
import intervalList from '@/constants/intervalList';

@Component({
  components: {Tabs}
})
export default class Statistics extends Vue {
  type = '-';
  interval = 'day';
  intervalList = intervalList;
  recordTypeList = recordTypeList;
}
</script>

<style lang="scss" scoped>
.statistics {
  ::v-deep {
    .type-tabs-item {
      background: #fff;
      position: relative;
      &.selected {
        background: #c4c4c4;
        &::after {
          display: none;
          }
        }
      }
    .interval-tabs-item {
      // height: 48px;
      }
    }
  }
</style>
