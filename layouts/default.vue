<template >
  <div class="bg">
    <Navbar v-if="pages1.indexOf($route.name) > -1" />
    <LogedNavbar v-else-if="pages2.indexOf($route.name) > -1" />
    <!-- <br> -->
    <nuxt class="full" />
    <Footer />
  </div>
</template>
<script>
import LogedNavbar from "~/components/LogedNavbar.vue";
import Navbar from "~/components/Navbar.vue";
import Footer from "~/components/Footer.vue";
export default {
  name: "Hello",
  components: {
    LogedNavbar,
    Navbar,
    Footer
  },
  data() {
    return {
      err: false,
      pages1: ["login", "signup", "verify", "reset", "index","forgotpassword"],
      pages2: [
        "home",
        "movie-id",
        "video-hash",
        "profile-login",
        "settings",
        "settings-update_password"
      ]
    };
  }
};
</script>

<style>
body,
html {
  height: 100%;
  background-color: black;
}
.el-slider__bar {
  background-color: #ff3636;
}
.el-slider__button {
  border: 2px solid #ff3636;
}
.bg {
  /* The image used */
  min-height: 100vh;
  background-image: url("/hyperbg.jpg");
  background-attachment: scroll;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  /* overflow-x: hidden;
  overflow-y: scroll; */
}
.full {
  padding-top: 5%;
  height: 90vh;
}
.picture-preview {
  background-color: transparent !important;
}
@media (max-width: 1100px) {
  .full {
    padding-top: 10%;
  }
}
@media (max-width: 600px) {
  .full {
    padding-top: 25%;
  }
}
</style>
