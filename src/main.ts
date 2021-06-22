import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import { Component } from 'vue-property-decorator';
// 全局注册组件
import Nav from '@/components/Nav.vue';
import Layout from '@/components/Layout.vue';
import Icon from '@/components/Icon.vue';
import { DatePicker } from 'ant-design-vue';
import 'ant-design-vue/lib/date-picker/style/css';

Vue.use(DatePicker);

Vue.config.productionTip = false;

Component.registerHooks([
  'beforeRouteEnter',
  'beforeRouteLeave',
  'beforeRouteUpdate',
]);

Vue.component('Nav', Nav);
Vue.component('Layout', Layout);
Vue.component('Icon', Icon);
Vue.component('DatePicker', DatePicker);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
