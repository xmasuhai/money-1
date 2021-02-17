import operateId from '@/lib/operateId';

const localStorageKeyName = 'tagList';

const tagStore: TagListModel = {
  tagList: [] as Tag[],
  findTag(id: string) {
    return this.tagList.find(t => t.id === id) || undefined;
  },
  fetchTags() {
    this.tagList = JSON.parse(window.localStorage.getItem(localStorageKeyName) ?? '[]');
    return this.tagList;
  },
  saveTags() {
    localStorage.setItem(localStorageKeyName, JSON.stringify(this.tagList));
  },
  createTag(name: string) {
    const names = this.tagList.map(d => d.name);
    if (names.indexOf(name) >= 0) {
      window.alert('标签名重复了');
      return 'duplicated';
    }
    const id = operateId.createId().toString();
    this.tagList.push({id, name});
    this.saveTags();
    window.alert('添加成功');
    return 'success';
  },
  removeTag(id: string) {
    let index = -1;
    for (let i = 0; i < this.tagList.length; i++) {
      if (this.tagList[i].id === id) {
        index = i;
        break;
      }
    }
    this.tagList.splice(index, 1);
    this.saveTags();
    return true;
  },
  updateTag(id: string, name: string) {
    const idList = this.tagList.map(item => item.id);
    if (idList.indexOf(id) >= 0) {
      const nameList = this.tagList.map(item => item.name);
      if (nameList.indexOf(name) >= 0) {
        return 'duplicated';
      } else {
        const tag = this.tagList.filter(item => item.id === id)[0];
        tag.name = name;
        this.saveTags();
        return 'success';
      }
    } else {
      return 'not found';
    }
  },
};

tagStore.fetchTags();

export default tagStore;
