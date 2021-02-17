import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    count: 0,
  },
  mutations: {
    increaseCount(state) {
      state.count += 1;
    },
    increaseN(state, n: number, m = 20) {
      state.count += n;
      console.log(`m: ${m}`);
    },
  },
  actions: {},
  modules: {}
});

export default store;

console.log(store.state.count);
store.commit('increaseCount');
console.log(store.state.count);
store.commit('increaseN', 10); // +10 操作
console.log(store.state.count); // 11
