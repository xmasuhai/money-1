<template>
  <Layout class="statistics">
    <Tabs class-prefix="type" :data-source="recordTypeList" :type.sync="type"/>
    <Tabs class-prefix="interval" :data-source="intervalList" :type.sync="interval" tabs-height="48px"/>
    <ol>
      <li v-for="(value, name, index) in result" :key="name + index">
        <h3 class="title">{{ showDay(value.title) }}</h3>
        <ol>
          <li class="record" v-for="item in value.items" :key="item.id">
            <span class="recordTag">{{ tagToString(item.tags) }}</span>
            <div class="notes">
              <span class="tips">备注：</span><span class="text">{{ item.tips }}</span>
            </div>
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
import recordTypeList from '@/constants/recordTypeList.ts';
import intervalList from '@/constants/intervalList.ts';
import dayjs from 'dayjs';
/*
import {State, Getter, Action, Mutation} from 'vuex-class';
*/

@Component({
  components: {Tabs},
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
    /*
    * [
    *   {title, items},
    *   {title, items},
    *   {title, items},
    * ]
    *
    * */
    const {recordList} = this;
    // console.log(recordList);
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

  showDay(someday: string) {
    const now = dayjs();
    const thatDay = dayjs(someday);
    if (dayjs(someday).isSame(now, 'day')) {
      return '今天';
    } else if (thatDay.isSame(now.subtract(1, 'day'), 'day')) {
      return '昨天';
    } else if (thatDay.isSame(now.subtract(2, 'day'), 'day')) {
      return '前天';
    } else if (thatDay.isSame(now, 'year')) {
      return thatDay.format('M月D日');
    } else {
      return thatDay.format('YYYY年M月D日');
    }
  }

  // @Mutation('fetchRecords') fetchRecords!: Function;
  beforeCreate() {
    this.$store.commit('fetchRecords');
    // this.fetchRecords()
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
  }
</style>
