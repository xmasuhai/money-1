import clone from '@/lib/clone';
import store from '@/store';
import clearJetLag from '@/lib/clearJetLag.ts';

const recordStore = {
  namespace: true,
  state() {
    return {
      recordList: [],
      localTimeStamp: '',
      createRecordError: null
    };
  },
  mutations: {
    getLocalTimeStamp(state: RecordState) {
      state.localTimeStamp = clearJetLag(new Date(), '-');
    },
    fetchRecords(state: RecordState) {
      state.recordList = JSON.parse(window.localStorage.getItem('recordList') ?? '[]') as RecordItem[];
    },
    saveRecords(state: RecordState) {
      window.localStorage.setItem('recordList',
        JSON.stringify(state.recordList));
    },
    createRecord(state: RecordState, record: RecordItem) {
      const clonedRecord = clone(record);
      store.commit('getLocalTimeStamp');
      // 不覆盖原来的日期记录
      clonedRecord.createdAt = clonedRecord.createdAt || state.localTimeStamp;
      state.recordList.push(clonedRecord);
      store.commit('saveRecords');
    },
  }
};

export default recordStore;
