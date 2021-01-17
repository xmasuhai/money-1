<template>
  <svg class="icon">
    <use :xlink:href="'#'+name"/>
  </svg>
</template>

<script lang="ts">
/*
import Vue from "vue"
import Component from "vue-class-component"
*/

/*
const importAll = (requireContext) => {
  requireContext.keys().forEach(requireContext)
}
*/

const importAll = (requireContext: __WebpackModuleApi.RequireContext) => {
  requireContext.keys().forEach(requireContext);
};
// 指定目录 只能用相对路径 不支持@别名路径
// 使用importAll加载所有的svg
importAll(require.context('../assets/icons/', true, /\.svg$/));

// let importAll = (requireContext: __WebpackModuleApi.requireContext) => requireContext.keys().forEach(requireContext)
try {
  importAll(require.context('../assets/icons/', true, /\.svg$/));
} catch (error) {
  console.log(error);
}

export default {
  name: 'Icon',
  props: ['name']
};
</script>

<style lang="scss" scoped>
.icon {
  width: 2em; height: 2em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
  }
</style>