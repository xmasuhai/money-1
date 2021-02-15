<template>
  <div class="tags">
    <ul class="current">
      <li v-for="tag in tagList"
          :key="tag.id"
          @click="toggle(tag)"
          :class="{selected: selectedTags.indexOf(tag)>=0 }">
        {{ tag.name }}
      </li>
    </ul>
    <div class="new">
      <button @click="createTag">添加新标签</button>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import store2 from '@/store/index2';

@Component
export default class Tags extends Vue {
  tagList = store2.fetchTags(); // Tag[]
  selectedTags: Tag[] = [];

  toggle(tag: Tag) {
    const index = this.selectedTags.map(i => i.id).indexOf(tag.id);
    if (index >= 0) {
      this.selectedTags.splice(index, 1);
    } else {
      this.selectedTags.push(tag);
    }
    this.$emit('update:selectedTags', this.selectedTags);
  }

  createTag() {
    const name = window.prompt('请输入标签名');
    if (!name) {return window.alert('标签名不能为空');}
    store2.createTag(name);
  }
}
</script>
<style lang="scss" scoped>
@import "~@/assets/style/global.scss";
.tags {
  background: #fff;
  display: flex;
  flex-direction: column-reverse;
  flex-grow: 1;
  font-size: 14px;
  padding: 16px;
  > .current {
    order: 1;
    display: flex;
    flex-wrap: wrap;
    > li {
      $h: 24px;
      $bg: #d9d9d9;
      background: $bg;
      height: $h;
      line-height: $h;
      border-radius: ($h/2);
      padding: 0 16px;
      margin-right: 12px;
      margin-top: 4px;
      &.selected {
        background: darken($bg, 50%);
        color: #fff;
        }
      }
    }
  > .new {
    padding-top: 16px;
    button {
      background: transparent;
      border-bottom: 1px solid;
      color: #999;
      padding: 0 4px;
      }
    }
  }
</style>
