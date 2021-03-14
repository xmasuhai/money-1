<template>
  <div id="app">
    <router-view></router-view>
    <transition name="fade">
      <QRCode></QRCode>
    </transition>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import QRCode from '@/components/QRCode.vue';

@Component({
  components: {QRCode}
})
export default class App extends Vue {
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
