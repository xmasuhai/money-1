<template>
  <button
      :class="['basic-btn', {'current': buttonIndex === curIndex}]">
    {{ buttonText }}
    <slot/>
  </button>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';

@Component
export default class NumpadButton extends Vue {
  @Prop(String) buttonText!: string;
  @Prop(Number) buttonIndex!: number;
  @Prop(Number) curIndex!: number;
}
</script>

<style lang="scss" scoped>
$bg: #f2f2f2;
.basic-btn {
  width: 100%;
  height: 100%;
  background: transparent;
  border: 1px solid transparent;
  transition: border-color .25s;
  &.ok {
    grid-column: 4/5;
    grid-row: 3/5;
    }
  &.zero {
    grid-column: 1/2;
    grid-row: 4/5;
    }
  &:last-child {
    grid-column: 2/4;
    grid-row: 4/5;
    }
  &:hover {
    border-color: #ccc;
    }
  &.current::after {
    content: '';
    display: block;
    width: 2px;
    height: 2px;
    border-radius: 1px;
    color: #333;
    border-color: #777;
    }
  &:nth-child(1) {
    background: $bg;
    }
  &:nth-child(2),
  &:nth-child(5) {
    background: darken($bg, 5%);
    }
  &:nth-child(3),
  &:nth-child(6),
  &:nth-child(9) {
    background: darken($bg, 5 * 2%);
    }
  &:nth-child(4),
  &:nth-child(7),
  &:nth-child(10) {
    background: darken($bg, 5 * 3%);
    }
  &:nth-child(8),
  &:nth-child(11),
  &:nth-child(13) {
    background: darken($bg, 5 * 4%);
    }
  &:nth-child(14) {
    background: darken($bg, 5 * 5%);
    }
  &:nth-child(12) {
    background: darken($bg, 5 * 6%);
    }
  > .icon {
    width: 32px;
    height: 32px;
    }
  }
</style>