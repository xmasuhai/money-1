<template>
  <Layout>
    <div class="edit">
      <Icon name="money_right"/>
    编辑标签
    </div>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import tagListModel from '@/models/tagListModel.ts';

@Component
export default class EditLabel extends Vue {
  created() {
    const id = this.$route.params.id;
    tagListModel.fetchData();
    const tags = tagListModel.data;
    // const tag = tags.filter(t => t.id === id)[0];
    const tag = tags.find(t => t.id === id);
    if (tag) {
      console.log(tag);
    } else {
      this.$router.replace('/404');
    }
  }
}
</script>

<style lang="scss" scoped>
.edit{
  > svg {
    transform: rotate(180deg);
    font-size: 24px;
    color: #666;
    margin-right: 16px;
    }
  }
</style>