<template>
  <Layout class-prefix="layout">
    <Tags :data-source.sync="tags"/>
    <Notes/>
    <Types/>
    <Numpad/>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import Tags from '@/components/Money/Tags.vue';
import Notes from '@/components/Money/Notes.vue';
import Types from '@/components/Money/Types.vue';
import Numpad from '@/components/Money/Numpad.vue';
import { Component } from 'vue-property-decorator';

@Component({
  components: {
    Numpad, Types, Notes, Tags
  }
})
export default class Money extends Vue{
  tags = ['衣','食','住','行','理财'];
}
</script>

<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column;
  }
</style>
