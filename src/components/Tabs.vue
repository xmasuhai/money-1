<template>
  <ul class="tabs" :class="{[classPrefix + '-tabs']: classPrefix}">
    <li v-for="item in dataSource"
        :key="item.type"
        :class="setLiClass(item)"
        @click="select(item)"
        class="tabs-item"
        :style="{height: tabsHeight}">
      {{ item.text }}
    </li>
  </ul>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';

@Component
export default class Tabs extends Vue {
  @Prop({required: true, type: Array}) dataSource!: DataSource[];
  @Prop(String) type!: string;
  @Prop(String) classPrefix?: string;
  @Prop({type: String, default: '64px'}) tabsHeight!: string;

  // 动态设置 li 对应样式
  setLiClass(item: DataSource) {
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
    // 读取session信息 渲染页面
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
    background: #efefef;
    cursor: pointer;

    transition: all 300ms cubic-bezier(.79, .21, .06, .81);

    box-shadow: -6px -6px 14px rgba(255, 255, 255, .7),
    -6px -6px 10px rgba(255, 255, 255, .5),
    6px 6px 8px rgba(255, 255, 255, .075),
    6px 6px 10px rgba(0, 0, 0, .15);

    text-shadow: 1px 1px 3px #ccd0d4, 0 0 0 rgba(0, 0, 0, 0.8), 1px 1px 4px #fff;
    text-align: center;
    font-weight: 700;
    opacity: 0.9;
    color: rgba(0, 0, 0, 0.4);

    &.selected {
      background: #cfcfcf;
      box-shadow: inset -2px -2px 6px rgba(255, 255, 255, .7),
      inset -2px -2px 4px rgba(255, 255, 255, .5),
      inset 2px 2px 2px rgba(255, 255, 255, .075),
      inset 2px 2px 4px rgba(0, 0, 0, .15);

      color: rgba(0, 0, 0, 0.45);

      &:hover {
        box-shadow: -2px -2px 6px rgba(255, 255, 255, .6),
        -2px -2px 4px rgba(255, 255, 255, .4),
        2px 2px 2px rgba(255, 255, 255, .05),
        2px 2px 4px rgba(0, 0, 0, .1);
      }

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
