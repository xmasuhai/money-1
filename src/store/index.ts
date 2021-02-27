import Vue from 'vue';
import Vuex from 'vuex';
import clone from '@/lib/clone';
import operateId from '@/lib/operateId';

Vue.use(Vuex);

const recordStore = new Vuex.Store({});
const tagStore = new Vuex.Store({});

const store = new Vuex.Store<RootState>({
  state: {
    tagList: [],
    recordList: [],
    currentTag: undefined,
    localTimeStamp: ''
  } as RootState,
  mutations: {
    fetchRecords(state) {
      state.recordList = JSON.parse(window.localStorage.getItem('recordList') ?? '[]') as RecordItem[];
    },
    saveRecords(state) {
      window.localStorage.setItem('recordList',
        JSON.stringify(state.recordList));
    },
    getLocalTimeStamp(state) {
      const date = new Date();
      return state.localTimeStamp = new Date(date.getTime() - (date.getTimezoneOffset() * 60000))
        .toISOString();
    },
    createRecord(state, record) {
      const clonedRecord = clone(record);
      store.commit('getLocalTimeStamp');
      clonedRecord.createdAt = store.state.localTimeStamp;
      state.recordList.push(clonedRecord);
      store.commit('saveRecords');
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
        // return 'duplicated';
      }
      const id = operateId.createId().toString();
      state.tagList.push({id, name});
      store.commit('saveTags');
      window.alert('添加成功');
      // return 'success';
    },
    removeTag(state, id: string) {
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
    updateTag(state, tag: { id: string; name: string }) {
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
    setCurrentTag(state, id: string) {
      // state.currentTag = state.tagList.find(t => t.id === id);
      state.currentTag = state.tagList.filter(t => t.id === id)[0];
    },
  },
  modules: {
    recordStore,
    tagStore
  }
});
export default store;
