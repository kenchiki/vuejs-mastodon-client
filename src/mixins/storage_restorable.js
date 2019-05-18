export default {
  created() {
    this.$store.commit('oauth/restoreStorage');
    this.$store.commit('account/restoreStorage');
  }
}
