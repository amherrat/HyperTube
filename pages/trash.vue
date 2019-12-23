<template>
  <div class="classic-form-page">
    <mdb-mask class="d-flex gradient justify-content-center align-items-center">
      <mdb-container>
        <mdb-row>
          <div class="white-text text-center text-md-left col-md-6 mt-xl-5 mb-5">
            <h1 class="h1-responsive font-weight-bold">Welcome to HyperTube!</h1>
            <hr class="hr-light" />
            <h6
              class="mb-4"
            >Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem repellendus quasi fuga nesciunt dolorum nulla magnam veniam sapiente, fugiat! Commodi sequi non animi ea dolor molestiae, quisquam iste, maiores. Nulla.</h6>
            <mdb-btn outline="white" color="white">Register Now</mdb-btn>
          </div>
          <mdb-col md="6" xl="5" class="mb-4">
            <mdb-card id="classic-card">
              <mdb-card-body class="z-depth-2 grey-text">
              <form @submit.prevent="Login">
               <mdb-input label="Your login" type="text" class="mb-5" v-model="login" maxlength="30" required invalidFeedback="Please choose a username." />
                <mdb-input label="Enter password" type="password"  v-model="password" maxlength="30" class="pb-3"></mdb-input>
                <p class="font-small blue-text d-flex justify-content-end mb-5">
                  <a class="ml-1" @click="ForgetPassword(true)">Forget Password?</a>
                </p>
                <div class="text-center mb-3">
                  <mdb-btn gradient="aqua" block type="submit" >Sign In</mdb-btn>
                </div>
                <p
                  class="font-small dark-white-text text-right d-flex justify-content-center mb-3 pt-2"
                >or Sign in with:</p>
                <mdb-row center class="my-3">
                  <mdb-btn color="light-blue" class="mr-md-3 z-depth-1a" >
                    <font-awesome-icon :icon="['fab', 'google']" size="3x" />
                  </mdb-btn>
                  <mdb-btn color="black"  class="mr-md-3 z-depth-1a">
                    <img src="/42logo.svg" alt="Logo" height="42px"/>
                  </mdb-btn>
                  <mdb-btn color="dark-green"  class="mr-md-3 z-depth-1a">
                    <font-awesome-icon :icon="['fab', 'spotify']" size="3x" />
                  </mdb-btn>
                </mdb-row>
              </form>
               <!-- <form class="box" @submit.prevent="Login">
        <div v-if="confirm" class="notification is-danger">
          <button class="delete" @click="deletemsg"></button>
          Please Confirm your Email first
          <br>before login to your Account!
        </div>
        <b-field label="Login" :type="Erorrs.login.err" :message="Erorrs.login.msg">
          <b-input v-model="login" maxlength="30"></b-input>
        </b-field>
        <b-field label="Password" :type="Erorrs.password.err" :message="Erorrs.password.msg">
          <b-input type="password" v-model="password" maxlength="30" password-reveal></b-input>
        </b-field>
        <div class="level">
          <a class="level-left is-size-7" @click="ForgetPassword(true)">Forget Password?</a>
          <button type="submit" class="button is-info level-right">Submit</button>
        </div>
      </form> -->
              </mdb-card-body>
            </mdb-card>
          </mdb-col>
        </mdb-row>
      </mdb-container>
    </mdb-mask>
  </div>
</template>

<script>
export default {
  name: "Login",
  components: {},
  data() {
    return {
      login: "",
      password: "",
      confirm: false,
      Forget_Password: false,
      reset_email: "",
      loc: {
        lat: "",
        lng: "",
        addresse: ""
      },
      Erorrs: {
        login: {
          err: null,
          msg: null
        },
        password: {
          err: null,
          msg: null
        },
        reset_email: {
          err: null,
          msg: null
        }
      }
    };
  },mounted(){
  },
  methods: {
    Login() {
      console.log(this.login,this.password);
      //if (this.validate()) {
        // Call Server
        this.$axios
          .post("login", {
            user_name: this.login.toLowerCase(),
            user_password: this.password,
          })
          .then(res => {
            if (!res.data.success) {
              // error
              //console.log(res.data);
              if (res.data.error === "user") {
                this.Erorrs.login.msg = "Wrong username";
                this.Erorrs.login.err = "is-danger";
              } else if (res.data.error === "password") {
                this.Erorrs.password.msg = "Wrong password";
                this.Erorrs.password.err = "is-danger";
              } else if (res.data.error === "email") {
                this.confirm = true;
              }
            } else {
              // success
              localStorage.setItem("token", res.data.token);
              this.Erorrs.password.msg = "";
              this.Erorrs.password.err = "is-success";
              this.Erorrs.login.msg = "";
              this.Erorrs.login.err = "is-success";
              // this.$store
              //   .dispatch("login", {
              //     user: this.login
              //   })
              //   .then(data => {
              //     let imgProfil = 0;
              //     data.data.images.forEach(obj => {
              //       if (obj.image_type === "PROFIL") imgProfil = 1;
              //     });
              //     if (
              //       !data.data.user.user_gender ||
              //       !data.data.user.user_bio ||
              //       !data.data.user.user_prefer ||
              //       !imgProfil
              //     ) {
              //       window.location = "/settings/profile";
              //     } else window.location = "/dashboard";
              //   })
              //   .catch(err => {
              //     console.log(err);
              //   });
            }
          })
          .catch(err => console.log(err));
      //}
    },
    validate() {
      if (
        !String(this.login).match(/^[a-zA-Z]+([_-]?[a-zA-Z0-9])*$/g) ||
        this.login.length > 30 ||
        this.login.length < 3
      ) {
        this.Erorrs.login.err = "is-danger";
        this.Erorrs.login.msg = "please Entre a valid Username";
        return false;
      } else {
        this.Erorrs.login.err = "is-success";
        this.Erorrs.login.msg = "";
      }
      if (
        !String(this.password).match(
          /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,30}$/g
        )
      ) {
        this.Erorrs.password.err = "is-danger";
        this.Erorrs.password.msg = "Wrong Password!";
        return false;
      } else {
        this.Erorrs.password.err = "is-success";
        this.Erorrs.password.msg = "";
      }
      return true;
    },
    deletemsg() {
      this.confirm = false;
    },
    ForgetPassword(value) {
      this.Forget_Password = value;
    },
    reset() {
      if (this.validate_reset(this.reset_email)) {
        this.$http
          .post("/resetPasswd", { email: this.reset_email })
          .then(res => {
            if (res.data === "not found") {
              this.Erorrs.reset_email.err = "is-danger";
              this.Erorrs.reset_email.msg = "We dont have this email!";
            } else if (res.data === "sent") {
              this.Erorrs.reset_email.msg =
                "please click link in your email to reset your password";
            } else {
              this.Erorrs.reset_email.err = "is-danger";
              this.Erorrs.reset_email.msg =
                "There was an error. Please try again later.";
            }
            //console.log(res);
          })
          .catch(err => console.log(err));
      }
    },
    validate_reset(email) {
      if (
        !String(email).match(
          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/gi
        )
      ) {
        this.Erorrs.reset_email.err = "is-danger";
        this.Erorrs.reset_email.msg = "please Entre a valide Email";
        return false;
      } else {
        this.Erorrs.reset_email.err = "is-success";
        this.Erorrs.reset_email.msg = "";
      }
      return true;
    }
  }
};
</script>

<style scoped>
.card {
  background-color: rgba(255, 255, 255, 0.925);
}
</style>
