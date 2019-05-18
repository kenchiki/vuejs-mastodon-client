import axios from 'axios'
import qs from 'qs';

const MASTODON_URL = 'https://gingadon.com';
const API_SCOPE = 'read write';

// client、tokenどちらを取得する際も同一のものを指定する必要あり（認証のところで無効と表示されてしまうため）
const REDIRECT_URI = 'http://localhost:8081/callback';

export default {
  namespaced: true,
  state: {
    client_id: '',
    client_secret: '',
    token: '',
    error: {}
  },
  mutations: {
    setError(state, error) {
      state.error = error;
      alert('エラー発生');
    },
    setClient(state, response) {
      state.client_id = response.client_id;
      state.client_secret = response.client_secret;
      alert('クライアント取得完了');
    },
    setToken(state, token) {
      state.token = token;
    }
  },
  actions: {
    async fetchClient({commit}) {
      const postParams = {
        client_name: 'vue test',
        redirect_uris: REDIRECT_URI,
        scopes: API_SCOPE
      };

      // https://docs.joinmastodon.org/api/rest/apps/#post-api-v1-apps
      try {
        await axios.post(`${MASTODON_URL}/api/v1/apps`, postParams)
          .then(response => {
            commit('setClient', response.data);
            return response.status;
          })
      } catch (error) {
        commit('setError', error.response.data);
        throw error.response.status;
      }
    },
    async fetchToken({ state }) {
      const getParams = {
        response_type: 'code',
        client_id: state.client_id,
        redirect_uri: REDIRECT_URI,
        scope: API_SCOPE
      };

      // https://docs.joinmastodon.org/api/authentication/#get-oauth-authorize
      const authUrl = new URL( `${MASTODON_URL}/oauth/authorize`);
      authUrl.search = qs.stringify(getParams);
      document.location = authUrl.href;
    }
  }
}
