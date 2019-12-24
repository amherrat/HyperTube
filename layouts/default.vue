<template >
  <div class="bg">
    <Navbar v-if="pages1.indexOf($route.name) > -1"/>
    <LogedNavbar v-else-if="pages2.indexOf($route.name) > -1"/>
    <br>
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
      pages2: ["home"]
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
  /*background-color: black;*/
  /* Full height */
min-height: 100%;
background-repeat: no-repeat;
background-attachment: fixed;
background-position: center;
background-size: cover;
}
.full{
  height: 90vh;
}
</style>
