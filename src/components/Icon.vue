<script lang="ts">
import importAllSvg from '@/lib/importAllSvg';
import {Component, Prop, Vue} from 'vue-property-decorator';

importAllSvg();

@Component
export default class Icon extends Vue {
  // 动态引入 svg name
  @Prop({default: ''}) ['name']: string;
}
</script>

<template>
  <svg class="icon" @click="$emit('click', $event)">
    <use :xlink:href="'#' + name"/>
  </svg>
</template>

<style lang="scss" scoped>
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
