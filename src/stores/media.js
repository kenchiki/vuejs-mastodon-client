import axios from 'axios'

export default {
  namespaced: true,
  state: {
    error: null,
    medias: []
  },
  mutations: {
    clearMedias(state) {
      state.medias = []
    }
  },
  actions: {
    async uploadFile({state}, {oauth, file}) {
      const formData = new FormData();
      formData.append('file', file);

      // https://docs.joinmastodon.org/api/rest/statuses/
      try {
        const response = await axios.post(`${oauth.mastodon_url}/api/v1/media`, formData, {
          headers: {
            'Authorization': `Bearer ${oauth.token}`,
            'content-type': 'multipart/form-data'
          }
        });

        state.medias.push(response.data);
        state.error = null;
      } catch (error) {
        state.error = error;
      }
    },
  }
}
