<template>
  <div id="app">
    <hr />
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  components: {
  },
  name: "App",
};
</script>

<style lang="scss">
@import "~@/assets/style/global.scss";
@import "~@/assets/style/reset.scss";
body {
  }
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  line-height: 1.5;
  font-family: $font-hei;
  color: #2c3e50;
}

</style>
