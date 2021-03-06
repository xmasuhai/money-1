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

@Component
export default class Money extends Vue {
  @Prop(String) ['classPrefix']: string;

  mounted() {
    if (document.documentElement.scrollHeight <= document.documentElement.clientHeight) {
      const bodyTag = document.getElementsByTagName('body')[0];
      bodyTag.style.height = document.documentElement.clientWidth / screen.width * screen.height + 'px';
    }

    window.onload = () => {
      setTimeout(() => {
        window.scrollTo(0, window.document.body.offsetHeight);
      }, 16);
    };
  }
}
</script>

<style lang="scss" scoped>
.layout-wrapper {
  overflow-scrolling: touch;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  .content {
    flex-grow: 1;
    overflow: auto;
    }
  }
</style>
