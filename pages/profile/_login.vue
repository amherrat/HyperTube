<template>
  <div>
    <div v-if="login" class="wrapper">
      <div class="profile-card js-profile-card">
        <div class="profile-card__img">
          <img :src="profil" alt="profile card" />
        </div>

        <div class="profile-card__cnt js-profile-cnt">
          <div
            class="profile-card__name"
          >{{fname[0].toUpperCase() +fname.slice(1)}} {{lname.toUpperCase()}}</div>
          <!-- <div class="profile-card__txt"><strong>Some text here</strong></div>-->
          <!-- <div class="profile-card-loc">
        <span class="profile-card-loc__icon">
            Some Additional text
        </span>
          </div>-->

          <div class="profile-card-inf">
            <div class="profile-card-inf__item">
              <div class="profile-card-inf__title">{{nb_comments}}</div>
              <div class="profile-card-inf__txt">{{$t('Comments')}}</div>
            </div>

            <div class="profile-card-inf__item">
              <div class="profile-card-inf__title">{{nb_films}}</div>
              <div class="profile-card-inf__txt">{{$t('Watched')}}</div>
            </div>
          </div>
        </div>
        <div id="infoss">
          <el-collapse
            v-for="(movie, index) in this.movies"
            v-bind:key="index"
            v-model="activeName"
            accordion
          >
            <el-collapse-item :name="index">
              <template slot="title">
                <nuxt-link style="padding: 1%;" :to="'/movie/'+ movie.imdb">
                  <img
                    :src="movie.poster_med ? movie.poster_med : 'http://localhost:3000/default-profile.png'"
                    class="rounded-circle z-depth-0"
                    alt="avatar image"
                    width="40px"
                    height="40px"
                  />
                </nuxt-link>
                {{ movie.title }}
              </template>
              <div>
                <span
                  style="font-size: 18px; margin-left: 0%; font-family: initial;"
                >{{ movie.description }}</span>
              </div>
            </el-collapse-item>
          </el-collapse>
        </div>
      </div>
    </div>
    <div v-else>
      <center>
        <mdb-card
          class="card-image w-50 p-3"
          style="background-color: rgb(196, 40, 37,0.6); margin-top: 10px;"
        >
          <div class="text-white text-center py-3 px-3 my-5">
            <div>
              <h2 class="card-title h1-responsive font-bold">
                <strong>{{$t("User not found")}}</strong>
              </h2>
              <div>
                <font-awesome-icon :icon="['fas', 'times']" size="5x" />
              </div>
              <div>
                <nuxt-link to="/home">
                  <mdb-btn outline="white" color="white">{{$t("Go back home")}}</mdb-btn>
                </nuxt-link>
              </div>
            </div>
          </div>
        </mdb-card>
      </center>
    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  head() {
    return {
      title: this.title
    };
  },
  data() {
    return {
      title: "",
      activeName: "1",
      nb_films: 0,
      nb_comments: 0,
      movies: [],
      imbds: [],
      login: "",
      fname: "",
      lname: "",
      profil: "",
      watchedmovies: ""
    };
  },
  validate({ params }) {
    var login = params.login.toLowerCase();
    console.log(login);
    return /^[a-zA-Z]+([_-]?[a-zA-Z0-9])*$/.test(login);
  },
  mounted() {
    this.title = `${this.$route.params.login} ${this.$t("title_profile")}`;
    this.$axios
      .get(`/api/comment/get/${this.$route.params.login}`)
      .then(res => {
        if (res.data.success) this.nb_comments = res.data.nb;
      })
      .catch(err => {});
  },
  created() {
    if (this.userdata) {
      this.ShowProfile(this.$route.params.login);
      this.$axios
        .post(`/api/watchedlist`, { user: this.userdata })
        .then(res => {
          if (res.data) {
            this.nb_films = res.data.length;
            this.imbds = res.data;
            this.getFilm(res.data).then(res => {
              this.movies = res;
            });
          }
        })
        .catch(err => {
          console.log(err.response);
        });
    }
  },
  computed: {
    userdata: function() {
      return this.$store.getters.getdata;
    }
  },
  methods: {
    promiseGetOneFilm(imbd) {
      let promise = new Promise(async (resolve, reject) => {
        let response = await axios.get(
          `https://api.apiumadomain.com/movie?cb=&quality=720p,1080p,3d&page=1&imdb=${imbd.imdbid}`
        );
        resolve(response.data);
      });
      return promise;
    },
    getFilm(imbds) {
      let promise = new Promise(async (resolve, reject) => {
        let movies = [];
        for (let index = 0; index < imbds.length; index++) {
          let movie = await this.promiseGetOneFilm(imbds[index]);
          movies.push(movie);
        }
        resolve(movies);
      });
      return promise;
    },
    ShowProfile(user) {
      console.log("was here");
      if (user == this.userdata.login) {
        this.fill_Profile(this.userdata);
      } else {
        // other user profile
        axios
          .get("/api/userdata/" + user)
          .then(res => {
            console.log(res.data.data.user);
            this.fill_Profile(res.data.data.user);
          })
          .catch(err => {
            //console.log(err);
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

<style scoped>
#infoss {
  width: 90%;
  height: 306px;
  margin-left: 5%;
  overflow-y: scroll;
  /* border: 1px solid red; */
  /* border-radius: 5%; */
  padding: 2%;
}
html {
  position: relative;
  overflow-x: hidden !important;
}
* {
  box-sizing: border-box;
}
body {
  font-family: "Quicksand", sans-serif;
  color: #324e63;
}
a,
a:hover {
  text-decoration: none;
}
.icon {
  display: inline-block;
  width: 1em;
  height: 1em;
  stroke-width: 0;
  stroke: currentColor;
  fill: currentColor;
}
.wrapper {
  width: 100%;
  height: auto;
  min-height: 100vh;
  margin-top: 90px;
  padding: 50px 20px;
  /*display: flex;*/
}
@media screen and (max-width: 768px) {
  .wrapper {
    height: auto;
    min-height: 100vh;
  }
}
.profile-card {
  width: 100%;
  min-height: 460px;
  margin: auto;
  box-shadow: 0px 8px 60px -10px rgba(13, 28, 39, 0.6);
  background: #fff;
  border-radius: 12px;
  max-width: 700px;
  position: relative;
}
.profile-card.active .profile-card__cnt {
  filter: blur(6px);
}
.profile-card.active .profile-card-message,
.profile-card.active .profile-card__overlay {
  opacity: 1;
  pointer-events: auto;
  transition-delay: 0.1s;
}
.profile-card.active .profile-card-form {
  transform: none;
  transition-delay: 0.1s;
}
.profile-card__img {
  width: 150px;
  height: 150px;
  margin-left: auto;
  margin-right: auto;
  transform: translateY(-50%);
  border-radius: 50%;
  overflow: hidden;
  position: relative;
  z-index: 4;
  box-shadow: 0px 5px 50px 0px #ff0200, 0px 0px 0px 7px rgb(189, 21, 20);
}
@media screen and (max-width: 576px) {
  .profile-card__img {
    width: 120px;
    height: 120px;
  }
}
.profile-card__img img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}
.profile-card__cnt {
  margin-top: -35px;
  text-align: center;
  padding: 0 20px;
  padding-bottom: 40px;
  transition: all 0.3s;
}
.profile-card__name {
  font-weight: 700;
  font-size: 24px;
  color: #ff0200;
  margin-bottom: 15px;
}
.profile-card__txt {
  font-size: 18px;
  font-weight: 500;
  color: #324e63;
  margin-bottom: 15px;
}
.profile-card__txt strong {
  font-weight: 700;
}
.profile-card-loc {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  font-weight: 600;
}
.profile-card-loc__icon {
  display: inline-flex;
  font-size: 27px;
  margin-right: 10px;
}
.profile-card-inf {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  align-items: flex-start;
  margin-top: 35px;
}
.profile-card-inf__item {
  padding: 10px 35px;
  min-width: 150px;
}
@media screen and (max-width: 768px) {
  .profile-card-inf__item {
    padding: 10px 20px;
    min-width: 120px;
  }
}
.profile-card-inf__title {
  font-weight: 700;
  font-size: 27px;
  color: #ff0200;
}
.profile-card-inf__txt {
  font-weight: 500;
  margin-top: 7px;
}

.profile-card-ctr {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
}
@media screen and (max-width: 576px) {
  .profile-card-ctr {
    flex-wrap: wrap;
  }
}
.profile-card__button {
  background: none;
  border: none;
  font-family: "Quicksand", sans-serif;
  font-weight: 700;
  font-size: 19px;
  margin: 15px 35px;
  padding: 15px 40px;
  min-width: 201px;
  border-radius: 50px;
  min-height: 55px;
  color: #fff;
  cursor: pointer;
  backface-visibility: hidden;
  transition: all 0.3s;
}
@media screen and (max-width: 768px) {
  .profile-card__button {
    min-width: 170px;
    margin: 15px 25px;
  }
}
@media screen and (max-width: 576px) {
  .profile-card__button {
    min-width: inherit;
    margin: 0;
    margin-bottom: 16px;
    width: 100%;
    max-width: 300px;
  }
  .profile-card__button:last-child {
    margin-bottom: 0;
  }
}
.profile-card__button:focus {
  outline: none !important;
}
@media screen and (min-width: 768px) {
  .profile-card__button:hover {
    transform: translateY(-5px);
  }
}
.profile-card__button:first-child {
  margin-left: 0;
}
.profile-card__button:last-child {
  margin-right: 0;
}
.profile-card__button.button--blue {
  background: linear-gradient(45deg, #1da1f2, #0e71c8);
  box-shadow: 0px 4px 30px rgba(19, 127, 212, 0.4);
}
.profile-card__button.button--blue:hover {
  box-shadow: 0px 7px 30px rgba(19, 127, 212, 0.75);
}
.profile-card__button.button--orange {
  background: linear-gradient(45deg, #d5135a, #f05924);
  box-shadow: 0px 4px 30px rgba(223, 45, 70, 0.35);
}
.profile-card__button.button--orange:hover {
  box-shadow: 0px 7px 30px rgba(223, 45, 70, 0.75);
}
.profile-card__button.button--gray {
  box-shadow: none;
  background: #dcdcdc;
  color: #142029;
}
.profile-card-message {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  padding-top: 130px;
  padding-bottom: 100px;
  opacity: 0;
  pointer-events: none;
  transition: all 0.3s;
}
.profile-card-form {
  box-shadow: 0 4px 30px rgba(15, 22, 56, 0.35);
  max-width: 80%;
  margin-left: auto;
  margin-right: auto;
  height: 100%;
  background: #fff;
  border-radius: 10px;
  padding: 35px;
  transform: scale(0.8);
  position: relative;
  z-index: 3;
  transition: all 0.3s;
}
@media screen and (max-width: 768px) {
  .profile-card-form {
    max-width: 90%;
    height: auto;
  }
}
@media screen and (max-width: 576px) {
  .profile-card-form {
    padding: 20px;
  }
}
.profile-card-form__bottom {
  justify-content: space-between;
  display: flex;
}
@media screen and (max-width: 576px) {
  .profile-card-form__bottom {
    flex-wrap: wrap;
  }
}
.profile-card textarea {
  width: 100%;
  resize: none;
  height: 210px;
  margin-bottom: 20px;
  border: 2px solid #dcdcdc;
  border-radius: 10px;
  padding: 15px 20px;
  color: #324e63;
  font-weight: 500;
  font-family: "Quicksand", sans-serif;
  outline: none;
  transition: all 0.3s;
}
.profile-card textarea:focus {
  outline: none;
  border-color: #8a979e;
}
.profile-card__overlay {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;
  opacity: 0;
  background: rgba(22, 33, 72, 0.35);
  border-radius: 12px;
  transition: all 0.3s;
}
</style>