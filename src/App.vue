<template>
  <div id="app">
    <router-view></router-view>
<!--
    <img v-if="showQRCode()" src="@/public/img/qrcode.png" alt="QRCode">
    -->
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';

@Component
export default class App extends Vue {
  showQRCode() {
    console.log('ddd');
    return document.documentElement.clientWidth > 500
  }
}
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
