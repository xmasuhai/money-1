import store from '@/store';
import operateId from '@/lib/operateId';

const tagStore = {
  namespace: true,
  state() {
    return {
      tagsList: [],
      currentTag: {},
      isDefault: false,
      createTagError: null
    };
  },
  mutations: {
    getDefaultTags(state: TagState) {
      state.isDefault = true;
      ['衣', '食', '住', '行'].forEach((tagName) => {
        store.commit('createTag', tagName);
      });
      state.isDefault = false;
    },
    fetchTags(state: TagState) {
      state.tagsList = JSON.parse(window.localStorage.getItem('tagsList') ?? '[]');
      if (!state.tagsList || state.tagsList.length === 0) {
        store.commit('getDefaultTags');
      }
    },
    saveTags(state: TagState) {
      localStorage.setItem('tagsList', JSON.stringify(state.tagsList));
    },
    createTag(state: TagState, name: string) {
      state.createTagError = null;
      const names = state.tagsList.map(tag => tag.name);
      if (names.indexOf(name) >= 0) {
        return state.createTagError = new Error('tag name duplicated');
      }
      if (names.length === 0) {
        window.alert('初始化默认标签');
        operateId.clearId();
      }
      const id = operateId.createId().toString();
      state.tagsList.push({id, name});
      store.commit('saveTags');
      if (!state.isDefault) {
        return window.alert('添加成功');
      }
    },
    removeTag(state: TagState, id: string) {
      let index = -1;
      for (let i = 0; i < state.tagsList.length; i++) {
        if (state.tagsList[i].id === id) {
          index = i;
          break;
        }
      }
      if (index >= 0) {
        state.tagsList.splice(index, 1);
        store.commit('saveTags');
      } else {
        return window.alert('删除失败');
      }
    },
    updateTag(state: TagState, tag: { id: string; name: string }) {
      const {id, name} = tag;
      const idList = state.tagsList.map(item => item.id);
      if (idList.indexOf(id) >= 0) {
        const nameList = state.tagsList.map(item => item.name);
        if (nameList.indexOf(name) >= 0) {
          return window.alert('标签名重复了');
        } else {
          const tagItem = state.tagsList.filter(item => item.id === id)[0];
          tagItem.name = name;
          store.commit('saveTags');
        }
      }
    },
    setCurrentTag(state: TagState, id: string) {
      state.currentTag = state.tagsList.filter(t => t.id === id)[0];
    }
  }
};
export default tagStore;
