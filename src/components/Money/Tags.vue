<template>
  <div class="tags">
    <ul class="current">
      <li v-for="tag in tagsList"
          :ref="tag.name"
          :style="dymClass"
          :key="tag.id"
          @click="toggle(tag)"
          :class="{selected: (selectedTags.indexOf(tag) >= 0),
          initSelected: (sessionSelectedTags.indexOf(tag) >= 0)
          }">
        {{ tag.name }}
      </li>
    </ul>
    <div class="new">
      <button @click="createTag">添加新标签</button>
    </div>
  </div>
</template>
<script lang="ts">
import {Component, Prop, Watch,} from 'vue-property-decorator';
import {mixins} from 'vue-class-component';
import tagHelper from '@/mixins/tagHelper.ts';

@Component
export default class Tags extends mixins(tagHelper) {
  @Prop(Boolean) isDeselectTags!: boolean;
  @Prop() sessionSelectedTags?: Tag[];

  selectedTags: Tag[] = [];

  created() {
    this.$store.commit('fetchTags');
  }

  get tagsList() {
    return this.$store.state.tagStore.tagsList;
  }

  get dymClass() {
    console.log('this.tagsList: ', this.tagsList);
    for(const tag of this.tagsList) {
      console.log('tag.name: ', tag.name);
    }
    if(this.sessionSelectedTags) {
      for(const tag of this.sessionSelectedTags) {
        console.log('tag.name: ', tag.name);

      }
    }
    return {
    }
  }

  // 将点击的标签 推入数组/从数组中删除 并发布给父组件
  toggle(tag: Tag) {
    // 得到 本次 点击标签下标 在 被选中标签列表下标的位置
    const index = this.selectedTags.map(itemTag => itemTag.id)
      .indexOf(tag.id);
    // 下标是否存在于 被选中标签列表中
    (index >= 0) ?
      this.selectedTags.splice(index, 1) :
      this.selectedTags.push(tag);
    // 选中的标签传给父组件
    this.$emit('update:selectedTags', this.selectedTags);
  }

  @Watch('isDeselectTags')
  deselectTag() {
    if (this.isDeselectTags) {
      this.selectedTags = [];
      this.$emit('update:selectedTags', this.selectedTags);
    }
  }

  // hooks
  mounted() {
    if (this.sessionSelectedTags) {
      console.log(this.sessionSelectedTags);
    }
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

      &.initSelected {
        background: darken($bg, 50%);
        color: #fff;
      }
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
