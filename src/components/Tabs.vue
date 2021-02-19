<template>
  <ul class="tabs">
    <li v-for="item in dataSource" :key="item.value" :class="{selected: item.value === type}"
        @click="select(item)">{{ item.text }}
    </li>
  </ul>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';

type dataSource = { text: string; value: string }
@Component
export default class Tabs extends Vue {
  @Prop({required: true, type: Array})
  dataSource!: { text: string; value: string }[];
  @Prop(String) readonly type!: string;
  @Prop(String) readonly classPrefix?: string;

  select(item: dataSource) {
    this.$emit('update:type', item.value);
  }
}
</script>

<style lang="scss" scoped>

@import "~@/assets/style/global.scss";
.tabs {
  background: #c4c4c4;
  display: flex;
  text-align: center;
  > li {
    font-size: 24px;
    width: 50%;
    height: 64px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    &.selected {
      background: #c4c4c4;
      &::after {
        content: "";
        display: block;
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 4px;
        background: #333;
        }
      }
    }
  }
</style>