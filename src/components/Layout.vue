<template>
  <div class="layout-wrapper" :class="classPrefix && `${classPrefix}-wrapper`">
    <div class="content" :class="classPrefix && `${classPrefix}-content`">
      <slot/>
    </div>
    <Nav/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';
import hideMenuBar from '@/lib/hideMenuBar';

@Component
export default class Layout extends Vue {
  @Prop(String) ['classPrefix']: string;

  mounted() {
    window.onload = () => {
      hideMenuBar();
    };
  }
}
</script>

<style lang="scss" scoped>
.layout-wrapper {
  display: flex;
  overflow-scrolling: touch;
  flex-direction: column;
  height: 100vh;

  .content {
    flex-grow: 1;
    overflow-y: auto;
    overflow-x: hidden;
  }
}
</style>
