import clone from '@/lib/clone';
import store from '@/store';
import clearJetLag from '@/lib/clearJetLag.ts';

const recordStore = {
  namespace: true,
  state() {
    return {
      recordList: [],
      localTimeStamp: ''
    };
  },
  mutations: {
    getLocalTimeStamp(state: recordState) {
      state.localTimeStamp = clearJetLag(new Date(), '-');
    },
    fetchRecords(state: recordState) {
      state.recordList = JSON.parse(window.localStorage.getItem('recordList') ?? '[]') as RecordItem[];
    },
    saveRecords(state: recordState) {
      window.localStorage.setItem('recordList',
        JSON.stringify(state.recordList));
    },
    createRecord(state: recordState, record: RecordItem) {
      const clonedRecord = clone(record);
      store.commit('getLocalTimeStamp');
      clonedRecord.createdAt = state.localTimeStamp;
      state.recordList.push(clonedRecord);
      store.commit('saveRecords');
    },
  }
};

export default recordStore;
