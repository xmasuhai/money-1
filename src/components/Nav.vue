<template>
  <nav>
    <router-link to="/labels" class="item" active-class="selected">
      <Icon name="bills"/>
      标签
    </router-link>
    <router-link to="/money" class="item" active-class="selected">
      <Icon name="account"/>
      记账
    </router-link>
    <router-link to="/statistics" class="item" active-class="selected">
      <Icon name="statistics"/>
      统计
    </router-link>
  </nav>
</template>

<script lang="ts">
import { Component,  Vue } from "vue-property-decorator";
import Icon from '@/components/Icon.vue';

@Component({
  components: {Icon}
})
export default class Nav extends Vue {
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/global.scss";
nav {
  @extend %outer-shadow;
  display: flex;
  flex-direction: row;
  font-size: 12px;
  > .item {
    padding: 2px 0;
    width: 33.33333%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .icon {
      width: 32px;
      height: 32px;
      }
    }
  > .item.selected {
    color: $color-highlight;
    }
  }

a {
  font-weight: bold;
  color: #2c3e50;
  }
</style>
