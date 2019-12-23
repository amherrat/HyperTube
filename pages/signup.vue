<template>
  <!-- <div v-if="!confirm" class="columns is-centered">
    <div class="is-half">
      <form class="box" @submit.prevent="Signup">
        <b-field label="Full Name" :type="Errors.fullname.err" :message="Errors.fullname.msg">
          <b-input v-model="fullname" maxlength="30"></b-input>
        </b-field>
        <b-field :type="Errors.date.err" :message="Errors.date.msg" label="Birthdate">
          <b-datepicker v-model="date" placeholder="Click to select..."></b-datepicker>
        </b-field>
        <b-field label="Username" :type="Errors.username.err" :message="Errors.username.msg">
          <b-input v-model="username" maxlength="30" autocomplete="new-username"></b-input>
        </b-field>
        <b-field label="Email" :type="Errors.email.err" :message="Errors.email.msg">
          <b-input type="email" v-model="email" maxlength="50" autocomplete="new-mail"></b-input>
        </b-field>
        <b-field label="Password" :type="Errors.password.err" :message="Errors.password.msg">
          <b-input
            type="password"
            v-model="password"
            maxlength="30"
            autocomplete="new-password"
            password-reveal
          ></b-input>
        </b-field>
        <b-message v-if="err" type="is-danger">
          YOU HAVE AN ERROR PLEASE TRY AGAIN!
          <br />OR RELOAD PAGE!
        </b-message>
        <div class="level-right">
          <button type="submit" class="button is-success">Submit</button>
        </div>
      </form>
    </div>
  </div>
  <div class="columns is-centered" v-else>
    <div class="box has-text-success has-text-centered">
      <p
        class="has-text-weight-bold is-size-4"
      >Please Click link on your email, to confirm your account!</p>
    </div>
  </div>-->
  <div class="classic-form-page">
    <mdb-mask class="d-flex gradient justify-content-center align-items-center">
      <mdb-container>
        <mdb-row>
          <div class="white-text text-center text-md-left col-md-6 mt-xl-5 mb-5">
            <h1 class="h1-responsive font-weight-bold">Hypertube Signup</h1>
            <hr class="hr-light" />
            <h6
              class="mb-4"
            >if you already have an account or you wish to login with your google account,42,sptify....</h6>
            <nuxt-link to="/login">
              <mdb-btn outline="white" color="white">Login Now</mdb-btn>
            </nuxt-link>
          </div>
          <mdb-col md="6" xl="5" class="mb-4">
            <mdb-card id="classic-card">
              <mdb-card-body class="z-depth-2 grey-text">
                <form @submit.prevent="Signup">
                  <!-- <mdb-input label="Your login" type="text" class="mb-5" v-model="login" maxlength="30" required invalidFeedback="Please choose a username." />
                  <mdb-input label="Enter password" type="password"  v-model="password" maxlength="30" class="pb-3"></mdb-input>-->
                  <!-- <mdb-row>
                    <mdb-col>
                      <center>
                        <vue-core-image-upload
    class="btn btn-primary"
    :crop="true"
    @imageuploaded="imageuploaded"
    :data="src"
    :max-file-size="5242880"
    url="/api/create_profile_img" >
                        </vue-core-image-upload>
                        <div v-if="!image">
                          <label class="custom-file-upload btn btn-default ripple-parent">
                            <input type="file" @change="onFileChange" />
                            <font-awesome-icon :icon="['fas', 'upload']" size="1x" />Custom Upload
                          </label>
                        </div>
                        <div v-else>
                          <img :src="image" class="avatar" />
                          <br />
                          <mdb-btn @click="removeImage">Remove image</mdb-btn>
                        </div>
                      </center>
                    </mdb-col>
                  </mdb-row>-->
                  <mdb-row>
                    <mdb-col>
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
                    </mdb-col>
                  </mdb-row>
                  <mdb-row>
                    <mdb-col>
                      <mdb-input
                        type="text"
                        label="First name"
                        v-model="customValues.fname"
                        :customValidation="validation.fname.validated"
                        :isValid="validation.fname.valid"
                        @change="validate('fname')"
                        validFeedback="First name look's good."
                        :invalidFeedback="validation.fname.invalidFeedback"
                      />
                    </mdb-col>
                    <mdb-col>
                      <mdb-input
                        type="text"
                        label="Last name"
                        v-model="customValues.lname"
                        :customValidation="validation.lname.validated"
                        :isValid="validation.lname.valid"
                        @change="validate('lname')"
                        validFeedback="Last name look's good."
                        :invalidFeedback="validation.lname.invalidFeedback"
                      />
                    </mdb-col>
                  </mdb-row>
                  <mdb-row>
                    <mdb-col>
                      <mdb-input
                        type="email"
                        label="Email"
                        v-model="customValues.mail"
                        :customValidation="validation.mail.validated"
                        :isValid="validation.mail.valid"
                        @change="validate('mail')"
                        validFeedback="email look's good."
                        :invalidFeedback="validation.mail.invalidFeedback"
                      />
                    </mdb-col>
                  </mdb-row>
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
                  <p class="font-small blue-text d-flex justify-content-end mb-5">
                    <a class="ml-1" @click="ForgetPassword(true)">Forget Password?</a>
                  </p>
                  <div class="text-center mb-3">
                    <mdb-btn gradient="aqua" block type="submit">Sign up</mdb-btn>
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
import FilePondDemo from "../components/FilePondDemo.vue";
export default {
  name: "Signup",
  components: {
    FilePondDemo
  },
  data() {
    return {
      image: "",
      customValues: {
        login: "",
        fname: "",
        lname: "",
        mail: "",
        password: ""
      },
      err: false,
      confirm: false,
      validation: {
        login: {
          valid: false,
          validated: false,
          invalidFeedback: ""
        },
        fname: {
          valid: false,
          validated: false,
          invalidFeedback: ""
        },
        lname: {
          valid: false,
          validated: false,
          invalidFeedback: ""
        },
        mail: {
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
    //if (localStorage.token) this.$router.push({ path: "/dashboard" });
  },
  methods: {
    validateForm() {
      Object.keys(this.customValues).forEach(key => {
        this.validate(key);
      });
    },
    isValidForm() {
      return new Promise((reject, resolve)=>{
        Object.keys(this.validation).forEach((key)=> {
          if (!this.validation[key].valid) {
            resolve(false);
          }
        });
        reject(true);
      })
    },
    Signup() {
      //this.validateForm();
      this.isValidForm().then((res) => {
        this.$axios
          .post("/api/signup", {
            login: this.customValues.login,
            fname: this.customValues.fname,
            lname: this.customValues.lname,
            mail: this.customValues.mail,
            password: this.customValues.password
          })
          .then(res => {
            if (!res.data.success) {
              console.log(res.data);
              if (res.data.errors) {
                if (res.data.errors === "login already exist") {
                  this.validation.login.valid = false;
                  this.validation.login.invalidFeedback = "login already exist";
                  this.validation.login.validated = true;
                }
                if (res.data.errors === "mail already exist") {
                  this.validation.mail.valid = false;
                  this.validation.mail.invalidFeedback = "mail already exist";
                  this.validation.mail.validated = true;
                }
                //     this.Errors.username.err = "is-danger";
                //     this.Errors.username.msg = "this username already exists";
                //   } else if (res.data.error === "mail exist") {
                //     this.Errors.email.err = "is-danger";
                //     this.Errors.email.msg = "this email already exists";
                //   }
                // } else this.err = true;
              } else {
                console.log(res.data);
                //this.confirm = true;
              }
            }
          })
          .catch(err => console.log(err));
      }).catch(err => {})
    },
    validate(key, value) {
      if (key === "login") {
        if (
          !String(this.customValues[key]).match(
            /^[a-zA-Z]+([_-]?[a-zA-Z0-9])*$/g
          ) ||
          this.customValues[key].length > 30 ||
          this.customValues[key].length < 3
        ) {
          this.validation[key].valid = false;
          this.validation[key].invalidFeedback = "Wrong login.";
        } else {
          this.validation[key].valid = true;
        }
        this.validation[key].validated = true;
      }
      //First Name
      if (key === "fname") {
        if (
          !String(this.customValues[key]).match(
            /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/g
          ) ||
          this.customValues[key].length > 30 ||
          this.customValues[key].length < 3
        ) {
          this.validation[key].valid = false;
          this.validation[key].invalidFeedback = "First name not valid.";
        } else {
          this.validation[key].valid = true;
        }
        this.validation[key].validated = true;
      }
      //Last Name
      if (key === "lname") {
        if (
          !String(this.customValues[key]).match(
            /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/g
          ) ||
          this.customValues[key].length > 30 ||
          this.customValues[key].length < 3
        ) {
          this.validation[key].valid = false;
          this.validation[key].invalidFeedback = "Last name not valid.";
        } else {
          this.validation[key].valid = true;
        }
        this.validation[key].validated = true;
      }
      //Mail
      if (key === "mail") {
        if (
          !String(this.customValues[key]).match(
            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/gi
          ) ||
          this.customValues[key].length > 30 ||
          this.customValues[key].length < 5
        ) {
          this.validation[key].valid = false;
          this.validation[key].invalidFeedback = "Email not valid.";
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
    }
  }
};
</script>

<style scoped>
.avatar {
  vertical-align: middle;
  width: 120px;
  height: 120px;
  border-radius: 50%;
}
input[type="file"] {
  display: none;
}
.custom-file-upload {
  border: 1px solid #ccc;
  display: inline-block;
  /*padding: 6px 12px;*/
  cursor: pointer;
}
</style>
