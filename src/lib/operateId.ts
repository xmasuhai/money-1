const operateId = {
  id: parseInt(window.localStorage.getItem('_idMax') || '0') || 0,
  clearId() {
    this.id = 0;
    window.localStorage.setItem('_idMax', this.id.toString());
  },
  createId() {
    console.log(this.id);
    this.id += 1;
    window.localStorage.setItem('_idMax', this.id.toString());
    return this.id;
  }
};

export default operateId;
