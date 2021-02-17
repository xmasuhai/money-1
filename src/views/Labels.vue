<template>
  <Layout class="labels">
    <ul class="tags">
      <li v-for="tag in tags" :key="tag.id">
        <router-link class="tag" :to="`/labels/edit/${tag.id}`">
          <span class="tag-text">{{ tag.name }}</span>
          <Icon class="tag-icon" name="money_right"/>
        </router-link>
      </li>
    </ul>
    <div class="createTag-wrapper">
      <Button class="createTag" @click.native="createTag">新建标签</Button>
    </div>
  </Layout>
</template>

<script lang="ts">
import {Component} from 'vue-property-decorator';
import {mixins} from 'vue-class-component';
import Button from '@/components/Button.vue';
import tagHelper from '@/mixins/tagHelper.ts';

@Component({
  components: {Button},
  computed: {
    tags() {
      return this.$store.state.tagList;
    }
  }
})

export default class Labels extends mixins(tagHelper) {
  beforeCreate() {
    this.$store.commit('fetchTags');
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/global.scss";
.labels {
  .tags {
    background: white;
    font-size: 16px;
    padding-left: 16px;
    > li {
      > .tag {
        min-height: 44px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid #e6e6e6;
        > span {
          // text overflow mixins
          @include multiline-ellipsis(1, 44px, 4em);
          }
        > svg {
          font-size: 24px;
          color: #666;
          margin-right: 16px;
          }
        }
      }
    }
  .createTag {
    background: #767676;
    color: #fff;
    border-radius: 4px;
    height: 40px;
    padding: 0 16px;
    &-wrapper {
      text-align: center;
      padding: 16px;
      margin-top: 44-16px;
      }
    }
  }
</style>
