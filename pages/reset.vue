<template>

<mdb-card id="classic-card">
              <mdb-card-body class="z-depth-2 grey-text">
              <!-- <form @submit.prevent="Login">
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
              </form> -->
              <form @submit.prevent="validateForm" novalidate>
    <mdb-input
      type="text"
      id="customInput1"
      label="First name"
      v-model="customValues.name"
      :customValidation="validation.name.validated"
      :isValid="validation.name.valid"
      @change="validate('name')"
      required
      validFeedback="Look's good."
      invalidFeedback="Please correct."
    />
    <mdb-input
      type="text"
      id="customInput2"
      label="Last name"
      v-model="customValues.lastname"
      :customValidation="validation.lastname.validated"
      :isValid="validation.lastname.valid"
      @change="validate('lastname')"
      required
      validFeedback="Look's good."
      invalidFeedback="Please correct."
    />
    <mdb-input
      type="email"
      id="customInput3"
      label="Country"
      v-model="customValues.country"
      :customValidation="validation.country.validated"
      :isValid="validation.country.valid"
      @change="validate('country')"
      required
      validFeedback="Look's good."
      invalidFeedback="Country should be one of those: USA, France, Poland"
    />
    <mdb-input
      type="password"
      id="customInput4"
      label="Password"
      v-model="customValues.password"
      :customValidation="validation.password.validated"
      :isValid="validation.password.valid"
      @change="validate('password')"
      required
      validFeedback="Look's good."
      :invalidFeedback="validation.password.invalidFeedback"
    />
    <mdb-btn type="Submit" size="sm" color="danger">Submit</mdb-btn>
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
</template>
<script>
  export default {
    name: "Signup",
    components: {
    },
    data() {
      return {
        customValues: {
          name: "Matt",
          lastname: "Doe",
          country: "",
          city: "",
          password: "",
          checkbox: false,
          datepicker: ""
        },

        validation: {
          name: {
            valid: false,
            validated: false
          },
          lastname: {
            valid: false,
            validated: false
          },
          country: {
            valid: false,
            validated: false
          },
          city: {
            valid: false,
            validated: false
          },
          password: {
            valid: false,
            validated: false,
            invalidFeedback: ''
          },
          checkbox: {
            valid: false,
            validated: false
          }
        }
      };
    },
    computed: {
      city() {
        if (this.customValues.country === 'USA') {
          return [
            { text: 'Boston', value: 'boston' },
            { text: 'Chicago', value: 'chicago' },
            { text: 'New York', value: 'newYork' }
          ];
        } else if (this.customValues.country === 'France') {
          return [
            { text: 'Paris', value: 'paris' },
            { text: 'Nantes', value: 'nantes' },
            { text: 'Lyon', value: 'lyon' }
          ];
        } else if (this.customValues.country === 'Poland') {
          return [
            { text: 'Warszawa', value: 'warszawa' },
            { text: 'Kraków', value: 'krakow' },
            { text: 'Gdańsk', value: 'gdansk' },
          ];
        }
        return [
        ];
      }
    },
    methods: {
      validateForm() {
        Object.keys(this.customValues).forEach(key => {
          this.validate(key);
        });
      },
      validate(key, value) {
        if (key === "name" || key === "lastname" || key === "checkbox") {
          if (this.customValues[key]) {
            this.validation[key].valid = true;
          } else {
            this.validation[key].valid = false;
          }
          this.validation[key].validated = true;
        }
        if (key === "country") {
          if (["USA", "France", "Poland"].includes(this.customValues[key])) {
            this.validation[key].valid = true;
          } else {
            this.validation[key].valid = false;
          }
          this.validation[key].validated = true;
        }
        if (key === "password") {
          // check length
          if (this.customValues[key].length > 5) {
            // check uppercase
            for (let character of this.customValues[key].split("")) {
              if (character === character.toUpperCase()) {
                this.validation[key].valid = true;
                break;
              }
              this.validation[key].valid = false;
              this.validation[key].invalidFeedback =
                "Password should contain at least one uppercase character.";
            }
          } else {
            this.validation[key].valid = false;
            this.validation[key].invalidFeedback =
              "Password too short. Type at least 6 letters.";
          }
          this.validation[key].validated = true;
        }
        if (key === "city") {

          this.$refs.select.validate();
        }
        if (key === "arrival") {
          if (value) {
            this.validation[key].valid = true;
          } else {
            this.validation[key].valid = false;
          }
          this.validation[key].validated = true;
        }
      },
    }
  };
</script>