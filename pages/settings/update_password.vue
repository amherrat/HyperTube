<template>
  <div class="classic-form-page">
    <br />
    <mdb-mask class="d-flex gradient justify-content-center align-items-center">
      <mdb-container>
        <mdb-row>
          <div class="white-text text-center text-md-left col-md-6 mt-xl-5 mb-5">
            <h1 class="h1-responsive font-weight-bold">{{$t('Update password')}}</h1>
            <hr class="hr-light" />
            <h6 class="mb-4">{{$t('Update password msg')}}</h6>
            <!-- <nuxt-link to="/login">
              <mdb-btn outline="white" color="white">Login Now</mdb-btn>
            </nuxt-link>-->
          </div>
          <mdb-col md="6" xl="5" class="mb-4">
            <mdb-card id="classic-card">
              <mdb-card-body class="z-depth-2 grey-text">
                <form @submit.prevent="Update_password">
                  <mdb-row>
                    <mdb-col>
                      <mdb-input
                        type="password"
                        :label="$t('Old password')"
                        v-model="customValues.oldpassword"
                        :customValidation="validation.oldpassword.validated"
                        :isValid="validation.oldpassword.valid"
                        @change="validate('oldpassword')"
                        validFeedback="password look's good"
                        :invalidFeedback="$t(validation.oldpassword.invalidFeedback)"
                      />
                    </mdb-col>
                  </mdb-row>
                  <mdb-row>
                    <mdb-col>
                      <mdb-input
                        type="password"
                        :label="$t('Password')"
                        v-model="customValues.password"
                        :customValidation="validation.password.validated"
                        :isValid="validation.password.valid"
                        @change="validate('password')"
                        validFeedback="password look's good"
                        :invalidFeedback="$t(validation.password.invalidFeedback)"
                      />
                    </mdb-col>
                  </mdb-row>
                  <mdb-row>
                    <mdb-col>
                      <mdb-input
                        type="password"
                         :label="$t('Confirm password')"
                        v-model="customValues.confirmpassword"
                        :customValidation="validation.confirmpassword.validated"
                        :isValid="validation.confirmpassword.valid"
                        @change="validate('confirmpassword')"
                        validFeedback="password look's good"
                        :invalidFeedback="$t(validation.confirmpassword.invalidFeedback)"
                      />
                    </mdb-col>
                  </mdb-row>
                  <div class="text-center mb-3">
                    <mdb-btn gradient="aqua" block type="submit">{{$t('Update')}}</mdb-btn>
                  </div>
                </form>
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
  name: "update_password",
  head() {
		return {
		title: this.$t('title_Update_Password')
		};
	},
  data() {
    return {
      done: false,
      customValues: {
        oldpassword: "",
        password: "",
        confirmpassword: ""
      },
      validation: {
        oldpassword: {
          valid: false,
          validated: false,
          invalidFeedback: ""
        },
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
  methods: {
    validateForm() {
      Object.keys(this.customValues).forEach(key => {
        this.validate(key);
      });
    },
    isValidForm() {
      return new Promise((reject, resolve) => {
        Object.keys(this.validation).forEach(key => {
          if (!this.validation[key].valid) {
            resolve(false);
          }
        });
        reject(true);
      });
    },
    Update_password() {
      //this.validateForm();
      this.isValidForm()
        .then(res => {
          this.$axios
            .put("/api/updatepassword", {
              oldpassword: this.customValues.oldpassword,
              password: this.customValues.password
            })
            .then(res => {
              console.log(res.data);
              if (!res.data.success) {
                if (res.data.errors) {
                  if (res.data.errors.error === "password") {
                    this.validation.oldpassword.valid = false;
                    this.validation.oldpassword.invalidFeedback =
                      res.data.errors.msg;
                    this.validation.oldpassword.validated = true;
                  }
                }
              } else {
                //Success
                console.log(res.data);
                //this.confirm = true;
              }
            })
            .catch(err => console.log(err));
        })
        .catch(err => {});
    },
    validate(key, value) {
      //Check Upper case check Lower case check Number check special character
      const regexer = [
        {
          regex: /[a-z]+/,
          error: "Password should contain at least one lowercase character"
        },
        {
          regex: /[A-Z]+/,
          error: "Password should contain at least one uppercase character"
        },
        {
          regex: /[0-9]+/,
          error: "Password should contain at least one number"
        },
        {
          regex: /[#$^+=!*()@%&]+/,
          error: "Password should contain at least one special character"
        }
      ];
      //oldPassword
      if (key === "oldpassword") {
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
            "Password too short, Type at least 8 letters";
        }
        this.validation[key].validated = true;
      }
      //Password
      if (key === "password") {
        if (this.customValues[key].length > 7) {
          for (let item of regexer) {
            if (!String(this.customValues[key]).match(item.regex)) {
              this.validation[key].valid = false;
              this.validation[key].invalidFeedback = item.error;
              break;
            }
            if (!this.customValues[key].match(this.customValues.oldpassword))
              this.validation[key].valid = true;
            else {
              this.validation[key].valid = false;
              this.validation[key].invalidFeedback =
                "New password match the old one";
            }
          }
        } else {
          this.validation[key].valid = false;
          this.validation[key].invalidFeedback =
            "Password too short. Type at least 8 letters";
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
              this.validation[key].invalidFeedback = "Passwords doesn't match";
            }
          }
        } else {
          this.validation[key].valid = false;
          this.validation[key].invalidFeedback =
            "Password too short. Type at least 8 letters";
        }
        this.validation[key].validated = true;
      }
      this.validation[key].validated = true;
    }
  }
};
</script>

<style scoped>
</style>
