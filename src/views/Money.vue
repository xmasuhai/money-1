<template>
  <Layout class-prefix="layout">
    <Tags/>
    <Notes/>
    <Types :xxx="123"/>
    <Numpad/>
  </Layout>
</template>

<script lang="ts">
import Tags from '@/components/Money/Tags.vue';
import Notes from '@/components/Money/Notes.vue';
import Types from '@/components/Money/Types.vue';
import Numpad from '@/components/Money/Numpad.vue';

export default {
  name: 'Money',
  components: {Numpad, Types, Notes, Tags},
};
</script>

<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column;
  }
</style>