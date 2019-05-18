<template>
  <div class="toots">
    <h1>タイムライン</h1>
    <ul>
      <li v-for="toot in timeline" v-bind:key="toot.id">
        {{ toot.title }}
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
