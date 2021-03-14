type TapEvent =  MouseEvent | TouchEvent;
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
type tagState = {
  tagList: Tag[];
  currentTag: Tag;
  isDefault: boolean;
  createTagError: Error | null;
}
type recordState = {
  recordList: RecordItem[];
  localTimeStamp: string;
  createRecordError?: Error | null;
}
type DataSource = { text: string; type: string }
type groupedType = { title: string; total?: number; items: RecordItem[] };
