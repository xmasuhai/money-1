import store from '@/store';

const StatisticsStore = {
  namespace: true,
  state() {
    return {
      triggerMethod: 'click',
      groupedResult: []
    };
  },
  mutations: {
    trigger(state: StatisticsState) {
      console.log(state.triggerMethod);
    }
  },
  getters: {
    groupedList(state: StatisticsState) {
      store.commit('trigger');
      console.log(state);
      return state;
    },
    switchTriggerMethod(state: StatisticsState) {
      store.commit('trigger');
      console.log(state.triggerMethod);
      return state;
    },
    myChartOption(state: StatisticsState) {
      store.commit('trigger');
      console.log(state.groupedResult);
      return state;
    },
  }
};

export default StatisticsStore;
