<template>
  <div class="div_notes">
    <label class="notes">
      <span class="name">备注</span>
      <input type="text" placeholder="在这里输入备注"/>
    </label>
  </div>
</template>
<script lang="ts">
export default {
  name: 'Notes'
};
</script>
<style lang="scss" scoped>
@import "~@/assets/style/global.scss";
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
</style>