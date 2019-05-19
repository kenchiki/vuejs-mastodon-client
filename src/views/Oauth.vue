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
  import { mapState } from 'vuex';
  import storageRestorable from '../mixins/storage_restorable.js'

  export default {
    mixins: [storageRestorable],
    computed: {
      ...mapState({
        mastodon_url: state => state.oauth.mastodon_url
      })
    },
    methods: {
      fetchClient() {
        this.$store.dispatch('oauth/fetchClient').then(statusCode => {
          alert('クライアント取得完了');
        });
      },
      fetchCode() {
        this.$store.dispatch('oauth/fetchCode').then(statusCode => {
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
          alert('トークン取得完了');
        });
      }
    }
  }
</script>
