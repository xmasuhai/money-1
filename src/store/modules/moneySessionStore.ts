const moneySessionStore = {
  namespace: true,
  state() {
    return {
      tagsStore: [],
      tipsStore: '',
      dateStore: '',
      typeStore: '-',
      amountStore: '',
    };
  },
  mutations: {
    loadMoneySessionStore(state: MoneySessionStore) {
      state.tagsStore = JSON.parse(window.sessionStorage.getItem('tagsList') ?? '[]');
      state.tipsStore = JSON.parse(window.sessionStorage.getItem('tipsText') ?? '[]');
      state.dateStore = JSON.parse(window.sessionStorage.getItem('dateStore') ?? '[]');
      state.typeStore = JSON.parse(window.sessionStorage.getItem('typeStore') ?? '[]');
      state.amountStore = JSON.parse(window.sessionStorage.getItem('amountStore') ?? '[]');
    },
    saveMoneySessionStore(state: MoneySessionStore) {
      window.sessionStorage.setItem('tagsList', JSON.stringify(state.tagsStore));
      window.sessionStorage.setItem('tipsText', JSON.stringify(state.tipsStore));
      window.sessionStorage.setItem('dateStore', JSON.stringify(state.dateStore));
      window.sessionStorage.setItem('typeStore', JSON.stringify(state.typeStore));
      window.sessionStorage.setItem('amountStore', JSON.stringify(state.amountStore));
    },
    updateTagsList(state: MoneySessionStore, tagsList: Tag[]) {
      // 暂存选中的标签
      state.tagsStore = tagsList;
    },
    updateTipsText(state: MoneySessionStore, newValue: string) {
      state.tipsStore = newValue;
    },
    updateDateStore(state: MoneySessionStore, newValue: string) {
      state.dateStore = newValue;
    },
    updateTypeStore(state: MoneySessionStore, type: string) {
      state.typeStore = type;
    },
    updateMoneyStore(state: MoneySessionStore, output: string) {
      state.amountStore = output;
    },
    resetMoneySessionStore(state: MoneySessionStore) {
      state.tagsStore = [];
      state.tipsStore = {};
      state.dateStore = {};
      state.typeStore = {};
      state.amountStore = {};
    }
  }
};

export default moneySessionStore;
