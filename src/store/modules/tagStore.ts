import store from '@/store';
import operateId from '@/lib/operateId';

const tagStore = {
  namespace: true,
  state() {
    return {
      tagList: [],
      currentTag: {},
    };
  },
  mutations: {
    fetchTags(state: tagState) {
      state.tagList = JSON.parse(window.localStorage.getItem('tagList') ?? '[]');
    },
    saveTags(state: tagState) {
      localStorage.setItem('tagList', JSON.stringify(state.tagList));
    },
    createTag(state: tagState, name: string) {
      const names = state.tagList.map(d => d.name);
      if (names.indexOf(name) >= 0) {
        window.alert('标签名重复了');
      }
      const id = operateId.createId().toString();
      state.tagList.push({id, name});
      store.commit('saveTags');
      window.alert('添加成功');
      // return 'success';
    },
    removeTag(state: tagState, id: string) {
      let index = -1;
      for (let i = 0; i < state.tagList.length; i++) {
        if (state.tagList[i].id === id) {
          index = i;
          break;
        }
      }
      if (index >= 0) {
        state.tagList.splice(index, 1);
        store.commit('saveTags');
      } else {
        window.alert('删除失败');
      }
    },
    updateTag(state: tagState, tag: { id: string; name: string }) {
      const {id, name} = tag;
      const idList = state.tagList.map(item => item.id);
      if (idList.indexOf(id) >= 0) {
        const nameList = state.tagList.map(item => item.name);
        if (nameList.indexOf(name) >= 0) {
          window.alert('标签名重复类');
        } else {
          const tagItem = state.tagList.filter(item => item.id === id)[0];
          tagItem.name = name;
          store.commit('saveTags');
        }
      }
    },
    setCurrentTag(state: tagState, id: string) {
      // state.currentTag = state.tagList.find(t => t.id === id);
      state.currentTag = state.tagList.filter(t => t.id === id)[0];
    }
  }
};
export default tagStore;
