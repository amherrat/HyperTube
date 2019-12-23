<template>
  <mdb-container>
      <div class="white-text text-center text-md-left col-md-6 mt-xl-5 mb-5">
            <h1 class="h1-responsive font-weight-bold">Welcome to HyperTube!</h1>
            <hr class="hr-light" />
            <h6
              class="mb-4"
            >Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem repellendus quasi fuga nesciunt dolorum nulla magnam veniam sapiente, fugiat! Commodi sequi non animi ea dolor molestiae, quisquam iste, maiores. Nulla.</h6>
            <mdb-btn outline="white" color="white"  @click.native="cascading = true">Register Now</mdb-btn>
          </div>
    <mdb-modal :show="cascading" @close="cascading = false" cascade tabs>
      <mdb-tab tabs justify class="light-blue darken-3">
        <mdb-tab-item :active="tabs==1" @click.native.prevent="tabs = 1"><mdb-icon icon="user" class="mr-1"/>Login</mdb-tab-item>
        <mdb-tab-item :active="tabs==2" @click.native.prevent="tabs = 2"><mdb-icon icon="user-plus" class="mr-1"/>Register</mdb-tab-item>
      </mdb-tab>
      <mdb-modal-body class="mx-3" v-if="tabs==1">
        <mdb-input label="Your email" icon="envelope" type="email" class="mb-5"/>
        <mdb-input label="Your password" icon="lock" type="password"/>
        <div class="mt-2 text-center">
          <mdb-btn color="info">Log in <mdb-icon icon="sign-in-alt" class="ml-1"/></mdb-btn>
        </div>
      </mdb-modal-body>
      <mdb-modal-footer center v-if="tabs==1">
        <div class="options text-center text-md-right mt-1">
          <p>Not a member? <a href="#" @click="tabs=2">Sign Up</a></p>
          <p>Forgot <a href="#">Password?</a></p>
        </div>
        <mdb-btn outline="info" class="ml-auto" @click.native="cascading=false">Close</mdb-btn>
      </mdb-modal-footer>
      <mdb-modal-body class="mx-3" v-if="tabs==2">
        <mdb-input label="Your email" icon="envelope" type="email" class="mb-5"/>
        <mdb-input label="Your password" icon="lock" type="password" class="mb-5"/>
        <mdb-input label="Repeat password" icon="lock" type="password"/>
        <div class="mt-2 text-center">
          <mdb-btn color="info">Sign Up<mdb-icon icon="sign-in-alt" class="ml-1"/></mdb-btn>
        </div>
      </mdb-modal-body>
      <mdb-modal-footer center v-if="tabs==2">
        <div class="options text-center text-md-right mt-1">
          <p>Already have an account? <a href="#" @click="tabs=1">Log in</a></p>
        </div>
        <mdb-btn outline="info" class="ml-auto" @click.native="cascading=false">Close</mdb-btn>
      </mdb-modal-footer>
    </mdb-modal>
  </mdb-container>
</template>

// export default {
//   name: "Login",
//   data() {
//     return {
//       login: "",
//       password: "",
//       confirm: false,
//       Forget_Password: false,
//       reset_email: "",
//       loc: {
//         lat: "",
//         lng: "",
//         addresse: ""
//       },
//       Erorrs: {
//         login: {
//           err: null,
//           msg: null
//         },
//         password: {
//           err: null,
//           msg: null
//         },
//         reset_email: {
//           err: null,
//           msg: null
//         }
//       }
//     };
//   },
<script>
  import { mdbContainer, mdbBtn, mdbModal, mdbTab, mdbTabItem, mdbModalBody, mdbInput, mdbModalFooter, mdbModalTitle, mdbIcon } from 'mdbvue';
  export default {
    name: 'ModalExamplesPage',
    components: {
      mdbContainer,
      mdbBtn,
      mdbModal,
      mdbTab,
      mdbTabItem,
      mdbModalBody,
      mdbInput,
      mdbModalFooter,
      mdbIcon,
      mdbModalTitle,
      mdbModalTitle
    },
    data() {
      return {
        cascading: false,
        tabs: 1
      }
    },
  mounted() {
    // if (localStorage.token) this.$router.push({ path: "/dashboard" });
    // this.$http
    //   .get("https://ipinfo.io/json?token=63f39e0edc15d5")
    //   .then(res => {
    //     let loc = String(res.data.loc).split(",");
    //     this.loc.lat = loc[0];
    //     this.loc.lng = loc[1];
    //     this.loc.addresse = res.data.city + ", " + res.data.country;
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });
  },
  methods: {
    Login() {
      if (this.validate()) {
        // this.getloacttion();
        this.$http
          .post("login", {
            user_name: this.login.toLowerCase(),
            user_password: this.password,
            latitude: parseFloat(this.loc.lat),
            longitude: parseFloat(this.loc.lng),
            user_addresse: this.loc.addresse
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
              this.$store
                .dispatch("login", {
                  user: this.login
                })
                .then(data => {
                  let imgProfil = 0;
                  data.data.images.forEach(obj => {
                    if (obj.image_type === "PROFIL") imgProfil = 1;
                  });
                  //console.log("HERRE", imgProfil);
                  if (
                    !data.data.user.user_gender ||
                    !data.data.user.user_bio ||
                    !data.data.user.user_prefer ||
                    !imgProfil
                  ) {
                    window.location = "/settings/profile";
                  } else window.location = "/dashboard";
                })
                .catch(err => {
                  console.log(err);
                });
            }
          })
          .catch(err => console.log(err));
      }
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
