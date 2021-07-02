<template>
  <section class="layout-wrapper" :class="classPrefix && `${classPrefix}-wrapper`">
    <div class="content" :class="classPrefix && `${classPrefix}-content`">
      <slot/>
    </div>
    <Nav/>
  </section>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import hideMenuBar from '@/lib/hideMenuBar.ts';

@Component
export default class Layout extends Vue {
  // 由动态外部参数 获取 类样式
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
