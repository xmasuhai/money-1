<template>
  <Layout>
    <header-bar router-path="/labels"
                :header-title="'编辑标签'"></header-bar>
    <FormItem :inputValue="currentTag.name"
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
import HeaderBar from '@/components/HeaderBar.vue';

@Component({
  components: {HeaderBar, Button, FormItem}
})
export default class EditLabel extends Vue {
  get currentTag() {
    return this.$store.state.tagStore.currentTag;
  }

  created() {
    this.$store.commit('fetchTags');
    this.$store.commit('setCurrentTag', this.$route.params.id);
    if (!this.currentTag) {
      this.$router.replace('/404');
    }
  }

  update(name: string) {
    if (!this.currentTag) { return; }
    if (name === '') {
      window.alert('标签名不能为空');
      this.$router.back();
      return;
    }
    this.$store.commit('updateTag', {id: this.currentTag.id, name});
  }

  remove() {
    if (this.currentTag) {
      this.$store.commit('removeTag', this.currentTag.id);
      window.alert(`成功删除标签：${this.currentTag.name}`);
      this.goBack();
    }
  }

  goBack() {
    this.$router.back();
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/global.scss";
::v-deep {
  .headerBar {
    > .left-icon {
      transform: rotate3d(0, 1, 0, 180deg);
      }
    }
  }
.form-item {
  margin-top: 8px;
  background: #fff;
  @extend %tag-shadow;
  }
.button-wrapper {
  text-align: center;
  padding: 16px;
  margin-top: 44-16px;
  }
</style>
