const localStorageKeyName = 'recordList'
const model = {
  fetchData() {
    return JSON.parse(window.localStorage.getItem(localStorageKeyName) ?? '[]')
  },
  saveData(data: RecordItem[]) {
    localStorage.setItem(localStorageKeyName, JSON.stringify(data))
  }
}
// export default model
// export {model}
export default model;
