<template>
  <div class="mask"
       @click="mask()"
       @touchmove.prevent
       :style="{'display':riseFlag?'block':'none'}">
    <div class="floatParts">
      <img src="../assets/qrcode.png" alt="QECode" class="qrcode"/>
      <span class="tipsText">请使用手机扫码打开</span>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';

@Component
export default class QRCode extends Vue {
  flag = true;
  flagOff = false;

  get riseFlag() {
    if (document.documentElement.clientWidth > 500 && !this.flagOff) {
      this.flag = true;
    } else if (this.flagOff) {
      this.flag = false;
    } else {
      this.$emit('updateMask')
      this.flag = false;
    }
    return this.flag;
  }

  mask() {
    this.$emit('updateMask')
  }
}
</script>

<style lang="scss" scoped>
.mask {
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: fixed;
  z-index: 998;

  .floatParts {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    align-items: center;
    z-index: 999;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    .qrcode {
      height: 200px;
      width: 200px;
      box-shadow: 5px 10px 10px rgba(0, 0, 0, 0.25);
    }

    .tipsText {
      padding: 20px;
      text-align: center;
      color: #fff;
      text-shadow: 1px 1px 2px whitesmoke;
    }
  }
}
</style>
