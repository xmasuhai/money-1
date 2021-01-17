<template>
  <div>
    <nav>
      <svg>
        <use xlink:href="#bills"/>
      </svg>
      <router-link to="/labels">标签</router-link>
      |
      <router-link to="/money">记账</router-link>
      |
      <router-link to="/statistics">统计</router-link>
    </nav>
  </div>
</template>

<script lang="ts">
import x from '@/assets/icons/bills.svg';

console.log(x);

export default {
  name: 'Nav'
};
</script>

<style lang="scss" scoped>

</style>