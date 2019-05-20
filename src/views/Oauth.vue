<template>
  <div class="oauth">
    <h1>認証</h1>
    <p>
      <input type="text" v-model="mastodon_url">
    </p>
    <p>
      <input type="button" value="クライアント取得" v-on:click="fetchClient">
      <input type="button" value="コード取得" v-on:click="fetchCode">
      <input type="button" value="トークン取得" v-on:click="fetchToken">
      <input type="button" value="認証情報を削除" v-on:click="clearStorage">
    </p>
    <ul>
      <li v-show="client_id">client ok!</li>
      <li v-show="code">code ok!</li>
      <li v-show="token">token ok!</li>
    </ul>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import storageRestorable from '../mixins/storage_restorable.js'

  export default {
    mixins: [storageRestorable],
    computed: {
      ...mapState({
        client_id: state => state.oauth.client_id,
        code: state => state.oauth.code,
        token: state => state.oauth.token,
      }),
      mastodon_url: {
        get () {
          return this.$store.state.oauth.mastodon_url
        },
        set (value) {
          this.$store.commit('oauth/updateMastodonUrl', value);
        }
      }
    },
    methods: {
      fetchClient() {
        this.$store.dispatch('oauth/fetchClient', { mastodon_url: this.mastodon_url }).then(statusCode => {
          console.log(statusCode);
          alert('クライアント取得完了');
        });
      },
      fetchCode() {
        this.$store.dispatch('oauth/fetchCode').then(statusCode => {
          console.log(statusCode);
          alert('コード取得完了');
        });
      },
      clearStorage() {
        this.$store.commit('oauth/clearStorage');
        this.$store.commit('account/clearStorage');
        alert('ストレージ削除');
      },
      fetchToken() {
        this.$store.dispatch('oauth/fetchToken').then(statusCode => {
          this.$store.commit('account/setOauth', this.$store.state.oauth);
          console.log(statusCode);
          alert('トークン取得完了');
        });
      }
    }
  }
</script>
