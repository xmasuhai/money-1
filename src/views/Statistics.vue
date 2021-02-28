<template>
  <Layout class="statistics">
    <Tabs class-prefix="type" :data-source="recordTypeList" :type.sync="type"/>
    <ol>
      <li v-for="(group, index) in groupedList" :key="index">
        <h3 class="title">{{ showDay(group.title) }}</h3>
        <ol>
          <li class="record" v-for="item in group.items" :key="item.id">
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
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import clone from '@/lib/clone.ts';

dayjs.locale('zh-cn');

@Component({
  components: {Tabs},
})
export default class Statistics extends Vue {
  type = '-';
  recordTypeList = recordTypeList;

  beforeCreate() {
    this.$store.commit('fetchRecords');
  }

  get recordList() {
    return this.$store.state.recordStore.recordList;
  }

  get groupedList() {
    const {recordList} = this;
    if (recordList.length === 0) {return [];}
    type groupedType = { title: string; items: RecordItem[] };
    // newList: { tags: Tag[]; tips: string; type: string; amount: number; createdAt: string; }[]
    const newList = clone(recordList).sort((a: RecordItem, b: RecordItem) => (
        dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf()
    ));
    // 排序后的第一项 newList[0] 处理后 作为初始项
    const result: groupedType[] = [{
      title: dayjs(newList[0].createdAt).format('YYYY-MM-DD'),
      items: [newList[0],]
    }];
    // 判断 newList[i] 从第二项开始的每一项的title: '20XX-XX-XX'  是否符合当前 分组项
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
    return result;
  }

  tagToString(tags: Tag[]) {
    const names = [];
    for (let i = 0; i < tags.length; i++) {
      names.push(tags[i].name);
    }
    return names.length === 0 ? '无' : names.join(',');
  }

  showDay(someday: string) {
    const now = dayjs(new Date());
    const thatDay = dayjs(someday);
    if (thatDay.isSame(now, 'day')) {
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
