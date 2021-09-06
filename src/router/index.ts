import Vue from 'vue';
import VueRouter, {RouteConfig} from 'vue-router';
// 路由组件
import Money from '@/views/Money.vue';
import Labels from '@/views/Labels.vue';
import Statistics from '@/views/Statistics.vue';
import EditLabel from '@/views/EditLabel.vue';
import NotFound from '@/views/NotFound.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    redirect: '/money'
  },
  {
    path: '/money',
    component: Money,
    beforeEnter: (to, from, next) => {
      // 读取 moneySessionStore
      // console.log('get moneySessionStore');
      next();
    },
  },
  {
    path: '/labels',
    component: Labels
  },
  {
    path: '/statistics',
    component: Statistics
  },
  {
    path: '/labels/edit/:id',
    component: EditLabel
  },
  {
    path: '*',
    component: NotFound
  }
];

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else if (to.hash) {
      return {
        selector: to.hash,
        behavior: 'smooth',
      };
    } else {
      return {x: 0, y: 0};
    }
  }
});

export default router;
