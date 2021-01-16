<template>
  <div class="nav-wrapper">
    <div class="content">
      <p>Money.vue</p>
    </div>
    <Nav/>
  </div>
</template>

<script lang="ts">
export default {
  name: 'Money',
};
</script>

<style lang="scss" scoped>
.nav-wrapper {
  border: 1px solid red;
  display: flex;
  flex-direction: column;
  height: 100vh;
  .content {
    border: 1px solid cornflowerblue;
    flex-grow: 1;
    overflow: auto;
    }
  }
</style>