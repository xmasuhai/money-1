<template>
  <ul class="tabs" :class="{[classPrefix + '-tabs']: classPrefix}">
    <li v-for="item in dataSource"
        :key="item.type"
        :class="liClass(item)"
        @click="select(item)"
        class="tabs-item"
        :style="{height: tabsHeight}">
      {{ item.text }}
    </li>
  </ul>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';

@Component
export default class Tabs extends Vue {
  @Prop({required: true, type: Array}) dataSource!: DataSource[];
  @Prop(String) type!: string;
  @Prop(String) classPrefix?: string;
  @Prop({type: String, default: '64px'}) tabsHeight!: string;

  liClass(item: DataSource) {
    return {
      [this.classPrefix + '-tabs-item']: this.classPrefix,
      selected: item.type === this.type
    };
  }

  select(item: DataSource) {
    this.$emit('update:type', item.type);
    this.$store.commit('updateTypeStore', item.type);
  }

  mounted() {
    if (this.$store.state.moneySessionStore.typeStore.length === 0) {
      this.$store.commit('updateTypeStore', '-');
    }
    this.$emit('update:type', this.$store.state.moneySessionStore.typeStore);
  }
}
</script>

<style lang="scss" scoped>
.tabs {
  background: #c4c4c4;
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;

  &-item {
    flex-grow: 1;
    font-size: 24px;
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    background: #fff;
    box-shadow: rgba(50, 50, 93, 0.25) 0 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;

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
