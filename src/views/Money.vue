<template>
  <Layout class-prefix="layout">
    <Tags :data-source.sync="tags"
          @update:selectedTags="pickTags"/>
    <FormItem class="form-item" field-name="备注" placeholder="在这里输入备注"
              @update:value="onUpdateTips"/>
    <Types :type.sync="record.type"/>
    <Numpad :value.sync="record.amount"
            @submit="saveRecord"/>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import Tags from '@/components/Money/Tags.vue';
import FormItem from '@/components/Money/FormItem.vue';
import Types from '@/components/Money/Types.vue';
import Numpad from '@/components/Money/Numpad.vue';
import {Component, Watch} from 'vue-property-decorator';
import recordListModel from '@/models/recordListModel.ts';
import tagListModel from '@/models/tagListModel';

@Component({
  components: {
    Numpad, Types, FormItem, Tags
  }
})

export default class Money extends Vue {
  tags = tagListModel.fetch();
  recordList = recordListModel.fetchRecord();
  record: RecordItem = {
    tags: [],
    tips: '',
    type: '-',
    amount: 0,
    createdAt: new Date(),
  };

  pickTags(selectedTags: string[]) {
    this.record.tags = selectedTags;
  }

  onUpdateTips(notesValue: string) {
    this.record.tips = notesValue;
  }

  saveRecord() {
    recordListModel.createItem(this.record);
  }

  @Watch('recordList')
  onRecordeChange() {
    recordListModel.saveRecord();
  }
}
</script>

<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column;
  }
</style>

<style lang="scss" scoped>
.form-item {
  padding: 6px 0;
  }
</style>
