<template>
  <Layout class="statistics">
    <Tabs class-prefix="type" :data-source="recordTypeList" :type.sync="type"/>
    <Tabs class-prefix="interval" :data-source="intervalList" :type.sync="interval" tabs-height="48px"/>
    <ol>
      <li v-for="(value, name, index) in result" :key="name">
        <h3 class="title">{{ index + 1 }}：{{ value.title }}</h3>
        <ol>
          <li class="record" v-for="item in value.items" :key="item.id">
            <span>{{ tagToString(item.tags) }}</span>
            <span class="tips">备注：{{ item.tips }}</span>
            <span>￥ {{ item.amount }}</span>
          </li>
        </ol>
      </li>
    </ol>
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

  get recordList() {
    return (this.$store.state as RootState).recordList;
  }

  get result() {
    const {recordList} = this;
    type HashTableValue = { title: string; items: RecordItem[] };
    const hashTable: { [HashTableKey: string]: HashTableValue } = {};
    for (let i = 0; i < recordList.length; i++) {
      const [date,] = recordList[i].createdAt.split('T');
      hashTable[date] = hashTable[date] || {title: date, items: []};
      hashTable[date].items.push(recordList[i]);
    }
    return hashTable;
  }

  tagToString(tags: Tag[]) {
    const names = [];
    for (let i = 0; i < tags.length; i++) {
      names.push(tags[i].name);
    }
    return names.length === 0 ? '无' : names.join(',');
  }

  beforeCreate() {
    this.$store.commit('fetchRecords');
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/global.scss";
.statistics {
  %item {
    padding: 8px 16px;
    line-height: 24px;
    //min-height: 40px;
    display: flex;
    justify-content: space-between;;
    align-items: center;
    }
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
  .title {
    @extend %item;
    }
  .record {
    background: #fff;
    @extend %item;
    .tips {
      margin-right: auto;
      margin-left: 16px;
      color: #999;
      @include multiline-ellipsis(1, 40px, 14em);
      }
    }
  }
</style>
