type TapEvent = MouseEvent | TouchEvent;
type BundleEventString = 'inputNum' | 'removeNum' | 'clearNum' | 'confirmNum';
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
type TagState = {
  tagsList: Tag[];
  currentTag: Tag;
  isDefault: boolean;
  createTagError: Error | null;
}
type RecordState = {
  recordList: RecordItem[];
  localTimeStamp: string;
  createRecordError?: Error | null;
}
type DataSource = {
  text: string;
  type: string;
}
type GroupedType = {
  title: string;
  total?: number;
  items: RecordItem[];
};

// type CheckInputNum = (button: HTMLButtonElement, input: string, event: TapEvent)
//   => { return(output: string) };

type MoneySession = {
  tagsList: Tag[];
  tipsText: {};
  dateStore: {};
  typeStore: {};
  moneyStore: {};
}
