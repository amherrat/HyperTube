<template>
<div>
    Profil{{profil}}
    {{login}} {{lname}} {{fname}}
</div>
</template>
<script>
export default {
    data() {
    return {
        login: "",
        fname: "",
        lname: "",
        profil:"",
        watchedmovies:""
    }
    },
  validate({ params }) {
    var login = params.login.toLowerCase();
    console.log(login);
    return /^[a-zA-Z]+([_-]?[a-zA-Z0-9])*$/.test(login);
  },
  created() {
    console.log(this.userdata);
    if(this.userdata){
        this.ShowProfile(this.$route.params.login);
    }
  },
  computed: {
    userdata: function() {
      return this.$store.getters.getdata;
    }
  },
  methods: {
    ShowProfile(user) {
        console.log("was here");
      if (user == this.userdata.login) {
        this.fill_Profile(this.userdata);
      } else {
        // other user profile
        this.$axios
          .get("/api/userdata/" + user)
          .then(res => {
              console.log(res.data.data.user);
            this.fill_Profile(res.data.data.user);
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    fill_Profile(user) {
      this.login = user.login;
      this.fname = user.fname;
      this.lname = user.lname;
      this.watchedmovies = 0;
      this.profil = user.profil;
    }
  }
};
</script>

<style>
</style>