<template>
  <header class="headerBar">
    <Icon v-if="hasIcon"
          class="left-icon"
          name="money_right"
          @click.native="goBack(routerPath)"/>
    <span class="title">{{ headerTitle }}</span>
  </header>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';

@Component
export default class HeaderBar extends Vue {
  @Prop({type: String, default: '/money'}) routerPath!: string;
  @Prop({type: String, required: true, default: ''}) headerTitle!: string;
  @Prop({type: Boolean, required: false, default: true}) hasIcon!: true;

  goBack(routerPath: string) {
    this.$router.push({
      path: routerPath,
    });
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/style/global.scss';

.headerBar {
  text-align: center;
  font-size: 1em;
  padding: .5em 1em;
  margin-bottom: 2px;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  @extend %tag-shadow;

  > .left-icon {
    color: #666;
    font-size: 1.2em;
  }

  > .title {
    flex-grow: 1;
  }

  &::after {
    content: '';
    display: inline;
    width: 1.5em;
  }
}
</style>
