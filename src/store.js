import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import account from './stores/account';
import oauth from './stores/oauth';

export default new Vuex.Store({
  modules: {
    account: account,
    oauth: oauth
  }
});
