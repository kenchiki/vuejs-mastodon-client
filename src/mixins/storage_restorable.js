export default {
  created() {
    this.$store.commit('oauth/restoreStorage');
  }
}
