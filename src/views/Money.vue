<template>
  <Layout class-prefix="layout">
    <Tags @update:selectedTags="pickTags"/>
    <FormItem class="form-item" field-name="备注" placeholder="在这里输入备注"
              @update:inputValue="onUpdateTips"/>
    <Tabs :data-source="recordTypeList" :type.sync="record.type"/>
    <Numpad :value.sync="record.amount"
            @submit="saveRecord"/>
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

  created() {
    this.$store.commit('fetchRecords');
  }

  get recordList() {
    return this.$store.state.recordStore.recordList as RecordItem[];
  }

  onUpdateTips(value: string) {
    this.record.tips = value;
  }

  pickTags(selectedTags: { id: string; name: string }[]) {
    this.record.tags = selectedTags;
  }

  saveRecord() {
    this.$store.commit('createRecord', this.record);
    if (this.$store.state.recordStore.createRecordError === null) {
      window.alert('已保存');
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
