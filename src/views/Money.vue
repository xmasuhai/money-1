<template>
  <Layout class-prefix="layout">
    <div class="tags">
      <ul class="current">
        <li>衣</li>
        <li>食</li>
        <li>住</li>
        <li>行</li>
      </ul>
      <div class="new">
        <button>新增标签</button>
      </div>
    </div>
    <div  class="div_notes">
      <label class="notes">
        <span class="name">备注</span>
        <input type="text" placeholder="在这里输入备注"/>
      </label>
    </div>
    <div class="div_types">
      <ul class="types">
        <li class="selected">支出</li>
        <li>收入</li>
      </ul>
    </div>
    <div class="numpad">
      <div class="output">100</div>
      <div class="buttons">
        <button>1</button>
        <button>2</button>
        <button>3</button>
        <button>删除</button>
        <button>4</button>
        <button>5</button>
        <button>6</button>
        <button>清空</button>
        <button>7</button>
        <button>8</button>
        <button>9</button>
        <button class="ok">OK</button>
        <button class="zero">0</button>
        <button>.</button>
      </div>
    </div>
  </Layout>
</template>

<script lang="ts">
export default {
  name: 'Money',
};
</script>

<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column;
  }
</style>
<style lang="scss" scoped>
@import "~@/assets/style/global.scss";
.tags {
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
      background: #d9d9d9;
      height: $h;
      line-height: $h;
      border-radius: ($h/2);
      padding: 0 16px;
      margin-right: 12px;
      margin-top: 4px;
      }
    }
  > .new {
    padding-top: 16px;
    button {
      background: transparent;
      border: none;
      border-bottom: 1px solid;
      color: #999;
      padding: 0 4px;
      }
    }
  }
.notes {
  background: #f5f5f5;
  display: flex;
  align-items: center;
  font-size: 14px;
  padding-left: 16px;
  .name {
    padding-right: 16px;
    }
  input {
    height: 73px;
    flex-grow: 1;
    background: transparent;
    border: none;
    padding-right: 16px;
    }
  }
.types {
  background: #c4c4c4;
  display: flex;
  text-align: center;
  > li {
    font-size: 24px;
    width: 50%;
    height: 64px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    &.selected {
      background: #c4c4c4;
      &::after {
        content: "";
        display: block;
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 4px;
        background: #333;
        }
      }
    }
  }
.numpad {
  .output {
    @extend %innerShadow;
    font-size: 36px;
    font-family: Consolas, monospace;
    padding: 9px 16px;
    text-align: right;
    }
  .buttons {
    @extend %clearFix;
    > button {
      width: 25%;
      height: 64px;
      float: left;
      background: transparent;
      border: none;
      &.ok {
        height: (64px) * 2;
        float: right;
        }
      &.zero {
        width: 25 * 2%;
        }
      $bg: #f2f2f2;
      &:nth-child(1) {
        background: $bg;
        }
      &:nth-child(2),
      &:nth-child(5) {
        background: darken($bg, 5%);
        }
      &:nth-child(3),
      &:nth-child(6),
      &:nth-child(9) {
        background: darken($bg, 5 * 2%);
        }
      &:nth-child(4),
      &:nth-child(7),
      &:nth-child(10) {
        background: darken($bg, 5 * 3%);
        }
      &:nth-child(8),
      &:nth-child(11),
      &:nth-child(13) {
        background: darken($bg, 5 * 4%);
        }
      &:nth-child(14) {
        background: darken($bg, 5 * 5%);
        }
      &:nth-child(12) {
        background: darken($bg, 5 * 6%);
        }
      }
    }
  }
</style>