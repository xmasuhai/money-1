import recordListModel from '@/models/recordListModel';
import tagListModel from '@/models/tagListModel';

const store2 = {
  // record store
  recordList: recordListModel.fetchRecord(),
  createRecord: (record: RecordItem) => {
    recordListModel.createItem(record);
  },
  // tag store
  tagList: tagListModel.fetch(),
  findTag(id: string) {
    return this.tagList.find(t => t.id === id) || undefined;
  },
  createTag: (name: string) => {
    const message = tagListModel.create(name);
    if (message === 'duplicated') {
      window.alert('标签名重复了');
    } else if (message === 'success') {
      window.alert('添加成功');
    }
  },
  removeTag: (id: string) => {
    return tagListModel.remove(id);
  },
  updateTag: (id: string, name: string) => {
    return tagListModel.update(id, name);
  },
};
export default store2;
