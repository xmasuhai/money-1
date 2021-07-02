import {Component, Vue} from 'vue-property-decorator';

const map: { [key: string]: string } = {
  'tag name duplicated': '标签名重复了',
};

// 创建标签的所有逻辑
@Component
export default class TagHelper extends Vue {
  // methods
  createTag() {
    const name = window.prompt('请输入标签名');
    if (!name) {return window.alert('没有输入内容，请重新创建标签');}
    this.$store.commit('createTag', name);
    if (this.$store.state.tagStore.createTagError) {
      window.alert(map[this.$store.state.tagStore
        .createTagError.message] || '未知错误');
    }
  }
}
