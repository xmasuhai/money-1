import store from '@/store';

const moneySessionStore = {
  namespace: true,
  state() {
    return {
      tagsList: [],
      tipsText: {},
      dateStore: {},
      typeStore: {},
      moneyStore: {},
    };
  },
  mutations: {
    getStore(state: MoneySession) {
      state.tagsList =  JSON.parse(window.sessionStorage.getItem('tagsList') ?? '[]');
      state.tipsText =  JSON.parse(window.sessionStorage.getItem('tipsText') ?? '[]');
    },
    saveStore(state: MoneySession) {
      window.sessionStorage.setItem('tagsList', JSON.stringify(state.tagsList));
      window.sessionStorage.setItem('tipsText', JSON.stringify(state.tagsList));
    },
    createStore(state: MoneySession) {
      console.log(state);
      store.commit('saveStore');
    },
    removeStore(state: MoneySession) {
      console.log(state);
    },
    updateStore(state: MoneySession) {
      console.log(state);
    }
  }
};

export default moneySessionStore;
