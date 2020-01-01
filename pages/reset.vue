<template>
  <div class="classic-form-page">
    <br />
    <mdb-mask class="d-flex gradient justify-content-center align-items-center">
      <mdb-container>
        <mdb-row>
          <div class="white-text text-center text-md-left col-md-6 mt-xl-5 mb-5">
            <h1 class="h1-responsive font-weight-bold">Reset Password</h1>
            <hr class="hr-light" />
            <h6 class="mb-4">you can reset your password here</h6>
            <!-- <nuxt-link to="/login">
              <mdb-btn outline="white" color="white">Login Now</mdb-btn>
            </nuxt-link>-->
          </div>
          <mdb-col md="6" xl="5" class="mb-4">
            <mdb-card id="classic-card">
              <mdb-card-body class="z-depth-2 grey-text">
                <form v-if="validreset && !done" @submit.prevent="Reset_password">
                  <mdb-row>
                    <mdb-col>
                      <mdb-input
                        type="password"
                        label="Password"
                        v-model="customValues.password"
                        :customValidation="validation.password.validated"
                        :isValid="validation.password.valid"
                        @change="validate('password')"
                        validFeedback="password look's good."
                        :invalidFeedback="validation.password.invalidFeedback"
                      />
                    </mdb-col>
                  </mdb-row>
                  <mdb-row>
                    <mdb-col>
                      <mdb-input
                        type="password"
                        label="Confirm password"
                        v-model="customValues.confirmpassword"
                        :customValidation="validation.confirmpassword.validated"
                        :isValid="validation.confirmpassword.valid"
                        @change="validate('confirmpassword')"
                        validFeedback="password look's good."
                        :invalidFeedback="validation.confirmpassword.invalidFeedback"
                      />
                    </mdb-col>
                  </mdb-row>
                  <div class="text-center mb-3">
                    <mdb-btn gradient="aqua" block type="submit">Update</mdb-btn>
                  </div>
                </form>
                <div v-if="!validreset" class="red-text text-center">
                  <center>
                    <font-awesome-icon :icon="['fas', 'times']" size="5x" />
                    <br />Something went wrong please check again your link.
                  </center>
                </div>
                <div v-if="done" class="green-text text-center">
                  <center>
                    <font-awesome-icon :icon="['fas', 'check']" size="5x" />
                    <br />Your password have been succcessfully reset.
                    <br>
                    <nuxt-link to="/login">
                      <mdb-btn outline="green" color="green">Login Now</mdb-btn>
                    </nuxt-link>
                  </center>
                </div>
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
  name: "reset_password",
  data() {
    return {
      done:false,
      validreset: false,
      customValues: {
        password: "",
        confirmpassword: ""
      },
      validation: {
        password: {
          valid: false,
          validated: false,
          invalidFeedback: ""
        },
        confirmpassword: {
          valid: false,
          validated: false,
          invalidFeedback: ""
        }
      }
    };
  },
  mounted() {
    if (localStorage.token) this.$router.push({ path: "/home" });
    var email = this.$route.query.e;
    var token = this.$route.query.t;
    if (email && token) {
      this.$axios
        .post("api/confirmresetpassword", { email: email, passwdtoken: token })
        .then(res => {
          if (res.data.success) this.validreset = true;
        });
    }
  },
  methods: {
    Reset_password() {
      console.log("Dkhal khouna");
      var email = this.$route.query.e;
      var token = this.$route.query.t;
      this.isValidForm()
        .then(res => {
          this.$axios
            .post("/api/changepassword", {
              mail: email,
              token: token,
              password: this.customValues.password
            })
            .then(res => {
              console.log(res);
               if (res.data.success)
                this.done = true;
              //   if (res.data.errors) {
              //     if (res.data.errors.error === "password") {
              //       this.validation.oldpassword.valid = false;
              //       this.validation.oldpassword.invalidFeedback =
              //         res.data.errors.msg;
              //       this.validation.oldpassword.validated = true;
              //     }
              //   }
              // } else {
              //   //Success
              //   console.log(res.data);
              //   //this.confirm = true;
              // }
            })
            .catch(err => console.log(err));
        })
        .catch(err => {});
    },
    validateForm() {
      Object.keys(this.customValues).forEach(key => {
        this.validate(key);
      });
    },isValidForm() {
      return new Promise((reject, resolve)=>{
        Object.keys(this.validation).forEach((key)=> {
          if (!this.validation[key].valid) {
            resolve(false);
          }
        });
        reject(true);
      })
    },
    validate(key, value) {
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
        if (this.customValues[key].length > 7) {
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
      //Confirm password
      if (key === "confirmpassword") {
        if (this.customValues[key].length > 7) {
          for (let item of regexer) {
            if (!String(this.customValues[key]).match(item.regex)) {
              this.validation[key].valid = false;
              this.validation[key].invalidFeedback = item.error;
              break;
            }
            if (this.customValues[key].match(this.customValues.password))
              this.validation[key].valid = true;
            else {
              this.validation[key].valid = false;
              this.validation[key].invalidFeedback = "Passwords doesn't match.";
            }
          }
        } else {
          this.validation[key].valid = false;
          this.validation[key].invalidFeedback =
            "Password too short. Type at least 8 letters.";
        }
        this.validation[key].validated = true;
      }
      this.validation[key].validated = true;
    }
  }
};
</script>