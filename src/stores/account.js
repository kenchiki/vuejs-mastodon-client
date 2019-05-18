import axios from 'axios'
import Cookies from "js-cookie";

const MASTODON_URL = 'https://gingadon.com';

export default  {
  namespaced: true,
  state: {
    timeline: []
  },
  mutations: {
    setTimeline(state, timeline) {
      state.timeline = timeline
    },
    setToken(state, token) {
      state.token = token;
      Cookies.set('token', token);
      alert('トークン取得完了');
    },
    restoreStorage(state) {
      state.token = Cookies.get('token');
      console.log('復元完了');
    },
  },
  actions: {
    fetchTimeline({ commit, state }) {
      axios.get(`${MASTODON_URL}/api/v1/timelines/home`, {
        headers: {'Authorization': `Bearer ${state.token}`}
      }).then(response => {
        commit('setTimeline', response.data)
      })
    },
  }
}
