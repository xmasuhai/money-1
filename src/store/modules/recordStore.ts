import clone from '@/lib/clone';
import store from '@/store';

const recordStore = {
  namespace: true,
  state: {
    recordList: [],
    localTimeStamp: ''
  },
  mutations: {
    fetchRecords(state: recordState) {
      state.recordList = JSON.parse(window.localStorage.getItem('recordList') ?? '[]') as RecordItem[];
    },
    saveRecords(state: recordState) {
      window.localStorage.setItem('recordList',
        JSON.stringify(state.recordList));
    },
    getLocalTimeStamp(state: recordState) {
      const date = new Date();
      state.localTimeStamp = new Date(date.getTime() - (date.getTimezoneOffset() * 60000))
        .toISOString();
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
