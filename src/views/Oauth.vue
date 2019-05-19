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

  </div>
</template>

<script>
  import {mapActions, mapState, mapMutations } from 'vuex';
  import storageRestorable from '../mixins/storage_restorable.js'

  export default {
    mixins: [storageRestorable],
    computed: {
      ...mapState({
        mastodon_url: state => state.oauth.mastodon_url
      })
    },
    methods: {
      ...mapActions({
        fetchClient: 'oauth/fetchClient',
        fetchCode: 'oauth/fetchCode'
      }),
      ...mapMutations({
        clearStorage: 'oauth/clearStorage'
      }),
      fetchToken() {
        this.$store.dispatch('oauth/fetchToken').then(statusCode => {
          this.$store.commit('account/setToken', this.$store.state.oauth.token);
          this.$store.commit('account/setMastodonUrl', this.$store.state.oauth.mastodon_url);
        });
      }
    }
  }
</script>
