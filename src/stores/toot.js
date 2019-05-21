import axios from 'axios'

export default {
  namespaced: true,
  state: {
    error: null
  },
  actions: {
    async create({ state }, {oauth, status}) {
      const postParams = {
        status: status,
      };

      // https://docs.joinmastodon.org/api/rest/statuses/
      try {
        await axios.post(`${oauth.mastodon_url}/api/v1/statuses`, postParams, {
          headers: {'Authorization': `Bearer ${oauth.token}`}
        });
        state.error = null;
      } catch (error) {
        state.error = error;
      }
    },
    // TODO:メディアはidを配列で保存しないといけないからacountじゃなくてTootというvuexに分けた方がよさそう？
    async uploadFile({state, commit}, {file}) {
      const formData = new FormData();
      formData.append('file', file);

      // https://docs.joinmastodon.org/api/rest/statuses/
      try {
        await axios.post(`${state.mastodon_url}/api/v1/media`, formData, {
          headers: {
            'Authorization': `Bearer ${state.token}`,
            'content-type': 'multipart/form-data'
          }
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
