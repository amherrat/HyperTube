<template>
  <div class="classic-form-page">
    <br />
    <mdb-mask class="d-flex gradient justify-content-center align-items-center">
      <mdb-container>
        <mdb-row>
          <div class="white-text text-center text-md-left col-md-6 mt-xl-5 mb-5">
            <h1 class="h1-responsive font-weight-bold">Settings</h1>
            <hr class="hr-light" />
            <h6 class="mb-4">you can modify your infos here</h6>
            <!-- <nuxt-link to="/login">
              <mdb-btn outline="white" color="white">Login Now</mdb-btn>
            </nuxt-link>-->
          </div>
          <mdb-col md="6" xl="5" class="mb-4">
            <mdb-card id="classic-card">
              <mdb-card-body class="z-depth-2 grey-text">
                <form v-if="done" @submit.prevent="Update">
                  <!-- <el-upload 
              action="#"
              class="upload-demo"
              list-type="picture-card"
              :on-change="AddProfilImage"
              :file-list="imageProfil"
              accept="image/jpeg, image/jpg, image/png"
              :disabled="Uploadedimg ? true : false"
              data-type="image"
              :auto-upload="false"
              :limit="1"
            >
              <i slot="default" class="el-icon-plus"></i>
              <div slot="file" slot-scope="{file}">
                <img class="el-upload-list__item-thumbnail" :src="file.url" alt>
                <span class="el-upload-list__item-actions">
                  <span
                    class="el-upload-list__item-preview"
                    @click="handlePictureCardPreview(file)"
                  >
                    <i class="el-icon-zoom-in"></i>
                  </span>
                  <span
                    class="el-upload-list__item-delete"
                    @click="handleDownload(file)"
                  >
                    <i class="el-icon-download"></i>
                  </span>
                  <span
                    class="el-upload-list__item-delete"
                    @click="handleRemove(file)"
                  >
                    <i class="el-icon-delete"></i>
                  </span>
                </span>
              </div>
                  </el-upload>-->
                  <picture-input
                    ref="pictureInput"
                    width="120"
                    height="120"
                    margin="15"
                    accept="image/jpeg, image/png, image/jpg, image/bmp"
                    size="10"
                    button-class="btn btn-info"
                    :custom-strings="{
                    upload: '<h1>Bummer!</h1>',
                    drag: 'Drag your profile img here'
                    }"
                    @change="AddProfilImage"
                  ></picture-input>
                  <center>
                    <h3
                      class="text-danger"
                      v-if="!validation.Profileimg.valid"
                    >{{validation.Profileimg.invalidFeedback}}</h3>
                  </center>
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
                  <p class="font-small blue-text d-flex justify-content-end mb-5">
                    <nuxt-link to="settings/update_password">Change password</nuxt-link>
                  </p>
                  <p></p>
                  <div class="text-center mb-3">
                    <mdb-btn gradient="aqua" block type="submit">Update</mdb-btn>
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
import PictureInput from "vue-picture-input";
export default {
  name: "Settings",
  components: {
    PictureInput
  },
  	head() {
		return {
		title: this.title
		};
	},
  data() {
    return {
      title: 'Settings',
      Uploadedimg: false,
      done: false,
      customValues: {
        login: "",
        fname: "",
        lname: "",
        mail: "",
        Profileimg: ""
      },
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
        Profileimg: {
          valid: true,
          invalidFeedback: ""
        }
      }
    };
  },
  computed: {
    user: function() {
      return this.$store.getters.getdata;
    }
  },
  // beforeRouteLeave(to, from, next) {
  //   this.update();
  //   next();
  // },
  created() {
    this.customValues.login = this.user.login;
    this.customValues.fname = this.user.fname;
    this.customValues.lname = this.user.lname;
    this.customValues.mail = this.user.mail;
    // this.customValues.Profileimg = this.user.profil;
    this.done = true;
  },
  methods: {
    // update(){
    // this.$axios
    // .get(`/api/whoAmi/${localStorage.token}`)
    // .then(res => {
    //   console.log(res.data.success);
    //   if(res.data.success)
    //     this.$store.dispatch("getdata", res.data.data.user);
    // })
    // .catch(err => console.log(err));
    // },
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
    Update() {
      console.log("was here");
      this.validateForm();
      this.isValidForm()
        .then(res => {
          this.$axios
            .put("/api/update", {
              login: this.customValues.login.toLowerCase(),
              fname: this.customValues.fname,
              lname: this.customValues.lname,
              mail: this.customValues.mail
            })
            .then(res => {
              console.log(res.data);
              if (!res.data.success) {
                if (res.data.errors) {
                  if (res.data.errors === "login already exist") {
                    this.validation.login.valid = false;
                    this.validation.login.invalidFeedback =
                      "login already exist";
                    this.validation.login.validated = true;
                  }
                  if (res.data.errors === "mail already exist") {
                    this.validation.mail.valid = false;
                    this.validation.mail.invalidFeedback = "mail already exist";
                    this.validation.mail.validated = true;
                  }
                } else {
                  console.log(res.data);
                }
              } else {
                localStorage.setItem("token", res.data.update);
                this.$root.$emit("refreshAvatar");
              }
            })
            .catch(err => console.log(err));
        })
        .catch(err => {});
    },
    validate(key, value) {
      if (key === "login") {
        if (
          !String(this.customValues[key]).match(
            /^[a-zA-Z]+([_-]?[a-zA-Z0-9])*$/g
          ) ||
          this.customValues[key].length > 15 ||
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

      this.validation[key].validated = true;
    },
    // loadImage(url) {
    //   let image = new Image();
    //   return new Promise((resolve, reject) => {
    //     image.onload = () => {
    //       resolve(image);
    //     };
    //     image.onerror = () => {
    //       reject(new Error("Invalid image"));
    //     };
    //     image.src = url;
    //   });
    // },
    // getDataUrl(url) {
    //   var img = this.loadImage(url);
    //   img.crossOrigin = "Anonymous";
    //   var canvas = document.createElement("canvas");
    //   var ctx = canvas.getContext("2d");
    //   canvas.width = img.width;
    //   canvas.height = img.height;
    //   ctx.drawImage(img, 0, 0);
    //   return canvas.toDataURL();
    // },
    AddProfilImage(file) {
      this.$axios.post("api/create_profile_img", { img: file }).then(
        res => {
          if (res.data.success) {
            this.$root.$emit("refreshAvatar");
            this.validation.Profileimg.valid = true;
          } else {
            this.validation.Profileimg.valid = false;
            this.validation.Profileimg.invalidFeedback = res.data.message;
            console.log(res.data.message);
          }
        },
        err => {
          console.log(err);
        }
      );
    }
  }
};
</script>

<style scoped>
</style>
