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
      pages2: ["home", "movie-id", "video-hash","profile-login","settings"]
    };
  }
};
</script>

<style>
body, html {
  height: 100%;
  background-color: black;
}
.el-slider__bar{
  background-color: #ff3636;
}
.el-slider__button{
  border: 2px solid #ff3636;
}
.bg {
  /* The image used */


}
.full{
  height: 90vh;
}
</style>
