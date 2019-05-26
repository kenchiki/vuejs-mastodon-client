import axios from 'axios'

export default {
  namespaced: true,
  state: {
    toots: [],
    socket: null
  },
  mutations: {
    setToots(state, toots) {
      state.toots = toots
    },
    setSocket(state, socket) {
      state.socket = socket;
    },
    disconnectSocket(state) {
      state.socket.close();
      state.socket = null;
    },
  },
  actions: {
    fetchTimeline({ commit }, { oauth }) {
      axios.get(`${oauth.mastodon_url}/api/v1/timelines/home`, {
        headers: {'Authorization': `Bearer ${oauth.token}`}
      }).then(response => {
        commit('setToots', response.data);
      })
    },
    streamingTimeline({commit, state}, { oauth }) {
      //https://docs.joinmastodon.org/api/streaming/#get-api-v1-streaming-user
      const socket = new WebSocket(`ws://localhost:4000/api/v1/streaming/?stream=user&access_token=${oauth.token}`);
      socket.addEventListener('message', function (event) {
        const response = JSON.parse(event.data);
        if (response.event === 'update') {
          state.toots.unshift(JSON.parse(response.payload));
          console.log('Message from server ', response);
        }
      });
      commit('setSocket', socket);
    },
  }
}
