import axios from 'axios'
import Cookies from "js-cookie";

export default {
  namespaced: true,
  state: {
    timeline: [],
    token: '',
    mastodon_url: ''
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
    setMastodonUrl(state, mastodonUrl) {
      state.mastodon_url = mastodonUrl;
    },
    restoreStorage(state) {
      state.token = Cookies.get('token');
      state.mastodon_url = Cookies.get('mastodon_url');
      console.log('復元完了');
    },
  },
  actions: {
    fetchTimeline({commit, state}) {
      axios.get(`${state.mastodon_url}/api/v1/timelines/home`, {
        headers: {'Authorization': `Bearer ${state.token}`}
      }).then(response => {
        commit('setTimeline', response.data);
      })
    },
    async toot({dispatch, state, commit}, {status}) {
      const postParams = {
        status: status,
      };

      // https://docs.joinmastodon.org/api/rest/statuses/
      try {
        await axios.post(`${state.mastodon_url}/api/v1/statuses`, postParams, {
          headers: {'Authorization': `Bearer ${state.token}`}
        }).then(response => {
          console.log(response.statusText);
          // ローカル環境ではpostした直後にタイムラインを取得してもpostしたトゥートを含んだタイムラインが取得できないため、少し時間を空ける
          setTimeout(() => {
            dispatch('fetchTimeline');
          }, 200);
        })
      } catch (error) {
        commit('setError', error.response.data);
        throw error.response.status;
      }
    },
  }
}
