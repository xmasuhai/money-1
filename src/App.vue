<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style lang="scss">
@import "~@/assets/style/global.scss";
@import "~@/assets/style/reset.scss";
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  line-height: 1.5;
  font-family: $font-hei;
  color: #2c3e50;
  font-size: 16px;
  background: whitesmoke;
}
</style>
