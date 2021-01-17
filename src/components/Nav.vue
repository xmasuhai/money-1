<template>
  <div>
    <nav>
      <router-link to="/labels">
        <Icon name="bills"/>
        标签
      </router-link>
      |
      <router-link to="/money">
        <Icon name="account"/>
        记账
      </router-link>
      |
      <router-link to="/statistics">
        <Icon name="statistics"/>
        统计
      </router-link>
    </nav>
  </div>
</template>

<script lang="ts">
import x from '@/assets/icons/bills.svg';
import Icon from '@/components/Icon.vue';

console.log(x);

export default {
  name: 'Nav',
  components: {Icon}
};
</script>

<style lang="scss" scoped>

</style>