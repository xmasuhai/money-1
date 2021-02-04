<template>
  <Layout class="labels">
    <ul class="tags">
      <li>
        <span>衣</span>
        <Icon name="money_right"/>
      </li>
      <li>
        <span>食</span>
        <Icon name="money_right"/>
      </li>
      <li>
        <span>住</span>
        <Icon name="money_right"/>
      </li>
      <li>
        <span>行</span>
        <Icon name="money_right"/>
      </li>
    </ul>
    <div class="createTag-wrapper">
      <button class="createTag">新建标签</button>
    </div>
  </Layout>
</template>

<script lang="ts">
export default {
  name: 'Labels',
};
</script>

<style lang="scss" scoped>
@import "~@/assets/style/global.scss";
.labels {
  .tags {
    background: white;
    font-size: 16px;
    padding-left: 16px;
    > li {
      min-height: 44px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #e6e6e6;
      > span {
        // text overflow mixins
        @include multiline-ellipsis(1, 44px, 4em);
        }
      > svg {
        font-size: 24px;
        color: #666;
        margin-right: 16px;
        }
      }
    }
  .createTag {
    background: #767676;
    color: #fff;
    border-radius: 4px;
    height: 40px;
    padding: 0 16px;
    &-wrapper {
      text-align: center;
      padding: 16px;
      margin-top:44-16px;
      }
    }
  }
</style>