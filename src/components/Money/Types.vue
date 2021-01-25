<template>
  <div class="div_types">
    <ul class="types">
      <li class="selected">支出</li>
      <li>收入</li>
    </ul>
  </div>
</template>
<script lang="ts">
export default {
  name: 'Types'
};
</script>
<style lang="scss" scoped>
@import "~@/assets/style/global.scss";
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
</style>