<template>
  <div class="callback">
    <h1>認証</h1>
  </div>
</template>

<script>
  export default {
    created() {
      this.$store.commit('oauth/setToken', this.$route.query.code);
      this.$router.push({ name: 'toots' });
    }
  }
</script>
