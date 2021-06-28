<template>
  <section class="form-wrapper">
    <label class="form-item">
      <span class="name">{{ fieldName }}</span>
      <template v-if="type === 'date'">
        <input :type="type"
               :placeholder="placeholder"
               :value="dateFormat(inputValue)"
               @change="oninputValueChanged($event.target.value)"/>
      </template>
      <template v-else>
        <input :type="type || 'text'"
               :placeholder="placeholder"
               :value="inputValue"
               @input="oninputValueChanged($event.target.value)"/>
      </template>
    </label>
  </section>
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
    if (this.type === 'date') {
      this.$store.commit('updateDateStore', newValue);
    } else if (this.type === 'text') {
      this.$store.commit('updateTipsStore', newValue);
    }
  }

  dateFormat(isoString: string) {
    return dayjs(isoString).format('YYYY-MM-DD');
  }

  renderSessionInfo() {
    if (this.type === 'text') {
      this.oninputValueChanged(this.$store.state.moneySessionStore.tipsStore);
    } else if (this.type === 'date') {
      if (this.$store.state.moneySessionStore.dateStore?.length === 0) {
        this.$store.commit('updateDateStore', this.dateFormat((new Date()).toISOString()));
      }
      this.oninputValueChanged(this.$store.state.moneySessionStore.dateStore);
    }
  }

  mounted() {
    // 读取session信息 渲染页面
    this.renderSessionInfo();
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
