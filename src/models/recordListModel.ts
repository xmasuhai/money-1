import clone from '@/lib/clone';

const localStorageKeyName = 'recordList';
const recordListModel = {
  data: [] as RecordItem[],
  createItem(record: RecordItem) {
    const clonedRecord = clone(record);
    clonedRecord.createdAt = new Date();
    this.data.push(clonedRecord);
  },
  fetchRecord() {
    this.data = JSON.parse(
      window.localStorage
        .getItem(localStorageKeyName) ?? '[]') as RecordItem[];
    return this.data;
  },
  saveRecord() {
    window.localStorage.setItem(localStorageKeyName,
      JSON.stringify(this.data));
  }
};
export default recordListModel;
