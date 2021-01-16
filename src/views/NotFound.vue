<template>
  <div>
    当前路径不存在，请检查网址是否正确
    <br>
    <router-link to="/">返回首页</router-link>
    <br>
    <a href="/#">返回首页</a>
  </div>
</template>

<script lang="ts">
export default {
  name: 'NotFound',
};
</script>

<style lang="scss" scoped>

</style>