<template>
  <div class="row welcome-msg">Welcome back, {{this.user.firstName}}</div>
</template>

<script>
import {User} from '../controllers/data'
import store from './controllers/store'

export default {
  store: store,
  data() {
    return {
        user: User
    };
  },
  components: {
    Navbar,
    Footer
  },
  mounted() {
      // Grab the active user ID
      const user = this.$store.getters.getActiveUser;
      this.user = User.UserFromObject(user);
  },
  async beforeCreate() {
      if(!this.$storage.getStorageSync("login")){ 
          this.$router.push('/login');
      }
      else {
          // Grab the active user ID
      const user = this.$store.getters.getActiveUser;
      this.user = User.UserFromObject(user);
      }
  }
}
</script>

<style scoped>
.welcome-msg {
  margin-top: 3em;
  margin-bottom: 1em;
}
</style>
