<template >
  <div class="bg">
    <Navbar v-if="pages1.indexOf($route.name) > -1"/>
    <LogedNavbar v-else-if="pages2.indexOf($route.name) > -1"/>
    <!-- <br> -->
    <nuxt class="full"/>
    <Footer/>
  </div>
</template>
<script>
import LogedNavbar from '~/components/LogedNavbar.vue'
import Navbar from '~/components/Navbar.vue'
import Footer from '~/components/Footer.vue'
export default {
  name: "Hello",
  components: {
    LogedNavbar,Navbar,
    Footer
  },
  data() {
    return {
      err: false,
      pages1: ["login", "signup", "verify", "reset","index"],
      pages2: ["home", "movie-id", "video-hash"]
    };
  }
};
</script>

<style>
body, html {
  height: 100%;
}

.bg {
  /* The image used */
  background-image: url('/hyperbg.jpg');
  /* Full height */
  min-height: 100vh;
  background-attachment: scroll;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  overflow-x: hidden;
  overflow-y: scroll;
}
.full{
  height: 90vh;
}
</style>
