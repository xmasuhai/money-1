<template>
  <Layout>
    <div class="edit">
      <Icon name="money_right"/>
      编辑标签
    </div>
    <Notes field-name="标签名" placeholder="在这里输入标签名"/>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import tagListModel from '@/models/tagListModel.ts';
import Notes from '@/components/Money/Notes.vue';
@Component({
  components: {Notes}
})
export default class EditLabel extends Vue {
  created() {
    const id = this.$route.params.id;
    tagListModel.fetchData();
    const tags = tagListModel.data;
    // const tag = tags.filter(t => t.id === id)[0];
    const tag = tags.find(t => t.id === id);
    if (tag) {
      console.log(tag);
    } else {
      this.$router.replace('/404');
    }
  }
}
</script>

<style lang="scss" scoped>
.edit {
  > svg {
    transform: rotate3d(0, 1, 0, 180deg);
    font-size: 24px;
    color: #666;
    margin-right: 16px;
    }
  }
</style>