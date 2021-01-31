<template>
  <Layout class-prefix="layout">
    <Tags :data-source.sync="tags" @update:selectedTags="onUpdate"/>
    <Notes @update:value="onUpdateNotes"/>
    <Types :type.sync="record.type"/>
    <Numpad :value.sync="record.amount"/>
    {{record}}
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import Tags from '@/components/Money/Tags.vue';
import Notes from '@/components/Money/Notes.vue';
import Types from '@/components/Money/Types.vue';
import Numpad from '@/components/Money/Numpad.vue';
import {Component} from 'vue-property-decorator';

type Record = {
  tags: string[];
  notes: string;
  type: string;
  amount: number;
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
    amount: 0
  };

  onUpdate(selectedTags: string[]) {
    this.record.tags = selectedTags;
  }

  onUpdateNotes(notesValue: string) {
    this.record.notes = notesValue;
  }
}
</script>

<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column;
  }
</style>
