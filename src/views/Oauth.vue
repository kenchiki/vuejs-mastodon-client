<template>
  <div class="oauth">
    <h1>認証</h1>
    <div class="error" v-if="error">
      {{ error.response.data.error }}
    </div>
    <p>
      <input type="text" v-model="mastodon_url">
    </p>
    <p>
      <input type="button" value="クライアント取得" v-on:click="fetchClient">
      <input type="button" value="コード取得" v-on:click="fetchCode">
      <input type="button" value="トークン取得" v-on:click="fetchToken">
      <input type="button" value="インスタンス情報取得" v-on:click="fetchInstance">
    </p>
    <p>
      <input type="button" value="認証情報を削除" v-on:click="clearStorage">
    </p>
    <ul>
      <li v-show="client_id">client ok!</li>
      <li v-show="code">code ok!</li>
      <li v-show="token">token ok!</li>
      <li v-show="streaming_url">streaming_url ok!</li>
    </ul>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import storageRestorable from '../mixins/storage_restorable.js'

  export default {
    mixins: [storageRestorable],
    data: function () {
      return {
        error: null
      }
    },
    computed: {
      ...mapState({
        client_id: state => state.oauth.client_id,
        code: state => state.oauth.code,
        token: state => state.oauth.token,
        streaming_url: state => state.oauth.streaming_url
      }),
      mastodon_url: {
        get () {
          return this.$store.state.oauth.mastodon_url
        },
        set (value) {
          this.$store.commit('oauth/setMastodonUrl', value);
        }
      }
    },
    methods: {
      async fetchClient() {
        await this.$store.dispatch('oauth/fetchClient', { mastodon_url: this.mastodon_url });
      },
      async fetchCode() {
        await this.$store.dispatch('oauth/fetchCode');
      },
      clearStorage() {
        this.$store.commit('oauth/clearStorage');
      },
      async fetchToken() {
        await this.$store.dispatch('oauth/fetchToken');
        this.error = this.$store.state.oauth.error;
      },
      async fetchInstance() {
        await this.$store.dispatch('oauth/fetchInstance');
        this.error = this.$store.state.oauth.error;
      }
    }
  }
</script>
