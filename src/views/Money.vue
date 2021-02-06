<template>
  <Layout class-prefix="layout">
    <Tags :data-source.sync="tags" @update:selectedTags="onUpdate"/>
    <Notes @update:value="onUpdateNotes"/>
    <Types :type.sync="record.type"/>
    <Numpad :value.sync="record.amount" @submit="saveRecord"/>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import Tags from '@/components/Money/Tags.vue';
import Notes from '@/components/Money/Notes.vue';
import Types from '@/components/Money/Types.vue';
import Numpad from '@/components/Money/Numpad.vue';
import {Component, Watch} from 'vue-property-decorator';
import recordListModel from '@/models/recordListModel.ts';
import tagListModel from '@/models/tagListModel';

@Component({
  components: {
    Numpad, Types, Notes, Tags
  }
})

export default class Money extends Vue {
  tags = tagListModel.fetchData();
  recordList = recordListModel.fetchData();
  record: RecordItem = {
    tags: [],
    notes: '',
    type: '-',
    amount: 0,
    createdAt: new Date(),
  };

  onUpdate(selectedTags: string[]) {
    this.record.tags = selectedTags;
  }

  onUpdateNotes(notesValue: string) {
    this.record.notes = notesValue;
  }

  saveRecord() {
    const clonedRecord = recordListModel.clone(this.record);
    clonedRecord.createdAt = new Date();
    this.recordList.push(clonedRecord);
  }

  @Watch('recordList')
  onRecordeChange() {
    recordListModel.saveData(this.recordList);
  }
}
</script>

<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column;
  }
</style>
