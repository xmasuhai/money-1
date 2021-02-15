const operateId = {
  id: parseInt(window.localStorage.getItem('_idMax') || '0') || 0,
  /*
  clearId() {
      if (JSON.parse(window.localStorage.getItem('tagList') || '[]').length === 0) {
        this.id = 0;
        window.localStorage.setItem('_idMax', this.id.toString());
        console.log(window.localStorage.getItem('tagList'));
      }
    },
  */
  createId() {
    this.id += 1;
    window.localStorage.setItem('_idMax', this.id.toString());
    return this.id;
  }
};

export default operateId;
