<template>
  <div class="classic-form-page">
    <br>
    <mdb-mask class="d-flex gradient justify-content-center align-items-center">
      <mdb-container>
        <mdb-row>
          <div class="white-text text-center text-md-left col-md-6 mt-xl-5 mb-5">
            <h1 class="h1-responsive font-weight-bold">Welcome to HyperTube!</h1>
            <hr class="hr-light" />
            <h6
              class="mb-4"
            >Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem repellendus quasi fuga nesciunt dolorum nulla magnam veniam sapiente, fugiat! Commodi sequi non animi ea dolor molestiae, quisquam iste, maiores. Nulla.</h6>
             <nuxt-link to="/signup"><mdb-btn outline="white" color="white" >Register Now</mdb-btn></nuxt-link>
          </div>
          <mdb-col md="6" xl="5" class="mb-4">
            <mdb-card id="classic-card">
              <mdb-card-body class="z-depth-2 grey-text">
                <form @submit.prevent="Login">
                  <mdb-input
                    type="text"
                    label="login"
                    v-model="customValues.login"
                    :customValidation="validation.login.validated"
                    :isValid="validation.login.valid"
                    @change="validate('login')"
                    
                    validFeedback="login look's good."
                    :invalidFeedback="validation.login.invalidFeedback"
                  />
                  <mdb-input
                    type="password"
                    autocomplete="on"
                    label="Password"
                    v-model="customValues.password"
                    :customValidation="validation.password.validated"
                    :isValid="validation.password.valid"
                    @change="validate('password')"
                    
                    validFeedback="password look's good."
                    :invalidFeedback="validation.password.invalidFeedback"
                  />
                  <p class="font-small blue-text d-flex justify-content-end mb-5">
                    <nuxt-link to="forgotpassword">Forget Password?</nuxt-link>
                    <!-- <a class="ml-1" @click="ForgetPassword()">Forget Password?</a> -->
                  </p>
                  <div class="text-center mb-3">
                    <mdb-btn gradient="aqua" block type="submit">Sign In</mdb-btn>
                  </div>
                </form>
                  <p
                    class="font-small dark-white-text text-right d-flex justify-content-center mb-3 pt-2"
                  >or Sign in with:</p>
                  <mdb-row center class="my-3">
                     <a href="api/auth/google"><mdb-btn color="light-blue" class="mr-md-3 z-depth-1a">
                     <font-awesome-icon :icon="['fab', 'google']" size="3x" />
                    </mdb-btn></a>
                    <a href="api/auth/42"> <mdb-btn color="black" class="mr-md-3 z-depth-1a">
                      <img src="/42logo.svg" alt="Logo" height="42px" />
                    </mdb-btn></a>
                    <a href="api/auth/spotify"><mdb-btn color="dark-green" class="mr-md-3 z-depth-1a">
                      <font-awesome-icon :icon="['fab', 'spotify']" size="3x" />
                    </mdb-btn></a>
                  </mdb-row>
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
  head() {
		return {
		title: this.$t('title_Login')
		};
	},
  components: {},
  data() {
    return {
      customValues: {
        login: "",
        password: ""
      },
      confirm: false,
      Forget_Password: false,
      reset_email: "",
      validation: {
        login: {
          valid: false,
          validated: false,
          invalidFeedback: ""
        },
        password: {
          valid: false,
          validated: false,
          invalidFeedback: ""
        }
      }
    };
  },
  mounted() {
      if (localStorage.token) this.$router.push({ path: "/home" });
  },
  methods: {
    Login() {
      this.isValidForm().then(
        res => {
          this.$axios
            .post("api/authenticate", {
              login: this.customValues.login.toLowerCase(),
              password: this.customValues.password
            })
            .then(res => {
              if (!res.data.success) {
                //console.log(res.data.errors);
                if(res.data.errors)
                {
                if (res.data.errors.error === "login") {
                      this.validation.login.valid = false;
                      this.validation.login.invalidFeedback = res.data.errors.msg;
                      //this.validation.login.validated = true;
                } else if (res.data.errors.error === "password") {
                      this.validation.password.valid = false;
                      this.validation.password.invalidFeedback = res.data.errors.msg;
                     // this.validation.login.validated = true;
                } 
                else if (res.data.errors.error === "mail") {
                      this.validation.login.valid = false;
                      this.validation.login.invalidFeedback = res.data.errors.msg;
                      //this.validation.login.validated = true;
                }
                }
              } else {
                // success
                localStorage.setItem("token", res.data.token);
                this.$router.push({ path: "/home" });
                //console.log("DONE")
              }
            })
            .catch(err => {}//console.log(err)
            );
        }
      ).catch(err=> {
      })
        //console.log("tried to log");
      //}
    },
     isValidForm() {
      return new Promise((reject, resolve)=>{
        Object.keys(this.validation).forEach((key)=> {
          if (!this.validation[key].valid) {
            resolve(false);
          }
        });
        reject(true);
      })}
      ,
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
          .catch(err => {} /*console.log(err)*/);
      }
    },
    validate_reset(email) {
      if (!email ||
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
    },
    validateForm() {
      Object.keys(this.customValues).forEach(key => {
        this.validate(key);
      });
    },
    validate(key, value) {
      if (key === "login") {
        if (!this.customValues[key] || !String(this.customValues[key]).match(/^[a-zA-Z]+([_-]?[a-zA-Z0-9])*$/g) ||
        this.customValues[key].length > 30 ||
        this.customValues[key].length < 3) {
            this.validation[key].valid = false;
            this.validation[key].invalidFeedback =
            "Wrong login.";
        } else {
          this.validation[key].valid = true;
        }
        this.validation[key].validated = true;
      }
      //Check Upper case check Lower case check Number check special character
      const regexer = [
        {
          regex: /[a-z]+/,
          error: "Password should contain at least one lowercase character."
        },
        {
          regex: /[A-Z]+/,
          error: "Password should contain at least one uppercase character."
        },
        {
          regex: /[0-9]+/,
          error: "Password should contain at least one number."
        },
        {
          regex: /[#$^+=!*()@%&]+/,
          error: "Password should contain at least one special character."
        }
      ];
      //Password
      if (key === "password") {
        if (!this.customValues[key] || this.customValues[key].length > 7) {
          for (let item of regexer) {
            if (!String(this.customValues[key]).match(item.regex)) {
              this.validation[key].valid = false;
              this.validation[key].invalidFeedback = item.error;
              break;
            }
            this.validation[key].valid = true;
          }
        } else {
          this.validation[key].valid = false;
          this.validation[key].invalidFeedback =
            "Password too short. Type at least 8 letters.";
        }
        this.validation[key].validated = true;
      }
    }
  }
};
</script>

<style scoped>
.card {
  background-color: rgba(255, 255, 255, 0.925);
}
</style>
