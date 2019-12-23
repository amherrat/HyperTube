<template>
  <center>
    <!-- <div class="box has-text-centered">
        <div class="example hoverable">{{ msg }}</div>
      <div :class="type">
        <p class="has-text-weight-bold is-size-4"></p>
      </div>
    </div> -->
    <mdb-card class="card-image w-50 p-3" :style=" type === 'success' ? 'background-color: rgb(4, 132, 25,0.6);' : 'background-color: rgb(196, 40, 37,0.6);'">
    <div class="text-white text-center py-3 px-3 my-5">
      <div>
        <h2 class="card-title h1-responsive font-bold"><strong>Mail validation</strong></h2>
        <div v-if="type === 'success'">
          <font-awesome-icon :icon="['fas', 'check']" size="5x" />
        </div>
        <div v-else>
          <font-awesome-icon :icon="['fas', 'times']" size="5x"  />
        </div>
        {{msg}}
        <div v-if="type === 'success'">
        You can log in now
        <nuxt-link to="/login">
              <mdb-btn outline="white" color="white">Login Now</mdb-btn>
            </nuxt-link>
        </div>
      </div>
    </div>
  </mdb-card>
  </center>
</template>

<script>
export default {
  name: "Verify",
  data() {
    return {
      msg: "there is an error in your link!",
      type: "danger"
    };
  },
  mounted() {
    if (localStorage.token) this.$router.push({ path: "/home" });
    var email = this.$route.query.u;
    var token = this.$route.query.t;
    if (email && token) {
      this.$axios
        .post("api/confirm", { email: email, token: token })
        .then(res => {
          if (res.data.success) {
            this.msg = "your email is verified successfully. Thank you";
            this.type = "success";
            // email is verfied
          } else {
            this.msg = res.data.msg;
            this.type = "danger";
            // error
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>