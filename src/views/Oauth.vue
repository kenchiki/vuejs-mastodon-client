<template>
  <div class="oauth">
    <h1>認証</h1>
    <input type="button" value="クライアント取得" v-on:click="fetchClient">
    <input type="button" value="コード取得" v-on:click="fetchCode">
    <input type="button" value="トークン取得" v-on:click="fetchToken">
  </div>
</template>

<script>
  import {mapActions} from 'vuex';
  import storageRestorable from '../mixins/storage_restorable.js'

  export default {
    mixins: [storageRestorable],
    methods: {
      ...mapActions({
        fetchClient: 'oauth/fetchClient',
        fetchCode: 'oauth/fetchCode'
      }),
      fetchToken() {
        this.$store.dispatch('oauth/fetchToken');
        this.$store.commit('account/setToken', this.$store.state.oauth.token);
      }
    }
  }
</script>
