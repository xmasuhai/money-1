<template>
  <Layout>
    <div class="headerBar">
      <Icon class="leftIcon" name="money_right"/>
      <span class="title">编辑标签</span>
    </div>
    <FormItem class="formItem" field-name="标签名" placeholder="在这里输入标签名"/>
    <Button>删除标签</Button>
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
    if (tag) {
      console.log(tag);
    } else {
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
  > .leftIcon {
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
.formItem {
  margin-top: 8px;
  }
</style>