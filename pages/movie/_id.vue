<template>
  <div>
    <div class="backdrop">
      <div class="backgroundImg">
        <div class="img" ref="back" :style="selectedImg"></div>
      </div>
      <div class="cover">
        <img class="fadein" :src="moviedata.large_cover_image" />
      </div>
      <div class="content">
        <div class="title">{{moviedata.title}}</div>
        <div class="info">
          <div class="_shadow genre">{{genre}}</div>
          <div class="_shadow year">
            <i class="icon icon-calendar"></i>
            {{moviedata.year}}
          </div>
          <div class="_shadow length">
            <i class="icon icon-clock"></i>
            {{moviedata.runtime}} {{$t('min')}}
          </div>
          <div>
            <a target="_blank" :href="'https://www.imdb.com/title/'+moviedata.imdb_code+'/reviews'">
              <button type="button" class="read_reviews _shadow">
                <span class="readbutton">{{$t('Read_Reviews')}}</span>
              </button>
            </a>
          </div>
          <div class="_rate">
            <star-rating
              :inline="true"
              :star-size="20"
              :read-only="true"
              :glow="2"
              :rating="moviedata.rating/2"
              :show-rating="false"
              :increment="0.5"
            ></star-rating>
            <span class="_shadow">{{moviedata.rating}}</span>
          </div>
        </div>
        <div class="about">
          <div class="short_synopsis">{{moviedata.description_full}}</div>
          <div v-if="moviedata.yt_trailer_code" class="trailer" @click="openmodal('yt_trailer')">
            <div
              class="ytvideo"
              :style="`background-image:url(${images[2] ? images[2] : `http://i3.ytimg.com/vi/${moviedata.yt_trailer_code}/hqdefault.jpg`})`"
            >
              <img src="/play2.png" class="playbutton" />
            </div>
          </div>
          <modal
            class="fademodal"
            :adaptive="true"
            transition="nice-modal-fade"
            :pivot-y="0.5"
            :width="640"
            :height="360"
            name="yt_trailer"
          >
            <iframe
              width="640"
              height="360"
              frameborder="0"
              :src="'https://www.youtube.com/embed/'+moviedata.yt_trailer_code+'?rel=0&amp;wmode=transparent&amp;border=0&amp;autoplay=1&amp;iv_load_policy=3'"
              name="1576779635664"
              allow="autoplay"
              allowfullscreen="true"
            ></iframe>
          </modal>
        </div>
        <div v-if="castdone && moviedata.cast" class="cast">
          <div class="title_Cast">
            <span>{{$t('Cast')}}</span>
            <button type="button" class="more_button _shadow" @click="openmodal('cast_modal')">
              <span class="readbutton">{{$t('More')}}</span>
            </button>
          </div>
          <div v-for="(cast, i) in moviedata.cast" :key="i">
            <div class="_shadow profile" v-if="i < 10">
              <!-- <a :href="'https://www.imdb.com/name/nm'+cast.imdb_code" target="_blank"> -->
              <div>
                <a :href="'https://www.themoviedb.org/person/'+cast.id" target="_blank">
                  <img
                    :src="cast.profile_path ? `https://image.tmdb.org/t/p/original${cast.profile_path}` : '/default-profile.png'"
                    width="60px"
                    height="60px"
                  />
                  <div class="name">
                    <p class="cast_name">{{cast.name}}</p>
                    <p class="cast_name">{{`(${cast.character})`}}</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
          <modal class="fademodal" width="500" height="500" name="cast_modal">
            <div class="modaloverfollow">
              <div class="_shadow profile" v-for="(cast, i) in moviedata.cast" :key="i">
                <!-- <a :href="'https://www.imdb.com/name/nm'+cast.imdb_code" target="_blank"> -->
                <div>
                  <a :href="'https://www.themoviedb.org/person/'+cast.id" target="_blank">
                    <img
                      :src="cast.profile_path ? `https://image.tmdb.org/t/p/original${cast.profile_path}` : '/default-profile.png'"
                      width="60px"
                      height="60px"
                    />
                    <div class="name">
                      <p class="cast_name">{{cast.name}}</p>
                      <p class="cast_name">{{`(${cast.character})`}}</p>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </modal>
        </div>
        <div v-if="castdone && moviedata.crew" class="crew">
          <div class="title_Cast">
            <span>{{$t('Crew')}}</span>
            <button type="button" class="more_button _shadow" @click="openmodal('crew_modal')">
              <span class="readbutton">{{$t('More')}}</span>
            </button>
          </div>
          <div v-for="(crew, i) in moviedata.crew" :key="i">
            <div class="_shadow profile" v-if="i < 10">
              <!-- <a :href="'https://www.imdb.com/name/nm'+cast.imdb_code" target="_blank"> -->
              <div>
                <a :href="'https://www.themoviedb.org/person/'+crew.id" target="_blank">
                  <img
                    :src="crew.profile_path ? `https://image.tmdb.org/t/p/original${crew.profile_path}` : '/default-profile.png'"
                    width="60px"
                    height="60px"
                  />
                  <div class="name">
                    <p class="cast_name">{{crew.name}}</p>
                    <p class="cast_name">{{`(${crew.job})`}}</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
          <modal class="fademodal" width="500" height="500" name="crew_modal">
            <div class="modaloverfollow">
              <div class="_shadow profile" v-for="(crew, i) in moviedata.crew" :key="i">
                <!-- <a :href="'https://www.imdb.com/name/nm'+cast.imdb_code" target="_blank"> -->
                <div>
                  <a :href="'https://www.themoviedb.org/person/'+crew.id" target="_blank">
                    <img
                      :src="crew.profile_path ? `https://image.tmdb.org/t/p/original${crew.profile_path}` : '/default-profile.png'"
                      width="60px"
                      height="60px"
                    />
                    <div class="name">
                      <p class="cast_name">{{crew.name}}</p>
                      <p class="cast_name">{{`(${crew.job})`}}</p>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </modal>
        </div>
      </div>
      <div class="footer">
        <div>
          <mdb-btn-group>
            <mdb-btn
              v-for="(torrent, x) in torrents"
              color="dark"
              :key="x"
              @click="TorrentSelect(x)"
              size="sm"
              :active="selectedTorrentIndex === x ? true : false"
            >
              <span>{{torrent.quality}}</span>
              <span v-if="torrent.seeds > 500" class="peers peers-good">
                <font-awesome-icon :icon="['fas', 'wifi']" size="1x" />
                <i class="icon icon-battery-charging"></i>
                {{torrent.peers+'/'+torrent.seeds}}
              </span>
              <span v-if="torrent.seeds > 150 && torrent.seeds < 500" class="peers peers-mid">
                <font-awesome-icon :icon="['fas', 'wifi']" size="1x" />
                {{torrent.peers+'/'+torrent.seeds}}
              </span>
              <span v-if="torrent.seeds < 150" class="peers peers-bad">
                <font-awesome-icon :icon="['fas', 'wifi']" size="1x" />
                {{torrent.peers+'/'+torrent.seeds}}
              </span>
            </mdb-btn>
          </mdb-btn-group>
        </div>
        <div class="watchbutton">
          <mdb-btn :disabled="selectedTorrent ? false : true" gradient="blue" @click="gowatch">
            <font-awesome-icon :icon="['fas', 'play']" size="1x" />&nbsp;&nbsp;{{$t('WATCH_NOW')}}
          </mdb-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import StarRating from "vue-star-rating";
import axios from "axios";
export default {
  beforeRouteEnter (to, from, next) {
    axios
    .get(`/api/whoAmi/${localStorage.token}`)
    .then(res => {
      next();
    })
    .catch(err => {
      localStorage.removeItem('token');
      next('/login');
    });
  },
  components: {
    StarRating
  },
  head() {
    return {
      title: this.title
    };
  },
  data() {
    return {
      title: "",
      castdone: false,
      selectedTorrent: null,
      selectedTorrentIndex: null,
      value1: 4.1,
      images: [],
      selectedImg: "",
      genre: "",
      moviedata: {},
      torrents: []
    };
  },
  validate({ params }) {
    return (
      // (/^[0-9]*$/.test(params.id) && /^(?!0*$).*$/.test(params.id)) ||
      /tt\d{7,8}/.test(params.id)
    );
  },
  mounted() {
    this.backImages();
    this.getMovieData(this.$route.params.id);
  },
  methods: {
    openmodal(name) {
      if (window.innerWidth > 600) this.$modal.show(name);
      else {
        //crew_modal cast_modal yt_trailer
        if (name === "yt_trailer")
          window.open(
            `http://youtube.com/watch?v=${this.moviedata.yt_trailer_code}`,
            "_blank"
          );
        else if (name === "crew_modal")
          window.open(
            `https://m.imdb.com/title/${this.moviedata.imdb_code}/fullcredits`,
            "_blank"
          );
        else if (name === "cast_modal")
          window.open(
            `https://m.imdb.com/title/${this.moviedata.imdb_code}/fullcredits/cast`,
            "_blank"
          );
      }
    },
    TorrentSelect(x) {
      this.selectedTorrent = this.torrents[x].quality;
      this.selectedTorrentIndex = x;
    },
    gowatch() {
      if (this.selectedTorrentIndex !== null) {
        if (this.torrents[this.selectedTorrentIndex]) {
          console.log("redirect to:");
          this.$router.push({
            name: "video-hash",
            params: { hash: this.torrents[this.selectedTorrentIndex].hash },
            query: { id: this.$route.params.id }
          });
        }
      }
    },
    getMovieData(id) {
      //https://tv-v2.api-fetch.website/movie/{imdb_id}
      if (id.match(/tt\d{7,8}/)) {
        axios
          .get(
            `https://api.apiumadomain.com/movie?cb=&quality=720p,1080p,3d&page=1&imdb=${id}`
          )
          .then(res => {
            let data = res.data;
            console.log(data);
            if (res.status === 200 && data) {
              console.log(data);
              this.moviedata.large_cover_image = data.poster_big;
              this.moviedata.title = data.title;
              this.title = data.title;
              this.moviedata.year = data.year;
              this.moviedata.runtime = data.runtime;
              this.moviedata.imdb_code = data.imdb;
              this.moviedata.yt_trailer_code = data.trailer;
              this.moviedata.rating = data.rating;
              this.moviedata.description_full = data.description;
              this.genre = data.genres[0];
              for (let i in data.items) {
                this.torrents.push({
                  quality: data.items[i].quality,
                  peers: data.items[i].torrent_peers,
                  seeds: data.items[i].torrent_seeds,
                  hash: data.items[i].torrent_magnet.substring(20, 60)
                });
              }
            } else this.$nuxt.error({ statusCode: 404 });
          })
          .catch(err => {
            console.log(err);
            console.log("2nd api");
            axios
              .get(`https://tv-v2.api-fetch.website/movie/${id}`)
              .then(res => {
                console.log(res);
                let data = res.data;
                if (res.status === 200 && data) {
                  this.moviedata.large_cover_image = data.images.poster;
                  this.moviedata.title = data.title;
                  this.moviedata.year = data.year;
                  this.moviedata.runtime = data.runtime;
                  this.moviedata.imdb_code = data.imdb_id;
                  this.moviedata.yt_trailer_code = data.trailer.substring(27);
                  console.log(data.trailer.substring(27));
                  this.moviedata.rating = data.rating.percentage / 10;
                  this.moviedata.description_full = data.synopsis;
                  this.genre = data.genres[0];
                  for (let i in data.torrents["en"]) {
                    console.log(data.torrents["en"][i].url);
                    console.log(data.torrents["en"][i].url.substring(20, 60));
                    this.torrents.push({
                      quality: i,
                      peers: data.torrents["en"][i].peer,
                      seeds: data.torrents["en"][i].seed,
                      hash: data.torrents["en"][i].url.substring(20, 60)
                    });
                  }
                } // }else this.$nuxt.error({ statusCode: 404 });
              })
              .catch(err => console.log(err));
          });
        axios
          .get(
            // `https://api.themoviedb.org/3/movie/${id}/credits?api_key=0f87bface5c69fcf394fc387f33049fa`
            `https://api.themoviedb.org/3/movie/${id}?api_key=0f87bface5c69fcf394fc387f33049fa&append_to_response=credits`
          )
          .then(res => {
            let data = res.data.credits;
            console.log(data);
            this.moviedata.cast = data.cast;
            this.moviedata.crew = data.crew;
            this.castdone = true;
          })
          .catch(err => {
            console.log(err);
          });
        axios
          .get(
            `https://tinfo.apiumadomain.com/3/movie/${id}/images?api_key=49101d62654e71a2931722642ac07e5e`
          )
          .then(res => {
            var data = res.data;
            console.log(data);
            for (const x in data.backdrops) {
              this.images.push(
                "http://image.tmdb.org/t/p/original" +
                  data.backdrops[x].file_path
              );
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        //YTS
        // this.$axios
        //   .$get("https://yts.lt/api/v2/movie_details.json", {
        //     params: {
        //       movie_id: id,
        //       with_images: true,
        //       with_cast: true
        //     }
        //   })
        //   .then(res => {
        //     if (res.data && res.data.movie.id !== 0) {
        //       console.log(res.data);
        //       this.moviedata = res.data.movie;
        //       this.images = [
        //         this.moviedata.large_screenshot_image1,
        //         this.moviedata.large_screenshot_image2,
        //         this.moviedata.large_screenshot_image3
        //       ];
        //       this.genre = this.moviedata.genres[0];
        //       this.torrents = this.moviedata.torrents;
        //     } else this.$router.push("/");
        //   })
        //   .catch(err => {
        //     console.error(err);
        //   });
        this.$route.push({ name: "home" });
      }
    },
    backImages() {
      var i = 1;
      this.selectedImg = "background-image: url(" + this.images[0] + ");";
      setInterval(() => {
        this.selectedImg = "background-image: url(" + this.images[i] + ");";
        i += 1;
        if (i === this.images.length) i = 0;
      }, 7000);
    }
  }
};
</script>
<style scoped>
.modaloverfollow {
  width: 500px;
  height: 500px;
  overflow-y: scroll;
  background-color: black;
  padding-left: 20px;
}
.cast_name {
  font-size: 0.6rem;
  margin: 0;
}
.cast {
  width: 80%;
  float: left;
}
.crew {
  width: 80%;
  float: left;
}
.read_reviews {
  display: inline-block;
  outline: 0;
  line-height: 1.5;
  text-align: center;
  white-space: nowrap;
  border: 1px solid #c5d9e8;
  border-radius: 4px;
  user-select: none;
  cursor: pointer;
  font-size: 10px;
  padding: 2px 10px;
  background: none;
  color: #3f536e;
}
.more_button {
  display: inline-block;
  outline: 0;
  line-height: 1.5;
  text-align: center;
  border: 1px solid #c5d9e8;
  border-radius: 4px;
  user-select: none;
  cursor: pointer;
  font-size: 10px;
  padding: 2px 10px;
  background: none;
  color: #3f536e;
  vertical-align: middle;
}
.cover img {
  position: absolute;
  height: calc(100% + 65px);
  top: -65px;
  left: 0;
}
.yt_video {
  width: 640px;
  height: 360px;
}
.fadein {
  opacity: 0.5;
  mask-image: -webkit-gradient(
    linear,
    right top,
    left top,
    color-stop(1, rgba(0, 0, 0, 1)),
    color-stop(0.5, rgba(0, 0, 0, 1)),
    color-stop(0, rgba(0, 0, 0, 0))
  );
}
.backgroundImg {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 1);
  position: absolute;
  top: 0;
  left: 0;
}

.backgroundImg .img {
  width: 100%;
  height: 100%;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  opacity: 0;
  animation: pics 7s infinite;
}

.backdrop {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  overflow: hidden;
}
.content {
  position: absolute;
  right: 0;
  left: 36%;
  top: calc(30% - 200px);
  max-height: 100vh;
  overflow-y: scroll;
  padding-bottom: 30%;
}
.content::-webkit-scrollbar {
  width: 0 !important;
} /*hide scroll bar*/

.title {
  font-size: 4rem;
  color: white;
  text-transform: uppercase;
  font-weight: bold;
  text-shadow: 2px 2px 8px black;
  width: 80%;
}

.title_Cast {
  font-size: 2.5rem;
  color: white;
  text-transform: uppercase;
  text-shadow: 2px 2px 8px black;
}

.info {
  padding: 10px 0 35px;
  vertical-align: middle;
}

.info div {
  float: left;
  margin-right: 20px;
  color: white;
  font-size: 1.1rem;
  font-weight: 300;
}
._shadow {
  text-shadow: 0 0 5px #abd6dfff, 0 0 #abd6dfff, 0 0 #abd6dfff, 0 0 #abd6dfff;
}

@keyframes pics {
  2% {
    opacity: 0;
  }
  5% {
    opacity: 0;
  }
  50% {
    opacity: 0.5;
  }
  90% {
    opacity: 0;
  }
}

.ytvideo {
  width: 360px;
  height: 215px;
  position: absolute;
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  -webkit-background-size: cover;
  /* pour anciens Chrome et Safari */
  background-size: cover;
  /* version standardisée */
  cursor: pointer;
}
.trailer {
  width: 360px;
  height: 215px;
  background-color: black;
}

.trailer :hover {
  opacity: 0.7;
}

.playbutton {
  position: absolute;
  width: 85px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: transparent;
  border: 0;
}

.short_synopsis {
  margin-bottom: 25px;
  width: 70%;
  color: aliceblue;
}
.fademodal {
  background: rgba(0, 0, 0, 0.9);
}
.readbutton {
  color: white;
}

.profile {
  width: 100px;
  height: 100px;
  margin-right: 10px;
  float: left;
  margin-bottom: 10px;
}
.profile img {
  margin-right: auto;
  margin-left: auto;
  display: block;
  border-radius: 50%;
}

.profile .name {
  margin-top: 5px;
  font-size: 0.8rem;
  text-align: center;
  color: white;
}

.footer {
  position: absolute;
  background: rgba(0, 0, 0, 0.7);
  padding-bottom: 70px;
  width: 100%;
  bottom: 0;
  left: 0;
  border-top: 1px solid #abd6dfff;
  box-shadow: 0px 0 10px #abd6dfff;
  text-align: center;
}

.footer div {
  display: inline-block;
  margin-left: auto;
  margin-right: auto;
}

.selecttorrent {
  width: 200px;
  opacity: 0.9;
}

.watchbutton {
  margin-top: 20px;
  opacity: 0.9;
}

.peers {
  float: right;
  opacity: 1;
  font-size: 0.8em;
}

.peers-good {
  color: #009900;
  text-shadow: 0 0 5px #00cc00, 0 0 #00cc00, 0 0 #00cc00, 0 0 #00cc00;
}

.peers-mid {
  color: #b3b300;
  text-shadow: 0 0 5px #ffff00, 0 0 #ffff00, 0 0 #ffff00, 0 0 #ffff00;
}

.peers-bad {
  color: red;
  text-shadow: 0 0 5px #ff0000, 0 0 #ff0000, 0 0 #ff0000, 0 0 #ff0000;
}

@media (max-width: 600px) {
  .cover img {
    position: fixed;
    max-width: 450px;
    max-height: 750px;
  }
  .content {
    padding-top: 15%;
    left: 5%;
    padding-bottom: 65%;
  }
  .title {
    font-size: 2.5rem;
  }
  .fademodal {
    display: none;
  }
  .trailer {
    width: 320px;
    height: 200px;
  }
  .ytvideo {
    width: 320px;
    height: 200px;
  }
  .short_synopsis {
    margin-top: 25px;
    width: 90%;
  }
  .watchbutton {
    margin-top: 0;
  }
  .cast {
    width: 100%;
  }
  .crew {
    width: 100%;
  }
}
@media (max-width: 404px) {
  .selecttorrent {
    padding-top: 20px;
    padding-bottom: 0px;
  }
  .watchbutton {
    margin-top: 0;
  }
}
@media (max-width: 350px) {
  .title {
    font-size: 2.3rem;
  }
  .content {
    margin-top: 20px;
  }
  .selecttorrent {
    padding-top: 20px;
    padding-bottom: 0;
  }
  .watchbutton {
    margin-top: 0;
  }
  .trailer {
    width: 261px;
    height: 127px;
  }
  .ytvideo {
    width: 261px;
    height: 127px;
  }
}
</style>