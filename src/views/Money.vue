<template>
  <Layout class-prefix="layout">
    <Tags @update:selectedTags="pickTags" :is-deselect-tags="emptyTags"/>
    <FormItem class="form-item" field-name="备注" placeholder="在这里输入备注"
              :inputValue.sync="record.tips"/>
    <Tabs :data-source="recordTypeList" :type.sync="record.type"/>
    <Numpad :value.sync="record.amount"
            @submit="saveRecord"
            @update:deselectTags="deselectTags"/>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import Tags from '@/components/Money/Tags.vue';
import FormItem from '@/components/Money/FormItem.vue';
import Tabs from '@/components/Tabs.vue';
import Numpad from '@/components/Money/Numpad.vue';
import {Component} from 'vue-property-decorator';
import recordTypeList from '@/constants/recordTypeList.ts';
import hideMenuBar from '@/lib/hideMenuBar';

@Component({
  components: {Tabs, FormItem, Tags, Numpad}
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

  emptyTags = false;

  created() {
    this.$store.commit('fetchRecords');
  }

  updated() {
    hideMenuBar();
  }

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

  saveRecord() {
    if (!this.record.tags || this.record.tags.length === 0) {
      return window.alert('请至少选择一个标签');
    }
    this.$store.commit('createRecord', this.record);
    if (this.$store.state.recordStore.createRecordError === null) {
      window.alert('已保存');
      this.record.tips = '';
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .layout-content {
  display: flex;
  flex-direction: column;
  }
.form-item {
  padding: 6px 0;
  }
</style>
