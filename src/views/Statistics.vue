<template>
  <Layout class="statistics">
    <Tabs class-prefix="type" :data-source="recordTypeList" :type.sync="type"/>
    <Tabs class-prefix="interval" :data-source="intervalList" :type.sync="interval" tabs-height="48px"/>
    type: {{ type }}
    <br>
    interval: {{ interval }}
    <hr>
    <div>
      <ol>
        <li v-for="(group, index) in result" :key="index">
          <h3>{{ group.title }}</h3>
          <ol>
            <li v-for="item in group.items" :key="item.id">
              {{ item.amount }} {{ item.createdAt }}
            </li>
          </ol>
        </li>
      </ol>
    </div>
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
    const hashTable: { [key: string]: HashTableValue} = {};
    for (let i = 0; i < recordList.length; i++) {
      // ISO8601 toISOString() const [date, time] = recordList[i].createdAt!.split('T');
      const [date] = recordList[i].createdAt?.split('T');
      hashTable[date] = hashTable[date] || {title: date, items: []};
      hashTable[date].items.push(recordList[i]);
    }
    return hashTable;
  }

  beforeCreate() {
    this.$store.commit('fetchRecords');
  }
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
