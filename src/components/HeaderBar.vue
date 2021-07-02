<template>
  <header class="headerBar">
    <Icon v-if="hasIcon"
          class="left-icon" name="money_right"
          @click.native="goBack(routerPath)"/>
    <span class="title">{{ headerTitle }}</span>
  </header>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';

@Component
export default class HeaderBar extends Vue {
  @Prop({default: '/money'}) routerPath!: string;
  @Prop({required: true, default: ''}) headerTitle!: string;
  @Prop({default: true}) hasIcon!: true;

  goBack(routerPath: string) {
    this.$router.push({
      path: routerPath,
    });
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/global.scss";

.headerBar {
  text-align: center;
  font-size: 16px;
  padding: 12px 16px;
  margin-bottom: 2px;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @extend %tag-shadow;

  > .left-icon {
    color: #666;
    font-size: 24px;
  }

  > .title {
    flex-grow: 1;
  }

  &::after {
    content: '';
    display: inline;
    width: 24px;
    height: 24px;
  }
}
</style>
