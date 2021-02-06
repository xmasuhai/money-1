const localStorageKeyName = 'tagList';
type Tag = {
  id: string;
  name: string;
}
type TagListModel = {
  data: Tag[];
  fetchData: () => Tag[];
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
    // this.data = [{id: '1', name: '1'}, {id: '2', name: '2'}]
    const names = this.data.map(d => d.name);
    if (names.indexOf(name) >= 0) { return 'duplicated'; }
    this.data.push({id: name, name: name});
    this.saveData();
    return 'success';
  }
};
export default tagListModel;
