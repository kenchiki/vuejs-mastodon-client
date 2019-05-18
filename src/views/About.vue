<template>
  <div class="about">
    <h1>Vue製 マストドン クライアント</h1>
    <p>認証、一覧表示、トゥート</p>
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
