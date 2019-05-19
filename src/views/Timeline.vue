<template>
  <div class="timeline">
    <div class="new-toot">
      <p>
        <textarea v-model="toot.status" class="new-toot__status"></textarea>
      </p>
      <p>
        <input type="button" value="トゥート！" v-on:click="toot">
      </p>
    </div>

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
  import { mapState } from 'vuex';
  import storageRestorable from '../mixins/storage_restorable.js'

  export default {
    mixins: [storageRestorable],
    computed: {
      ...mapState({
        timeline: state => state.account.timeline
      })
    },
    methods: {
      toot() {
        this.$store.dispatch('account/toot', { status: this.toot.status });
        this.toot.status = '';
      }
    },
    created() {
      this.$store.dispatch('account/fetchTimeline');
    }
  }
</script>

<style scoped lang="scss">
  .timeline {
    width: 500px;
    margin: 0 auto;

    & > * {
      margin: 0;
      padding: 0;
    }
  }
  .toots {
    width: 100%;
    text-align: left;
    list-style: none;
  }
  .toots__toot {
    background: #eee;
    padding: 20px;
  }
  .toots__title {
    font-weight: bold;
  }

  .new-toot__status {
    width: 100%;
    height: 10em;
  }
</style>
