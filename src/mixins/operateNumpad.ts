import Vue from 'vue';
import Component from 'vue-class-component';
import {Prop} from 'vue-property-decorator';

// 操作数字键盘的所有逻辑
@Component
export default class OperateNumpad extends Vue {
  @Prop(Number) readonly amount!: number;
  @Prop(Boolean) readonly isReset!: boolean;
  output = this.amount.toString() || '0.00';
  // 当前按钮点记号下标
  currentIndex = 12;

  checkInputNum(button: HTMLButtonElement, input: string, event: TapEvent) {
    // '.'的逻辑
    const dotIndex = this.output.indexOf('.');
    // 存在'.'的情况 // 特殊 '0.'  不存在单独'.'
    if (dotIndex >= 0) {
      // '.' 判断重复输入
      if (input === '.') {return;}
      // 判断字符 为 '.'开头
      // '.'限制小数位 2位
      if (this.output.slice(dotIndex, -1).length > 1) {return;}
    }
    // 限制显示数字长度
    if ((this.output.replace(/\.\d{1,2}/g, '')).length >= 10) {
      alert('你的小目标金额超过喵内记账记录范围');
      return this.removeNum(event, -3);
    }
    this.output += input;
  }

  inputNum(event: TapEvent) {
    const button = event.target as HTMLButtonElement;
    const input = button.textContent?.trim() as string;
    this.checkInputNum(button, input, event);
  }

  removeNum(event: TapEvent, number = -1) {
    this.output = this.output.slice(0, number);
    if (this.output === '') {
      this.clearNum();
    }
    return this.output;
  }

  clearNum() {
    this.currentIndex = -1;
    this.output = '0';
  }

  confirmNum() {
    const number = parseFloat(this.output);
    if (number === 0) {
      this.$emit('checkZero');
      this.output = '0';
      return;
    }
    this.$emit('update:amount', number);
    this.$emit('submit');
    this.$nextTick(() => {
      this.reset();
    });
  }

  reset() {
    if (this.isReset) {
      this.output = '0';
      this.$emit('update:deselectTags', true);
    }
    this.$emit('update:deselectTags', false);
    this.currentIndex = -1;
  }

}
