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
// import x from '@/assets/icons/bills.svg';
import Icon from '@/components/Icon.vue';

export default {
  name: 'Nav',
  components: {Icon}
};
</script>

<style lang="scss" scoped>
@import "~@/assets/style/global.scss";
nav {
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.25);
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
  > .item.selected{
    color: $color-highlight;
    }
  }

a {
  font-weight: bold;
  color: #2c3e50;
  }
</style>