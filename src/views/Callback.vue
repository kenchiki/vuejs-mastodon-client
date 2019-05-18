<template>
  <div class="callback">
    <h1>認証</h1>
  </div>
</template>

<script>
  import storageRestorable from '../mixins/storage_restorable.js'

  export default {
    mixins: [storageRestorable],
    created() {
      this.$store.commit('oauth/setCode', this.$route.query.code);
      this.$router.push({name: 'oauth'});
    }
  }
</script>
