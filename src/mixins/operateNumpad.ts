import Vue from 'vue';
import Component from 'vue-class-component';
import {Prop} from 'vue-property-decorator';

// 操作数字键盘的所有逻辑
@Component
export default class OperateNumpad extends Vue {
  @Prop(Number) readonly amount!: number;
  @Prop(Boolean) readonly isReset!: boolean;
  output = this.amount.toString() || '0';
  curIndex = 12;

  checkInputNum(button: HTMLButtonElement, input: string, event: TapEvent) {
    // '0'开头的逻辑
    if (['0'].indexOf(this.output) !== -1) {
      // 输入不含'.' 的数字 1234567890
      if ('0123456789'.indexOf(input) >= 0) {
        return this.output = input;
      } else {
        // 输入 '.' 字符 '0.'
        return this.output += input;
      }
    }
    // '.'的逻辑
    const dotIndex = this.output.indexOf('.');
    // 存在'.'的情况 // 特殊 '0.'  不存在单独'.'
    if (dotIndex >= 0) {
      // '.' 判断重复输入
      if (input === '.') {return;}
      // 判断字符 为 '.'开头
      if (dotIndex === 0) {return this.output = '0.';}
      // '.'限制小数位 2位
      if (this.output.slice(dotIndex, -1).length > 1) {return;}
    }
    // 限制显示数字长度
    if ((this.output.replace(/\.\d{1,2}/g, '')).length >= 10) {
      alert('你的小目标金额超过喵内记账记录范围');
      return this.removeNum(event, -3);
    }
    return this.output += input;
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
    this.curIndex = 12;
    return this.output = '0';
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
    this.curIndex = 12;
  }

}
