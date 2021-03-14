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
@media (min-width: 500px) {
  body {
    background: #f0f0f0;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    #app {
      flex-grow: 1;
      display: flex;
      max-width: 80vw;
      justify-content: center;
      align-items: center;
      box-shadow:  10px 10px 10px #cccccc,
      10px 10px 10px #ffffff,
      0 0 0 #cccccc inset,
      0 0 0 #ffffff inset;
      animation: anime 3s cubic-bezier(0.16, 1, 0.3, 1) 1s 1 alternate;
      animation-fill-mode: forwards;
      .layout-wrapper {
        flex-grow: 1;
        max-height: 850px;
        }
      @keyframes anime {
        100% {
          max-width: 480px;
          max-height: 850px;
          background:  #f8f8f8;
          box-shadow:  40px 40px 40px #cccccc,
          0 0 0 #ffffff,
          0 0 0 #cccccc inset,
          2px 2px 2px #ffffff inset;
          }
        }
      }
    }
  }
</style>
