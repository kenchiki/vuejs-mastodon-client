import axios from 'axios'
import Cookies from "js-cookie";

const MASTODON_URL = 'https://gingadon.com';

export default  {
  namespaced: true,
  state: {
    timeline: []
  },
  mutations: {
    setError(state, error) {
      state.error = error;
      alert('エラー発生');
    },
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
    async toot({ dispatch, state, commit }, { status }) {
      const postParams = {
        status: status,
      };

      // https://docs.joinmastodon.org/api/rest/statuses/
      try {
        await axios.post(`${MASTODON_URL}/api/v1/statuses`, postParams,{
          headers: {'Authorization': `Bearer ${state.token}`}
        })
          .then(response => {
            dispatch('fetchTimeline')
          })
      } catch (error) {
        commit('setError', error.response.data);
        throw error.response.status;
      }
    },
  }
}
