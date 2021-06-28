<template>
  <section class="tags">
    <ul class="current">
      <li v-for="tag in tagsList"
          :ref="tag.name"
          :key="tag.id"
          @click="toggle(tag)"
          :class="{selected: (selectedTags.indexOf(tag) >= 0)}">
        {{ tag.name }}
      </li>
    </ul>
    <div class="new">
      <button @click="createTag">添加新标签</button>
    </div>
  </section>
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

  get tagsList() {
    return this.$store.state.tagStore.tagsList;
  }

  renderSessionTags() {
    this.selectedTags = this.sessionSelectedTags || [];
    // session 数据 循环推入 selectedTags 将样式染到页面
    this.sessionSelectedTags?.forEach((tag) => {
      // 将 selected 样式 加到 selectedTags 中的 tag 上
      (this.$refs[tag.name] as Array<HTMLLIElement>)[0].className = 'selected';
    });
  }

  // 将点击的标签 推入数组/从数组中删除 并将 标签列表 发布给父组件
  toggle(tag: Tag) {
    // 得到 本次 点击标签下标 在 被选中标签列表下标的位置
    const index = this.selectedTags.map(itemTag => itemTag.id) // 得到被选中标签下标数组 []
      .indexOf(tag.id);

    // 下标是否存在于 被选中标签列表中
    if (index >= 0) {
      // 存在就 去除 标签列表中 下标对应的那项
      this.selectedTags.splice(index, 1);
      // 并去除 对应样式
      (this.$refs[tag.name] as Array<HTMLLIElement>)[0].className = '';
    } else {
      // 不存在就将标签推入列表
      this.selectedTags.push(tag);
    }
    // 将选中的标签 列表 传给父组件
    this.$emit('update:selectedTags', this.selectedTags);
  }

  // 是否取消选取标签
  @Watch('isDeselectTags')
  deselectTag() {
    if (this.isDeselectTags) {
      this.selectedTags = [];
      this.$emit('update:selectedTags', this.selectedTags);
    }
  }

  // hooks
  created() {
    // 读取所有标签
    this.$store.commit('fetchTags');
  }

  mounted() {
    // 读取session信息 渲染页面
    this.renderSessionTags();
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
