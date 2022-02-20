<template>
  <div v-if="!loginPage" id="page">
    <router-view />
  </div>
  <router-view v-else />
</template>

<script>
import store from './controllers/store'

export default {
  name: 'App',
  data: function() {
    return {
        loggedIn: false
    }
  },
  store: store,
  computed: {
    loginPage() {
      return this.$route.name === 'Login'
    }
  },
}
</script>