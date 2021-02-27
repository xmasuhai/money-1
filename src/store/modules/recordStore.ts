/*
import clone from '@/lib/clone';
import store from '@/store';

type State = {
  recordList: RecordItem[],
  localTimeStamp: string
}
*/
const recordStore = {/*
  // namespace: true,
  state: {
    recordList: [],
    localTimeStamp: ''
  },
  mutations: {
    fetchRecords(state: State) {
      state.recordList = JSON.parse(window.localStorage.getItem('recordList') ?? '[]') as RecordItem[];
    },
    saveRecords(state: State) {
      window.localStorage.setItem('recordList',
        JSON.stringify(state.recordList));
    },
    getLocalTimeStamp(state: State) {
      const date = new Date();
      return state.localTimeStamp = new Date(date.getTime() - (date.getTimezoneOffset() * 60000))
        .toISOString();
    },
    createRecord(state: State, record: RecordItem) {
      const clonedRecord = clone(record);
      store.commit('getLocalTimeStamp');
      clonedRecord.createdAt = state.localTimeStamp;
      state.recordList.push(clonedRecord);
      store.commit('saveRecords');
    },
  }*/
}

export default recordStore;
