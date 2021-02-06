const localStorageKeyName = 'tagList';

type TagListModel = {
  data: string[];
  fetchData: () => string[];
  create: (name: string) => 'success' | 'duplicated';
  saveData: () => void;
}

const tagListModel: TagListModel = {
  data: [],
  fetchData() {
    this.data = JSON.parse(window.localStorage.getItem(localStorageKeyName) ?? '[]');
    return this.data;
  },
  saveData() {
    localStorage.setItem(localStorageKeyName, JSON.stringify(this.data));
  },
  create(name: string) {
    if (this.data.indexOf(name) >= 0) { return 'duplicated'; }
    this.data.push(name);
    this.saveData();
    return 'success';
  }
};
// export default model
// export {model}
export default tagListModel;
