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
import Numpad from '@/components/Money/Numpad.vue';
import {Component} from 'vue-property-decorator';
import recordTypeList from '@/constants/recordTypeList.ts';
import Tabs from '@/components/Tabs.vue';

// import { mapState, mapGetters, mapMutations, mapActions } from "vuex";

@Component({
  components: {Tabs, Numpad, FormItem, Tags}
})
export default class Money extends Vue {
  get recordList() {
    return this.$store.state.recordList as RecordItem[];
  }

  record: RecordItem = {
    tags: [],
    tips: '',
    type: '-',
    amount: 0,
    createdAt: new Date().toISOString(),
  };
  recordTypeList = recordTypeList;

  created() {
    this.$store.commit('fetchRecords', null,{ root: true });
  }

  onUpdateTips(value: string) {
    this.record.tips = value;
  }

  pickTags(selectedTags: {id: string; name: string }[]) {
    this.record.tags = selectedTags;
  }

  saveRecord() {
    this.$store.commit('createRecord', this.record,{ root: true });
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
