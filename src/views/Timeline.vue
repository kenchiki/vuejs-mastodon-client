<template>
  <div>
    <h1>タイムライン</h1>
    <ul class="toots">
      <li v-for="toot in timeline" v-bind:key="toot.id">
        <dl class="toots__toot">
          <dt class="toots__title">{{ toot.account.display_name }}</dt>
          <dd v-html="toot.content"></dd>
        </dl>

      </li>
    </ul>
  </div>
</template>

<script>
  import {mapState} from 'vuex';
  import storageRestorable from '../mixins/storage_restorable.js'

  export default {
    mixins: [storageRestorable],
    computed: {
      ...mapState({
        timeline: state => state.account.timeline
      })
    },
    created() {
      this.$store.dispatch('account/fetchTimeline');
    }
  }
</script>

<style scoped lang="scss">
  .toots {
    width: 500px;
    text-align: left;
    margin: 0 auto;
  }
  .toots__toot {
    background: #eee;
    padding: 20px;
  }
  .toots__title {
    font-weight: bold;
  }
</style>
