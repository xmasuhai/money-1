<template>
  <Layout class-prefix="layout">
    <HeaderBar :header-title="'记账'"
               :hasIcon="false"></HeaderBar>
    <Tags @update:selectedTags="pickTags"
          :is-deselect-tags="emptyTags"/>
    <FormItem class="form-item" field-name="备注"
              placeholder="在这里输入备注"
              :inputValue.sync="record.tips"/>
    <div class="createdAt">
      <FormItem class="form-item" field-name="日期"
                placeholder="在这里选择日期"
                :inputValue.sync="record.createdAt"/>
    </div>
    <Tabs :data-source="recordTypeList"
          :type.sync="record.type"/>
    <Numpad :amount.sync="record.amount"
            @submit="submit"
            @update:deselectTags="deselectTags"
            @checkZero="alertInform('case3')"
            :is-reset="checkoutResult"/>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import HeaderBar from '@/components/HeaderBar.vue';
import Tags from '@/components/Money/Tags.vue';
import FormItem from '@/components/Money/FormItem.vue';
import Tabs from '@/components/Tabs.vue';
import Numpad from '@/components/Money/Numpad.vue';
import {Component} from 'vue-property-decorator';
import recordTypeList from '@/constants/recordTypeList.ts';

@Component({
  components: {HeaderBar, Tabs, FormItem, Tags, Numpad}
})
export default class Money extends Vue {
  record: RecordItem = {
    tags: [],
    tips: '',
    type: '-',
    amount: 0,
    createdAt: new Date().toISOString(),
  };

  recordTypeList = recordTypeList;
  checkoutResult = false;
  emptyTags = false;

  get recordList() {
    return this.$store.state.recordStore.recordList as RecordItem[];
  }

  pickTags(selectedTags: Tag[]) {
    this.emptyTags = false;
    this.record.tags = selectedTags;
  }

  deselectTags(deselect: boolean) {
    if (deselect) {
      this.record.tags = [];
      this.emptyTags = true;
    }
  }

  checkoutRecord() {
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
  }

  saveRecord() {
    this.$store.commit('createRecord', this.record);
  }

  reset() {
    this.record.tips = '';
    this.record.tags = [];
    this.record.type = '+';
    this.record.amount = 0;
  }

  submit() {
    if (!this.checkoutRecord()) {
      return;
    }
    this.saveRecord();
    if (this.$store.state.recordStore.createRecordError === null) {
      this.alertInform('case1');
    }
    this.reset();
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
  }
.form-item {
  padding: 6px 0;
  }
</style>
