<template>
  <Layout class="statistics">
    <HeaderBar :header-title="'统计'" router-path="/money"></HeaderBar>
    <Tabs class-prefix="type" :data-source="recordTypeList" :type.sync="type"/>
    <ol v-if="groupedList.length > 0">
      <li v-for="(group, index) in groupedList" :key="index">
        <h3 class="title">{{ showDay(group.title) }} <span>共计： ￥{{ group.total }}</span></h3>
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
    <div v-else class="noResult">
      目前没有相关记录
    </div>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import Tabs from '@/components/Tabs.vue';
import HeaderBar from '@/components/HeaderBar.vue';
import recordTypeList from '@/constants/recordTypeList.ts';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import clone from '@/lib/clone.ts';
import clearJetLag from '@/lib/clearJetLag';

dayjs.locale('zh-cn');

@Component({
  components: {HeaderBar, Tabs},
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
    // result.group.items: { tags: Tag[]; tips: string; type: string; amount: number; createdAt: string; }[]
    result.forEach(group => {
      group.total = group.items.reduce((sum, item) => sum + item.amount, 0);
    });
    return result;
  }

  tagToString(tags: Tag[]) {
    return tags.length === 0 ? '无' : tags.map(tag => tag.name).join('、');
  }

  showDay(someday: string) {
    const now = dayjs(new Date().toISOString());
    const thatDay = dayjs(clearJetLag(new Date(someday), '-'));
    console.log(thatDay);
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
  .noResult {
    padding: 16px;
    text-align: center;
  }

  %item {
    padding: 8px 16px;
    line-height: 24px;
    //min-height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  ::v-deep {
    .headerBar {
      > .left-icon {
        transform: rotate3d(0, 1, 0, 180deg);
      }
    }

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
