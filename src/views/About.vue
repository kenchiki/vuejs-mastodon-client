<template>
  <div class="about">
    <h1>This is an about page {{ test }}</h1>
  </div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    computed: mapState({
      test: state => state.account.test
    })
  }
</script>
