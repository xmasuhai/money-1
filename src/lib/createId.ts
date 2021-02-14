let id: number = parseInt(window.localStorage.getItem('_idMax') || '0') || 0;

function createId() {
  if (JSON.parse(window.localStorage.getItem('tagList') || '').length === 0) {
    id = 0;
  }
  id++;
  window.localStorage.setItem('_idMax', id.toString());
  return id;
}

export default createId;
