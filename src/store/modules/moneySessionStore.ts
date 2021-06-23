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
    loadMoneySessionStore(state: MoneySession) {
      console.log("loadMoneySessionStore");
      state.tagsList = JSON.parse(window.sessionStorage.getItem('tagsList') ?? '[]');
      state.tipsText = JSON.parse(window.sessionStorage.getItem('tipsText') ?? '[]');
      state.dateStore = JSON.parse(window.sessionStorage.getItem('dateStore') ?? '[]');
      state.typeStore = JSON.parse(window.sessionStorage.getItem('typeStore') ?? '[]');
      state.moneyStore = JSON.parse(window.sessionStorage.getItem('moneyStore') ?? '[]');
    },
    saveMoneySessionStore(state: MoneySession) {
      store.commit('updateTagsList');
      store.commit('updateTipsText');
      store.commit('updateTagsList');
      store.commit('updateDateStore');
      store.commit('updateTypeStore');
      store.commit('updateMoneyStore');
      window.sessionStorage.setItem('tagsList', JSON.stringify(state.tagsList));
      window.sessionStorage.setItem('tipsText', JSON.stringify(state.tipsText));
      window.sessionStorage.setItem('dateStore', JSON.stringify(state.dateStore));
      window.sessionStorage.setItem('typeStore', JSON.stringify(state.typeStore));
      window.sessionStorage.setItem('moneyStore', JSON.stringify(state.moneyStore));
    },
    updateTagsList(state: MoneySession) {
      console.log('updateTagsList', state.tagsList);
    },
    updateTipsText(state: MoneySession) {
      console.log('updateTipsText', state.tipsText);
    },
    updateDateStore(state: MoneySession) {
      console.log('updateDateStore', state.dateStore);
    },
    updateTypeStore(state: MoneySession) {
      console.log('updateTypeStore', state.typeStore);
    },
    updateMoneyStore(state: MoneySession) {
      console.log('updateMoneyStore', state.moneyStore);
    }
  }
};

export default moneySessionStore;
