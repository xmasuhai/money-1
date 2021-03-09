import store from '@/store';
import operateId from '@/lib/operateId';

const tagStore = {
  namespace: true,
  state() {
    return {
      tagList: [],
      currentTag: {},
      isDefault: false,
      createTagError: null
    };
  },
  mutations: {
    getDefaultTags(state: tagState) {
      state.isDefault = true;
      ['衣', '食', '住', '行'].forEach((tagName) => {
        store.commit('createTag', tagName);
      });
      state.isDefault = false;
    },
    fetchTags(state: tagState) {
      state.tagList = JSON.parse(window.localStorage.getItem('tagList') ?? '[]');
      if (!state.tagList || state.tagList.length === 0) {
        store.commit('getDefaultTags');
      }
    },
    saveTags(state: tagState) {
      localStorage.setItem('tagList', JSON.stringify(state.tagList));
    },
    createTag(state: tagState, name: string) {
      state.createTagError = null;
      const names = state.tagList.map(tag => tag.name);
      if (names.indexOf(name) >= 0) {
        return state.createTagError = new Error('tag name duplicated');
      }
      if (names.length === 0) {
        window.alert('初始化默认标签');
        operateId.clearId();
      }
      const id = operateId.createId().toString();
      state.tagList.push({id, name});
      store.commit('saveTags');
      if (!state.isDefault) {
        return window.alert('添加成功');
      }
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
        return window.alert('删除失败');
      }
    },
    updateTag(state: tagState, tag: { id: string; name: string }) {
      const {id, name} = tag;
      const idList = state.tagList.map(item => item.id);
      if (idList.indexOf(id) >= 0) {
        const nameList = state.tagList.map(item => item.name);
        if (nameList.indexOf(name) >= 0) {
          return window.alert('标签名重复了');
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
