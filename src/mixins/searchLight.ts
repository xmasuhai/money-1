import {Component, Vue} from 'vue-property-decorator';

// 探照灯蒙层的所有逻辑
@Component
export default class SearchLight extends Vue {
  // 初始化 探照灯 坐标
  searchlightPosition = {
    x: 0,
    y: 0
  };

  // 计算 探照灯 坐标
  get searchlightCoordinate() {
    return {
      '--x-pos': this.searchlightPosition.x + 'px',
      '--y-pos': this.searchlightPosition.y + 'px',
    };
  }

  // 获取 冒泡 父节点
  getParent(curEl: HTMLButtonElement, parentEl: HTMLElement) {
    while (curEl !== parentEl) {
      curEl = curEl.parentElement as HTMLButtonElement;
    }
    return curEl;
  }

  showSearchlight(e: MouseEvent) {
    let elem = e.target as HTMLButtonElement;
    const wrapper = document.querySelector('.buttons');
    if (e.target && elem !== wrapper) {
      elem = this.getParent(e.target as HTMLButtonElement, wrapper as HTMLElement);
    }
    this.searchlightPosition.x = e.clientX - elem.offsetLeft;
    this.searchlightPosition.y = e.clientY - elem.offsetTop;
  }
}
