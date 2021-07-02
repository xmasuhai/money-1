import {Component, Prop, Vue} from 'vue-property-decorator';

// 操作数字键盘的所有逻辑
@Component
export default class OperateNumpad extends Vue {
  @Prop(Number) amount!: number;
  @Prop(Boolean) readonly isReset!: boolean;

  // 初始化 输出数字
  output = this.amount.toString() || '0.00';
  // 初始化 当前 按钮点 记号 下标
  currentIndex = -1;

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
      alert('你的小目标金额超过记账记录范围');
      return this.removeNum(event, -3);
    }
    this.output += input;
  }

  clearNumpadMark() {
    this.currentIndex = -1;
  }

  inputNum(event: TapEvent) {
    const button = event.target as HTMLButtonElement;
    const input = button.textContent?.trim() as string;
    this.checkInputNum(button, input, event);
    this.$store.commit('updateMoneyStore', this.output);
  }

  removeNum(event: TapEvent, number = -1) {
    this.output = this.output.slice(0, number);
    if (this.output === '') {
      this.clearNum();
    }
    this.$store.commit('updateMoneyStore', this.output);
    this.clearNumpadMark();
    return this.output;
  }

  clearNum() {
    this.output = '0';
    this.$store.commit('updateMoneyStore', this.output);
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
    this.reset();
  }

  reset() {
    if (this.isReset) {
      // 清零
      this.output = '0';
    }
    // 取消选择标签
    this.$emit('update:deselectTags', true);
    // 移除数字盘 记号
    this.clearNumpadMark();
    // 重置数字 0
    this.clearNum();
    // 清空 session
    this.$store.commit('resetMoneySessionStore');
    // 重渲染
    this.$emit('update:rerender');
  }

}
