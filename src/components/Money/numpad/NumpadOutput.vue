<template>
  <div class="output">{{ localOutput || '0' }}</div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';

@Component
export default class NumpadOutput extends Vue {

}
</script>

<style lang="scss" scoped>

</style>