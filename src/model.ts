const localStorageKeyName = 'recordList';
const model = {
  clone(data: RecordItem | RecordItem[]) {
    return JSON.parse(JSON.stringify(data)) as RecordItem;
  },
  fetchData() {
    return JSON.parse(window.localStorage.getItem(localStorageKeyName) ?? '[]') as RecordItem[];
  },
  saveData(data: RecordItem[]) {
    localStorage.setItem(localStorageKeyName, JSON.stringify(data));
  }
};
// export default model
// export {model}
export default model;
