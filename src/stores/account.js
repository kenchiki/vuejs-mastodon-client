import axios from 'axios'

const MASTODON_URL = 'https://gingadon.com';

export default  {
  namespaced: true,
  state: {
    timeline: []
  },
  mutations: {
    setTimeline(state, localTimeline) {
      state.localTimeline = localTimeline
    },
  },
  actions: {
    fetchTimeline({ commit }) {
      axios.get(`${MASTODON_URL}/api/v1/timelines/home`).then(response => {
        commit('setTimeline', response.data)
      })
    },
  }
}
