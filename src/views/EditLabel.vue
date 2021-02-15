<template>
  <Layout>
    <div class="headerBar">
      <Icon class="left-icon" name="money_right" @click.native="goBack"/>
      <span class="title">编辑标签</span>
    </div>
    <FormItem :inputValue="tag.name"
              @update:inputValue="update"
              class="form-item" field-name="标签名" placeholder="在这里输入标签名"/>
    <div class="button-wrapper">
      <Button @click="remove">删除标签</Button>
    </div>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import FormItem from '@/components/Money/FormItem.vue';
import Button from '@/components/Button.vue';
import store2 from '@/store/index2';

@Component({
  components: {Button, FormItem}
})
export default class EditLabel extends Vue {
  tag = store2.findTag(this.$route.params.id);

  update(name: string) {
    if (!this.tag) { return; }
    if (name === '') {
      window.alert('标签名不能为空');
      this.$router.back();
      return;
    }
    store2.updateTag(this.tag.id, name);
  }

  remove() {
    if (this.tag) {
      if (store2.removeTag(this.tag.id)) {
        window.alert(`成功删除标签：${this.tag.name}`);
        this.$router.back();
      }
    }
  }

  goBack() {
    this.$router.back();
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
