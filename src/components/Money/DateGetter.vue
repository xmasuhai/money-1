<template>
  <div>
    <a-date-picker class="data-piker" @change="onChange"/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import DatePicker from 'ant-design-vue/lib/date-picker';
import 'ant-design-vue/dist/antd.css';

Vue.use(DatePicker);

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