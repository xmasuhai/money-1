import recordStore from '@/store/recordStore.ts';
import tagStore from '@/store/tagStore.ts';

const store2 = {
  ...recordStore,
  ...tagStore,
};
export default store2;
