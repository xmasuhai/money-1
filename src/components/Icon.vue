<template>
  <svg class="icon" @click="$emit('click', $event)">
    <use :xlink:href="'#' + name"/>
  </svg>
</template>

<script lang="ts">
const importAll =
    (requireContext: __WebpackModuleApi.RequireContext) => {
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

import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';

@Component
export default class Numpad extends Vue {
  @Prop({default: ''}) ['name']: string;
}
</script>

<style lang="scss" scoped>
.icon {
  width: 1em; height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
  }
</style>
