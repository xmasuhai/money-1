<template>
  <button
      :class="['basic-btn', {'current': buttonIndex === curIndex}]"
      @click="selectBtn(buttonIndex)">
    {{ buttonText }}
    <slot/>
  </button>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Emit, Prop} from 'vue-property-decorator';

@Component
export default class NumpadButton extends Vue {
  @Prop(String) buttonText!: string;
  @Prop(Number) buttonIndex!: number;
  @Prop({type: Number, default: 13}) curIndex!: number;

  @Emit('selectBtn')
  selectBtn(index: number) {
    return index;
  }
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
  position: relative;
  &.current::after {
    content: '';
    display: block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #f0f0f0;
    box-shadow: 0 0 0 #cccccc,
    0 0 0 #ffffff,
    3px 3px 3px #cccccc inset,
    -3px -3px 3px #ffffff inset;
    position: absolute;
    top: .5em;
    right: .5em;
    }
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