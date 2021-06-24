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
      console.log('-----------------');
      state.tagsList = JSON.parse(window.sessionStorage.getItem('tagsList') ?? '[]');
      state.tipsText = JSON.parse(window.sessionStorage.getItem('tipsText') ?? '[]');
      state.dateStore = JSON.parse(window.sessionStorage.getItem('dateStore') ?? '[]');
      state.typeStore = JSON.parse(window.sessionStorage.getItem('typeStore') ?? '[]');
      state.moneyStore = JSON.parse(window.sessionStorage.getItem('moneyStore') ?? '[]');
      console.log('state.tagsList: ', state.tagsList);
      console.log('state.tipsText: ', state.tipsText);
      console.log('state.dateStore: ', state.dateStore);
      console.log('state.typeStore: ', state.typeStore);
      console.log('state.moneyStore: ', state.moneyStore);
      // 并且 更新数据 渲染到页面
    },
    saveMoneySessionStore(state: MoneySession) {
      window.sessionStorage.setItem('tagsList', JSON.stringify(state.tagsList));
      window.sessionStorage.setItem('tipsText', JSON.stringify(state.tipsText));
      window.sessionStorage.setItem('dateStore', JSON.stringify(state.dateStore));
      window.sessionStorage.setItem('typeStore', JSON.stringify(state.typeStore));
      window.sessionStorage.setItem('moneyStore', JSON.stringify(state.moneyStore));
    },
    updateTagsList(state: MoneySession, tagsList: Tag[]) {
      // 暂存选中的标签
      state.tagsList = tagsList;
      console.log('updateTagsList: ', state.tagsList);
    },
    updateTipsText(state: MoneySession, newValue: string) {
      state.tipsText = newValue;
      console.log('updateTipsText:', state.tipsText);
    },
    updateDateStore(state: MoneySession, newValue: string) {
      state.dateStore = newValue;
      console.log('updateDateStore: ', state.dateStore);
    },
    updateTypeStore(state: MoneySession, type: string) {
      state.typeStore = type;
      console.log('updateTypeStore', state.typeStore);
    },
    updateMoneyStore(state: MoneySession, output: string) {
      state.moneyStore = output.slice(1);
      console.log('updateMoneyStore', state.moneyStore);
    },
    resetMoneySessionStore(state: MoneySession) {
      state.tagsList = [];
      state.tipsText = {};
      state.dateStore = {};
      state.typeStore = {};
      state.moneyStore = {};
    }
  }
};

export default moneySessionStore;
