type RecordItem = {
  tags: string[];
  tips: string;
  type: string;
  amount: number;
  createdAt?: Date;
}
type Tag = {
  id: string;
  name: string;
}
type TagListModel = {
  tagList: Tag[];
  fetchTags: () => Tag[];
  findTag: (id: string) => Tag | undefined;
  createTag: (name: string) => 'success' | 'duplicated';
  saveTags: () => void;
  updateTag: (id: string, name: string) => 'success' | 'not found' | 'duplicated';
  removeTag: (id: string) => boolean;
}
type RootState = {
  tagList: Tag[];
  recordList: RecordItem[];
  currentTag?: Tag;
}
