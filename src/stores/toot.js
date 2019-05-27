import axios from 'axios'

export default {
  namespaced: true,
  state: {
    error: null
  },
  mutations: {
    setError(state, error) {
      state.error = error;
    }
  },
  actions: {
    async create({commit}, {oauth, status, medias}) {
      let postParams = {
        status: status,
      };

      if (medias.length) {
        postParams['media_ids'] = medias.map(media => media.id);
      }

      // https://docs.joinmastodon.org/api/rest/statuses/
      try {
        await axios.post(`${oauth.mastodon_url}/api/v1/statuses`, postParams, {
          headers: {'Authorization': `Bearer ${oauth.token}`}
        });
        commit('setError', null);
      } catch (error) {
        commit('setError', error);
      }
    },
  }
}
