import axios from 'axios'
import Cookies from "js-cookie";

export default {
  namespaced: true,
  state: {
    timeline: [],
    token: '',
    socket: null,
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
    setOauth(state, oauth) {
      state.token = oauth.token;
      state.mastodon_url = oauth.mastodon_url;
      Cookies.set('token', oauth.token);
    },
    setSocket(state, socket) {
      state.socket = socket;
    },
    disconnectSocket(state) {
      state.socket.close();
      state.socket = null;
    },
    restoreStorage(state) {
      state.token = Cookies.get('token');
      state.mastodon_url = Cookies.get('mastodon_url');
      console.log('復元完了');
    },
    clearStorage(state) {
      state.token = '';
      state.mastodon_url = '';
      Cookies.remove('token');
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
    streamingTimeline({ commit, state }) {
      //https://docs.joinmastodon.org/api/streaming/#get-api-v1-streaming-user
      const socket = new WebSocket(`ws://localhost:4000/api/v1/streaming/?stream=user&access_token=${state.token}`);
      socket.addEventListener('message', function (event) {
        const responce = JSON.parse(event.data);
        if(responce.event === 'update') {
          state.timeline.unshift(JSON.parse(responce.payload));
          console.log('Message from server ', responce);
        }
      });
      commit('setSocket', socket);
    },
    async createToot({state, commit}, {status}) {
      const postParams = {
        status: status,
      };

      // https://docs.joinmastodon.org/api/rest/statuses/
      try {
        await axios.post(`${state.mastodon_url}/api/v1/statuses`, postParams, {
          headers: {'Authorization': `Bearer ${state.token}`}
        }).then(response => {
          console.log(response.statusText);
        })
      } catch (error) {
        commit('setError', error.response.data);
        throw error.response.status;
      }
    },
  }
}
