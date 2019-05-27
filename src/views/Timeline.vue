<template>
  <div class="timeline">
    <div class="error" v-if="error">
      {{ error.response.data.error }}
    </div>
    <div class="new-toot">
      <p>
        <textarea v-model="status" class="new-toot__status"></textarea>
      </p>
      <ul class="medias" v-if="medias.length">
        <li v-for="media in medias" v-bind:key="media.id">
          <img v-bind:src="media.preview_url" alt="">
        </li>
      </ul>
      <p>
        <input type="file" @change="uploadFile">
      </p>

      <Drawing v-on:drew="uploadCanvas" />

      <p>
        <input type="button" value="トゥート！" v-on:click="createToot">
      </p>
    </div>

    <ul class="toots">
      <li v-for="toot in toots" v-bind:key="toot.id">
        <dl class="toots__toot">
          <dt class="toots__title">{{ toot.account.display_name }}</dt>
          <dd v-html="toot.content"></dd>
          <ul class="medias" v-if="toot.media_attachments.length">
            <li v-for="media in toot.media_attachments" v-bind:key="media.id">
              <img v-bind:src="media.preview_url" alt="">
            </li>
          </ul>
        </dl>
      </li>
    </ul>
  </div>
</template>

<script>
  import {mapState} from 'vuex';
  import storageRestorable from '../mixins/storage_restorable.js'
  import Drawing from '@/components/Drawing.vue'

  export default {
    mixins: [storageRestorable],
    data: function () {
      return {
        status: '',
        error: null,
      }
    },
    components: {
      Drawing
    },
    computed: {
      ...mapState({
        toots: state => state.timeline.toots,
        medias: state => state.media.medias
      })
    },
    methods: {
      async createToot() {
        await this.$store.dispatch('toot/create', {
          oauth: this.$store.state.oauth,
          status: this.status,
          medias: this.$store.state.media.medias
        });
        this.error = this.$store.state.toot.error;
        this.$store.commit('media/clearMedias');
        this.status = '';
      },
      async uploadFile(e) {
        e.preventDefault();
        const file = e.target.files[0];
        await this.$store.dispatch('media/uploadFile', {
          oauth: this.$store.state.oauth,
          file: file
        });
        this.error = this.$store.state.media.error;
        e.target.value = '';// 未選択状態にする
      },
      async uploadCanvas(canvas) {
        await this.$store.dispatch('media/uploadCanvas', {
          oauth: this.$store.state.oauth,
          canvas: canvas
        });
        this.error = this.$store.state.media.error;
      },
    },
    created() {
      this.$store.dispatch('timeline/fetchTimeline', {
        oauth: this.$store.state.oauth,
      });
      this.$store.dispatch('timeline/streamingTimeline', {
        oauth: this.$store.state.oauth,
      });
    },
    destroyed() {
      this.$store.commit('timeline/disconnectSocket');
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

  .medias {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: flex-start;
    list-style: none;

    & > * {
      width: 25%;
    }

    img {
      width: 100%;
    }
  }
</style>
