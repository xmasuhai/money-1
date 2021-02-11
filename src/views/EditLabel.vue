<template>
  <Layout>
    <div class="headerBar">
      <Icon class="left-icon" name="money_right"/>
      <span class="title">编辑标签</span>
    </div>
    <FormItem class="form-item" field-name="标签名" placeholder="在这里输入标签名"/>
    <div class="button-wrapper">
      <Button>删除标签</Button>
    </div>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import tagListModel from '@/models/tagListModel.ts';
import FormItem from '@/components/Money/FormItem.vue';
import Button from '@/components/Button.vue';

@Component({
  components: {Button, FormItem}
})
export default class EditLabel extends Vue {
  created() {
    const id = this.$route.params.id;
    tagListModel.fetchData();
    const tags = tagListModel.data;
    // const tag = tags.filter(t => t.id === id)[0];
    const tag = tags.find(t => t.id === id);
    if (!tag) {
      this.$router.replace('/404');
    }
  }
}
</script>

<style lang="scss" scoped>
.headerBar {
  text-align: center;
  font-size: 16px;
  padding: 12px 16px;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  > .left-icon {
    transform: rotate3d(0, 1, 0, 180deg);
    color: #666;
    font-size: 24px;
    }
  > .title {
    }
  &::after {
    content: '';
    display: inline;
    width: 24px;
    height: 24px;
    }
  }
.form-item {
  margin-top: 8px;
  background: #fff;
  -webkit-box-shadow: 0 1px 1px 0 #BCBBC1;
  -moz-box-shadow: 0 1px 1px 0 #BCBBC1;
  box-shadow: 0 1px 1px 0 #BCBBC1;
  }
.button-wrapper {
  text-align: center;
  padding: 16px;
  margin-top: 44-16px;
  }
</style>
