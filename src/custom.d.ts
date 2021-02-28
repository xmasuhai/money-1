type RecordItem = {
  tags: Tag[];
  tips: string;
  type: string;
  amount: number;
  createdAt: string;
}
type Tag = {
  id: string;
  name: string;
}
type RootState = {
  tagList: Tag[];
  recordList: RecordItem[];
  currentTag?: Tag;
  localTimeStamp: string;
}
type DataSource = { text: string; type: string }

type tagState = {
  tagList: Tag[];
  currentTag: Tag;
}
type recordState = {
  recordList: RecordItem[];
  localTimeStamp: string;
}