<template>
  <div class="oauth">
    <h1>認証</h1>
    <input type="button" value="クライアント取得" v-on:click="fetchClient">
    <input type="button" value="コード取得" v-on:click="fetchCode">
    <input type="button" value="トークン取得" v-on:click="fetchToken">
  </div>
</template>

<script>
  import {mapActions, mapState} from 'vuex';
  import storageRestorable from '../mixins/storage_restorable.js'

  export default {
    mixins: [storageRestorable],
    computed: {
      ...mapState({
      })
    },
    methods: {
      ...mapActions({
        fetchClient: 'oauth/fetchClient',
        fetchCode: 'oauth/fetchCode',
        fetchToken: 'oauth/fetchToken',
      })
    }
  }
</script>
