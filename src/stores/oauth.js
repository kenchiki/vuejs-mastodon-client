import axios from 'axios'
import qs from 'qs';
import Cookies from 'js-cookie';

const MASTODON_URL = 'https://gingadon.com';
const API_SCOPE = 'read write';

// client、tokenどちらを取得する際も同一のものを指定する必要あり（認証のところで無効と表示されてしまうため）
const REDIRECT_URI = 'http://localhost:8081/callback';

export default {
  namespaced: true,
  state: {
    client_id: '',
    client_secret: '',
    code: '',
    token: '',
    error: {}
  },
  mutations: {
    setError(state, error) {
      state.error = error;
      console.log('エラー発生');
    },
    restoreStorage(state) {
      state.client_id = Cookies.get('client_id');
      state.client_secret = Cookies.get('client_secret');
      state.code = Cookies.get('code');
      state.token = Cookies.get('token');
      console.log('復元完了');
    },
    setClient(state, response) {
      state.client_id = response.client_id;
      state.client_secret = response.client_secret;
      Cookies.set('client_id', response.client_id);
      Cookies.set('client_secret', response.client_secret);
      console.log('クライアント取得完了');
    },
    setCode(state, code) {
      state.code = code;
      Cookies.set('code', code);
      console.log('コード取得完了');
    },
    setToken(state, token) {
      state.token = token;
      Cookies.set('token', token);
      console.log('トークン取得完了');
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
    async fetchCode() {
      const getParams = {
        response_type: 'code',
        client_id: Cookies.get('client_id'),
        redirect_uri: REDIRECT_URI,
        scope: API_SCOPE
      };

      // https://docs.joinmastodon.org/api/authentication/#get-oauth-authorize
      const authUrl = new URL( `${MASTODON_URL}/oauth/authorize`);
      authUrl.search = qs.stringify(getParams);
      document.location = authUrl.href;
    },
    setCookieCode({ code }) {
      Cookies.set('code', code);
    },
    async fetchToken({ commit }) {
      const postParams = {
        client_id: Cookies.get('client_id'),
        client_secret: Cookies.get('client_secret'),
        grant_type: 'authorization_code',
        code: Cookies.get('code'),
        redirect_uri: REDIRECT_URI
      };

      try {
        await axios.post(`${MASTODON_URL}/oauth/token`, postParams)
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
