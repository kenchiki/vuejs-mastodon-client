<template>
  <div class="oauth">
    <h1>認証</h1>
    <input type="button" value="クライアント取得" v-on:click="fetchClient">
    <input type="button" value="アクセストークン取得" v-on:click="fetchToken">
  </div>
</template>

<script>
  import {mapActions, mapState} from 'vuex';

  export default {
    computed: {
      ...mapState({
      })
    },
    methods: {
      ...mapActions({
        fetchClient: 'oauth/fetchClient',
        fetchToken: 'oauth/fetchToken'
      })
    }
  }
</script>
