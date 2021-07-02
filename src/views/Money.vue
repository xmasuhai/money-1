<template>
  <Layout class-prefix="layout" class="layout-content">
    <HeaderBar :header-title="'记账'"
               :hasIcon="false">
    </HeaderBar>
    <Tags @update:selectedTags="updatePickedTags"
          :sessionSelectedTags="sessionSelectedTags"
          :is-deselect-tags="emptyTags"
          class="tags"/>
    <FormItem class="form-item"
              field-name="备注"
              placeholder="在这里输入备注"
              type="text"
              :inputValue.sync="record.tips"/>
    <FormItem class="form-item"
              field-name="日期"
              placeholder="在这里选择日期"
              type="date"
              :inputValue.sync="record.createdAt"/>
    <Tabs :data-source="recordTypeList"
          :type.sync="record.type"
          class="fuckAnt-tabs"/>
    <Numpad :amount.sync="record.amount"
            @submit="submit"
            @update:deselectTags="deselectTags"
            @checkZero="alertInform('case3')"
            @update:rerender="rerender"
            :is-reset="checkoutResult"/>
  </Layout>
</template>

<script lang="ts">
// 框架组件
import {Component, Vue} from 'vue-property-decorator';
import {NavigationGuardNext, Route} from 'vue-router';
// 页面模块组件
import HeaderBar from '@/components/HeaderBar.vue';
import Tags from '@/components/Money/Tags.vue';
import FormItem from '@/components/Money/FormItem.vue';
import Tabs from '@/components/Tabs.vue';
import Numpad from '@/components/Money/Numpad.vue';
// 工具函数
import dateFormat from '@/lib/dateFormat.ts';
// 数据
import recordTypeList from '@/constants/recordTypeList.ts';

@Component({
  components: {HeaderBar, Tabs, FormItem, Tags, Numpad},
  beforeRouteEnter(to: Route, from: Route, next: NavigationGuardNext): void {
    next(vm => {
      // 通过 `vm` 访问组件实例 代替this
      vm.$store.commit('loadMoneySessionStore'); // 读取 session 数据
    });
  },
  beforeRouteLeave(to: Route, from: Route, next: NavigationGuardNext): void {
    this.$store.commit('saveMoneySessionStore');
    next();
  }
})

export default class Money extends Vue {
  // data
  record: RecordItem = {
    tags: [],
    tips: '',
    type: '-',
    amount: 0,
    createdAt: dateFormat(new Date().toISOString()),
  };

  sessionSelectedTags ? = this.$store.state.moneySessionStore.tagsStore;
  recordTypeList = recordTypeList;
  checkoutResult = false;
  emptyTags = false;

  // methods
  updatePickedTags(selectedTags: Tag[]) {
    this.emptyTags = false;
    // 记录 选中的标签
    this.record.tags = selectedTags;
    // 页面暂存 session selectedTags // 作为子组件外部数据传给子组件
    this.$store.commit('updateTagsStore', selectedTags);
  }

  deselectTags(deselect: boolean) {
    if (deselect) {
      this.record.tags = [];
      this.emptyTags = true;
    }
  }

  checkoutRecord() {
    // 检查记录 是否存在
    this.checkoutResult = true;
    if (!this.record.tags || this.record.tags.length === 0) {
      this.alertInform('case2');
      this.checkoutResult = false;
      this.deselectTags(false);
    }
    return this.checkoutResult;
  }

  alertInform(caseName: 'case1' | 'case2' | 'case3') {
    const maps = {
      case1: '已保存',
      case2: '请至少选择一个标签',
      case3: '金额为零，不计入'
    };
    window.alert(maps[caseName]);
    this.reset();
  }

  saveRecord() {
    this.$store.commit('createRecord', this.record);
  }

  reset() {
    this.record.tips = '';
    this.record.tags = [];
    this.record.type = '-';
    this.record.amount = 0;
    this.record.createdAt = dateFormat(new Date().toISOString());
    this.$store.commit('resetMoneySessionStore');
  }

  rerender() {
    this.deselectTags(true);
    this.reset();
  }

  submit() {
    // 检查记录是否存在
    if (!this.checkoutRecord()) {
      return;
    }
    this.saveRecord();
    if (this.$store.state.recordStore.createRecordError === null) {
      this.alertInform('case1');
    }
    // 提交后 重置页面
    this.rerender();
  }

}
</script>

<style lang="scss" scoped>
::v-deep {
  .layout-content {
    display: flex;
    flex-direction: column;
  }

  .headerBar {
    &::before {
      content: '';
      display: inline;
      width: 24px;
      height: 24px;
    }
  }

  .fuckAnt-tabs {
    margin-bottom: 0;
  }
}

.form-item {
  padding: 2px 0;
}

</style>
