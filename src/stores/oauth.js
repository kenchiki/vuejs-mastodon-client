import axios from 'axios'
import qs from 'qs';
import Cookies from 'js-cookie';

const API_SCOPE = 'read write';
const DEFAULT_MASTODON_URL = 'http://localhost:3000';

// client、tokenどちらを取得する際も同一のものを指定する必要あり（認証のところで無効と表示されてしまうため）
const REDIRECT_URI = 'http://localhost:8081/callback';

export default {
  namespaced: true,
  state: {
    client_id: '',
    client_secret: '',
    code: '',
    token: '',
    mastodon_url: '',
    error: {}
  },
  mutations: {
    setError(state, error) {
      state.error = error;
      alert('エラー発生');
    },
    restoreStorage(state) {
      state.client_id = Cookies.get('client_id');
      state.client_secret = Cookies.get('client_secret');
      state.code = Cookies.get('code');
      state.token = Cookies.get('token');
      state.mastodon_url = Cookies.get('mastodon_url') || DEFAULT_MASTODON_URL;
      console.log('ストレージ復元');
    },
    clearStorage(state) {
      state.client_id = '';
      state.client_secret = '';
      state.code = '';
      state.token = '';
      state.mastodon_url = DEFAULT_MASTODON_URL;
      Cookies.remove('client_id');
      Cookies.remove('client_secret');
      Cookies.remove('code');
      Cookies.remove('mastodon_url');
    },
    setClient(state, { response, mastodon_url }) {
      state.client_id = response.client_id;
      state.client_secret = response.client_secret;
      state.mastodon_url = mastodon_url;
      Cookies.set('client_id', response.client_id);
      Cookies.set('client_secret', response.client_secret);
      Cookies.set('mastodon_url', mastodon_url);
    },
    setCode(state, code) {
      state.code = code;
      Cookies.set('code', code);
    },
    setToken(state, token) {
      state.token = token;
      Cookies.set('token', token);
    },
    updateMastodonUrl(state, mastodon_url) {
      state.mastodon_url = mastodon_url;
    }
  },
  actions: {
    async fetchClient({commit, state}, {mastodon_url}) {
      const postParams = {
        client_name: 'vue test',
        redirect_uris: REDIRECT_URI,
        scopes: API_SCOPE
      };

      // https://docs.joinmastodon.org/api/rest/apps/#post-api-v1-apps
      try {
        await axios.post(`${mastodon_url}/api/v1/apps`, postParams)
          .then(response => {
            commit('setClient', {response: response.data, mastodon_url: mastodon_url});
            return response.status;
          })
      } catch (error) {
        commit('setError', error.response.data);
        throw error.response.status;
      }
    },
    async fetchCode({state}) {
      const getParams = {
        response_type: 'code',
        client_id: state.client_id,
        redirect_uri: REDIRECT_URI,
        scope: API_SCOPE
      };

      // https://docs.joinmastodon.org/api/authentication/#get-oauth-authorize
      const authUrl = new URL(`${state.mastodon_url}/oauth/authorize`);
      authUrl.search = qs.stringify(getParams);
      document.location = authUrl.href;
    },
    async fetchToken({commit, state}) {
      const postParams = {
        client_id: state.client_id,
        client_secret: state.client_secret,
        grant_type: 'authorization_code',
        code: state.code,
        redirect_uri: REDIRECT_URI
      };

      try {
        await axios.post(`${state.mastodon_url}/oauth/token`, postParams)
          .then(response => {
            commit('setToken', response.data.access_token);
            return response.status;
          })
      } catch (error) {
        commit('setError', error.response.data);
        throw error.response.status;
      }
    }
  }
}
