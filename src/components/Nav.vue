<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import Icon from '@/components/Icon.vue';

@Component({
  components: {Icon}
})
export default class Nav extends Vue {
  tabs = [
    {'id': '1', 'pathTo': '/labels', 'iconName': 'bills', 'title': '标签'},
    {'id': '2', 'pathTo': '/money', 'iconName': 'account', 'title': '记账'},
    {'id': '3', 'pathTo': '/statistics', 'iconName': 'statistics', 'title': '统计'}];
}
</script>

<template>
  <nav>
    <router-link v-for="tab of tabs"
                 :key="tab.id"
                 :to="tab.pathTo"
                 class="item"
                 active-class="selected">
      <Icon :name="tab.iconName"/>
      {{ tab.title }}
    </router-link>
  </nav>
</template>

<style lang="scss" scoped>
@import '~@/assets/style/global.scss';

nav {
  @extend %outer-shadow;
  display: flex;
  flex-direction: row;
  font-size: 12px;

  > .item {
    padding: 2px 0;
    width: 33.33333%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    .icon {
      width: 32px;
      height: 32px;
    }
  }

  > .item.selected {
    color: $color-highlight;
  }
}

a {
  font-weight: bold;
  color: #2c3e50;
}
</style>
