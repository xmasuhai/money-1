<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import hideMenuBar from '@/lib/hideMenuBar.ts';
import HeaderBar from '@/components/HeaderBar.vue';

@Component({
  components: {HeaderBar,}
})
export default class Layout extends Vue {
  // 由动态外部参数 获取 类样式
  @Prop(String) ['classPrefix']: string;
  @Prop(String) headerTitle!: string;
  @Prop(Boolean) titleIcon!: boolean;
  @Prop(String) routerPath!: string;

  mounted() {
    window.onload = () => {
      hideMenuBar();
    };
  }
}
</script>

<template>
  <div class="layout-wrapper"
       :class="classPrefix && `${classPrefix}-wrapper`">
    <header-bar :headerTitle="headerTitle"
                :hasIcon="titleIcon"
                :router-path="routerPath"/>
    <main class="content"
          :class="classPrefix && `${classPrefix}-content`">
      <slot/>
    </main>
    <Nav/>
  </div>
</template>

<style lang="scss" scoped>
@import '../assets/style/vars.scss';

.layout-wrapper {
  display: flex;
  overflow-scrolling: touch;
  flex-direction: column;
  height: 100vh;

  .content {
    flex-grow: 1;
    overflow-y: auto;
    overflow-x: hidden;
    height: calc(100vh - var(--nav-height));
  }
}
</style>
