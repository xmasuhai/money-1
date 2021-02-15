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
import {Component} from 'vue-property-decorator';
import store2 from '@/store/index2';

@Component({
  components: {
    Numpad, Types, FormItem, Tags
  }
})

export default class Money extends Vue {
  tags = store2.tagList;
  recordList = store2.recordList;
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

  onUpdateTips(value: string) {
    this.record.tips = value;
  }

  saveRecord() {
    store2.createRecord(this.record);
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
