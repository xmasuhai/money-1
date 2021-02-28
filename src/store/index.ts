import Vue from 'vue';
import Vuex from 'vuex';
import tagStore from '@/store/modules/tagStore.ts';
import recordStore from '@/store/modules/recordStore.ts';

Vue.use(Vuex);

const store = new Vuex.Store(
  {
    modules: {
      recordStore,
      tagStore
    }
  });
export default store;
