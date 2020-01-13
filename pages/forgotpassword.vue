<template>
<div class="classic-form-page">
    <mdb-mask class="d-flex gradient justify-content-center align-items-center">
      <mdb-container>
        <mdb-row>
          <div class="white-text text-center text-md-left col-md-6 mt-xl-5 mb-5">
            <h1 class="h1-responsive font-weight-bold">Hypertube forgot password</h1>
            <hr class="hr-light" />
            <h6
              class="mb-4"
            >You can reset your password by using your email adress</h6>
          </div>
          <mdb-col md="6" xl="5" class="mb-4">
            <mdb-card id="classic-card">
              <mdb-card-body class="z-depth-2 grey-text">
                <form @submit.prevent="Forgot">
                  <mdb-row>
                    <mdb-col>
                      <mdb-input
                        type="email"
                        label="Email"
                        v-model="customValues.mail"
                        :customValidation="validation.mail.validated"
                        :isValid="validation.mail.valid"
                        @change="validate('mail')"
                        :validFeedback="validation.mail.validFeedback"
                        :invalidFeedback="validation.mail.invalidFeedback"
                      />
                    </mdb-col>
                  </mdb-row>
                  <div class="text-center mb-3">
                    <mdb-btn gradient="aqua" block type="submit">Send mail</mdb-btn>
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
  name: "Forgot",
  head() {
		return {
		title: this.$t('title_Forget_Password')
		};
	},
  data() {
    return {
        customValues: {
        mail: ""
      },
      err: false,
      confirm: false,
      validation: {
        mail: {
          valid: false,
          validated: false,
          invalidFeedback: "",
          validFeedback: "email look's good."
        }
      }
    };
  },
  mounted() {
    if (localStorage.token) this.$router.push({ path: "/home" });
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
    Forgot() {
      //this.validateForm();
      this.isValidForm().then((res) => {
        this.$axios
          .post("/api/resetpassword", {
            mail: this.customValues.mail
          })
          .then(res => {
            if (!res.data.success) {
              console.log(res);
              if (res.data === "not found") {
                  this.validation.mail.valid = false;
                  this.validation.mail.invalidFeedback = "mail doesn't exist";
                  this.validation.mail.validated = true;
              } else {
                this.validation.mail.validFeedback = "A mail was sent please check your email"
                console.log(res.data);
                //this.confirm = true;
              }
            }
          })
          .catch(err => console.log(err));
      }).catch(err => {})
    },
    validate(key, value) {
      if (key === "mail") {
        if (!this.customValues[key] ||
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
