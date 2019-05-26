import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import timeline from './stores/timeline';
import oauth from './stores/oauth';
import toot from './stores/toot';
import media from './stores/media';

export default new Vuex.Store({
  modules: {
    timeline: timeline,
    oauth: oauth,
    toot: toot,
    media: media
  }
});
