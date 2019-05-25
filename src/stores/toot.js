import axios from 'axios'

// TODO:mediaも別のstoreに分けたい
export default {
  namespaced: true,
  state: {
    error: null,
    medias: []
  },
  actions: {
    async create({ state }, {oauth, status}) {
      let postParams = {
        status: status,
      };

      if(state.medias.length) {
        postParams['media_ids'] = state.medias.map(media => media.id);
      }

      // https://docs.joinmastodon.org/api/rest/statuses/
      try {
        await axios.post(`${oauth.mastodon_url}/api/v1/statuses`, postParams, {
          headers: {'Authorization': `Bearer ${oauth.token}`}
        });
        state.error = null;
      } catch (error) {
        state.error = error;
      } finally {
        state.medias = [];
      }
    },
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
