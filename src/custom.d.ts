type RecordItem = {
  tags: string[];
  tips: string;
  type: string;
  amount: number;
  createdAt?: string;
}
type Tag = {
  id: string;
  name: string;
}
type RootState = {
  tagList: Tag[];
  recordList: RecordItem[];
  currentTag?: Tag;
}
type DataSource = { text: string; type: string }
