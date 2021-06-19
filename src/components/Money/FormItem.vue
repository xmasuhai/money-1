<template>
  <div class="form-wrapper">
    <label class="form-item">
      <span class="name">{{ fieldName }}</span>
      <template v-if="type === 'date'">
        <input :type="type || 'text'"
               :placeholder="placeholder"
               :value="x(inputValue)"
               @input="oninputValueChanged($event.target.value)"/>
      </template>
      <template v-else>
        <input :type="type || 'text'"
               :placeholder="placeholder"
               :value="inputValue"
               @input="oninputValueChanged($event.target.value)"/>
      </template>
    </label>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';
import dayjs from 'dayjs';

@Component
export default class FormItem extends Vue {
  @Prop({default: ''}) inputValue!: string;
  @Prop({required: true}) fieldName!: string;
  @Prop({default: ''}) placeholder?: string;
  @Prop() type?: string;

  oninputValueChanged(newValue: string) {
    this.$emit('update:inputValue', newValue);
  }
  x(isoString: string) {
    return dayjs(isoString).format('YYYY-MM-DD')
  }
}
</script>
<style lang="scss" scoped>
.form-wrapper {
  background: transparent;

  .form-item {
    align-items: center;
    display: flex;
    font-size: 14px;
    padding-left: 16px;

    .name {
      padding-right: 16px;
    }

    input {
      height: 40px;
      flex-grow: 1;
      background: transparent;
      padding-right: 16px;
    }
  }
}
</style>
