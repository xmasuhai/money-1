function clone(data: any) {
  return JSON.parse(JSON.stringify(data)) as RecordItem;
}

export default clone;
