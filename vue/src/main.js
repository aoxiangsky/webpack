import Vue from 'vue';
import store from './store';
import router from './router';
import Entry from './index.vue';
// import '@/assets/fonts/iconfont.js';
import vuetify from '@/plugins/vuetify';

Vue.config.productionTip = false;
new Vue({
    router,
    store,
    vuetify,
    render: (h) => h(Entry)
}).$mount('#root');
