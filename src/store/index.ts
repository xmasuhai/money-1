import Vue from 'vue';
import Vuex from 'vuex';
import clone from '@/lib/clone';
import operateId from '@/lib/operateId';

Vue.use(Vuex);

const recordStore = new Vuex.Store({});
const tagStore = new Vuex.Store({});

const store = new Vuex.Store({
  state: {
    tagList: [] as Tag[],
    recordList: [] as RecordItem[]
  },
  mutations: {
    fetchRecords(state) {
      state.recordList = JSON.parse(window.localStorage.getItem('recordList') ?? '[]') as RecordItem[];
    },
    saveRecords(state) {
      window.localStorage.setItem('recordList',
        JSON.stringify(state.recordList));
    },
    createRecord(state, record) {
      const clonedRecord = clone(record);
      clonedRecord.createdAt = new Date();
      state.recordList.push(clonedRecord);
      store.commit('saveRecords');
    },
    findTag(state, id: string) {
      return state.tagList.find(t => t.id === id) || undefined;
    },
    fetchTags(state) {
      return state.tagList = JSON.parse(window.localStorage.getItem('tagList') ?? '[]');
    },
    saveTags(state) {
      localStorage.setItem('tagList', JSON.stringify(state.tagList));
    },
    createTag(state, name: string) {
      const names = state.tagList.map(d => d.name);
      if (names.indexOf(name) >= 0) {
        window.alert('标签名重复了');
        return 'duplicated';
      }
      const id = operateId.createId().toString();
      state.tagList.push({id, name});
      store.commit('saveTags');
      window.alert('添加成功');
      return 'success';
    },
    removeTag(state, id: string) {
      let index = -1;
      for (let i = 0; i < state.tagList.length; i++) {
        if (state.tagList[i].id === id) {
          index = i;
          break;
        }
      }
      state.tagList.splice(index, 1);
      store.commit('saveTags');
      return true;
    },
    updateTag(state, tag) {
      const idList = state.tagList.map(item => item.id);
      if (idList.indexOf(tag.id) >= 0) {
        const nameList = state.tagList.map(item => item.name);
        if (nameList.indexOf(tag.name) >= 0) {
          return 'duplicated';
        } else {
          const tagItem = state.tagList.filter(item => item.id === tag.id)[0];
          tagItem.name = tag.name;
          store.commit('saveTags');
          return 'success';
        }
      } else {
        return 'not found';
      }
    }
  },
  modules: {
    recordStore,
    tagStore
  }
});
export default store;
