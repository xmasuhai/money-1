<template>
  <Layout class-prefix="layout">
    <Tags :data-source.sync="tags" @update:selectedTags="onUpdate"/>
    <Notes @update:value="onUpdateNotes"/>
    <Types :type.sync="record.type"/>
    <Numpad :value.sync="record.amount" @submit="saveRecord"/>
    {{ recordList }}
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import Tags from '@/components/Money/Tags.vue';
import Notes from '@/components/Money/Notes.vue';
import Types from '@/components/Money/Types.vue';
import Numpad from '@/components/Money/Numpad.vue';
import {Component, Watch} from 'vue-property-decorator';
// import model from '@/model.js'; // TS 中不能用`import`直接引入 JS 的模块
// const model = require('@/model.js').model;
const {model} = require('@/model.js');

type Record = {
  tags: string[];
  notes: string;
  type: string;
  amount: number;
  createdAt?: Date;
}

@Component({
  components: {
    Numpad, Types, Notes, Tags
  }
})
export default class Money extends Vue {
  tags = ['衣', '食', '住', '行', '理财'];
  record: Record = {
    tags: [],
    notes: '',
    type: '-',
    amount: 0,
    createdAt: new Date(),
  };
  // recordList: Record[] = JSON.parse(window.localStorage.getItem('recordList') ?? '[]');
  recordList: Record[] = model.fetchData();

  onUpdate(selectedTags: string[]) {
    this.record.tags = selectedTags;
  }

  onUpdateNotes(notesValue: string) {
    this.record.notes = notesValue;
  }

  saveRecord() {
    const clonedRecord: Record = JSON.parse(JSON.stringify(this.record));
    clonedRecord.createdAt = new Date();
    this.recordList.push(clonedRecord);
  }

  @Watch('recordList')
  onRecordeChange() {
    model.saveData(this.recordList);
  }
}
</script>

<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column;
  }
</style>
