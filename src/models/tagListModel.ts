import createId from '@/lib/createId';

const localStorageKeyName = 'tagList';
type Tag = {
  id: string;
  name: string;
}
type TagListModel = {
  data: Tag[];
  fetch: () => Tag[];
  create: (name: string) => 'success' | 'duplicated';
  save: () => void;
  update: (id: string, name: string) => 'success' | 'not found' | 'duplicated';
  remove: (id: string) => boolean;
}

// return this.data | 'success' | 'duplicated' | 'not found'
const tagListModel: TagListModel = {
  data: [],
  save() {
    localStorage.setItem(localStorageKeyName, JSON.stringify(this.data));
  },
  fetch: function () {
    this.data = JSON.parse(window.localStorage.getItem(localStorageKeyName) ?? '[]');
    this.data.forEach(item => {
      if (item.id === '') {
        this.remove(item.id);
        this.data.splice(this.data.indexOf(item), 1);
        console.log(this.data);
      }
    });
    return this.data;
  },
  create(name: string) {
    // this.data = [{id: '1', name: '1'}, {id: '2', name: '2'}]
    const names = this.data.map(d => d.name);
    if (names.indexOf(name) >= 0) { return 'duplicated'; }
    const id = createId().toString();
    this.data.push({id, name: name});
    this.save();
    return 'success';
  },
  update(id: string, name: string) {
    const idList = this.data.map(item => item.id);
    if (idList.indexOf(id) >= 0) {
      const nameList = this.data.map(item => item.name);
      if (nameList.indexOf(name) >= 0) {
        return 'duplicated';
      } else {
        const tag = this.data.filter(item => item.id === id)[0];
        tag.name = name;
        tag.id = name;
        this.save();
        return 'success';
      }
    } else {
      return 'not found';
    }
  },
  remove(id: string) {
    let index = -1;
    for (let i = 0; i < this.data.length; i++) {
      if (this.data[i].id === id) {
        index = i;
        break;
      }
    }
    this.data.splice(index, 1);
    this.save();
    return true;
  }
};
export default tagListModel;
