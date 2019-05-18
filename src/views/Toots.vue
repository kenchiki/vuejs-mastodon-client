<template>
  <div class="toots">
    <h1>トゥート一覧</h1>
    <ul>
      <li></li>
    </ul>
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
