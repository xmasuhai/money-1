<template>
  <div>
    <DatePicker class="data-piker" @change="onChange"/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
@Component
export default class DateGetter extends Vue {
  onChange(date: Date, dateString: string) {
    console.log(date, dateString);
  }
}
</script>

<style lang="scss" scoped>
.data-piker{
  width: 120px;
  }
</style>