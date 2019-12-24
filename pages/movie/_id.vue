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
            {{moviedata.runtime}} min
          </div>
          <div class="rate">
            <at-rate
              :allow-half="true"
              :show-text="true"
              :value="moviedata.rating"
              :disabled="true"
            >
              <span class="_shadow">{{ moviedata.rating }}</span>
            </at-rate>
          </div>
          <div>
            <a target="_blank" :href="'https://www.imdb.com/title/'+moviedata.imdb_code+'/reviews'">
              <at-button class="_shadow" size="smaller" hollow>
                <span class="readbutton">Read Reviews</span>
              </at-button>
            </a>
          </div>
        </div>
        <div class="about">
          <div class="short_synopsis">{{moviedata.description_full}}</div>
          <!-- <iframe
          width="520"
          height="315"
          frameborder="0"
          src="https://www.youtube.com/embed/t433PEQGErc?rel=0&amp;wmode=transparent&amp;border=0&amp;autoplay=1&amp;iv_load_policy=3"
          name="1576779635664"
          class="cboxIframe"
          allowfullscreen="true"
          ></iframe>-->
          <div v-if="moviedata.yt_trailer_code" class="trailer" @click="opentrailer">
            <div class="ytvideo" :style="'background-image:url('+images[1]+')'">
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
        <div v-if="moviedata.cast" class="cast">
          <div class="title_Cast">Cast</div>
          <div class="_shadow profile" v-for="(cast, i) in moviedata.cast" :key="i">
            <a :href="'https://www.imdb.com/name/nm'+cast.imdb_code" target="_blank">
              <img
                :src="cast.url_small_image ? cast.url_small_image : '/default-profile.png'"
                width="60px"
                height="60px"
              />
              <div class="name">
                <span>{{cast.name}}</span>
              </div>
            </a>
          </div>
        </div>
      </div>
      <div class="footer">
        <div>
          <at-select class="selecttorrent" v-model="selectedTorrent" placement="top">
            <at-option
              v-for="(torrent, x) in torrents"
              :key="x"
              :value="x"
              :label="torrent.quality"
            >
              <span>{{torrent.quality}}</span>
              <span v-if="torrent.seeds > 500" class="peers peers-good">
                <i class="icon icon-battery-charging"></i>
                {{torrent.peers+'/'+torrent.seeds}}
              </span>
              <span v-if="torrent.seeds > 150 && torrent.seeds < 500" class="peers peers-mid">
                <i class="icon icon-battery-charging"></i>
                {{torrent.peers+'/'+torrent.seeds}}
              </span>
              <span v-if="torrent.seeds < 150" class="peers peers-bad">
                <i class="icon icon-battery-charging"></i>
                {{torrent.peers+'/'+torrent.seeds}}
              </span>
            </at-option>
          </at-select>
        </div>
        <div class="watchbutton">
          <at-button icon="icon-play-circle" size="large" @click="gowatch">WATCH NOW</at-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedTorrent: null,
      value1: 4.1,
      images: [],
      selectedImg: "",
      genre: "",
      moviedata: {},
      torrents: []
    };
  },
  validate({ params }) {
    return /^[0-9]*$/.test(params.id) && /^(?!0*$).*$/.test(params.id);
  },
  mounted() {
    this.backImages();
    this.getMovieData(this.$route.params.id);
  },
  methods: {
    gowatch() {
      if (this.selectedTorrent !== null) {
        if (this.torrents[this.selectedTorrent]) {
          console.log("redirect to:");
          this.$router.push(
            "/video/" + this.torrents[this.selectedTorrent].hash
          );
        } else this.$Message.error("Error!");
      } else this.$Message.error("please select first!");
    },
    opentrailer() {
      this.$modal.show("yt_trailer");
    },
    getMovieData(id) {
      this.$axios
        .$get("https://yts.lt/api/v2/movie_details.json", {
          params: {
            movie_id: id,
            with_images: true,
            with_cast: true
          }
        })
        .then(res => {
          if (res.data.movie.id !== 0) {
            console.log(res.data);
            this.moviedata = res.data.movie;
            this.images = [
              this.moviedata.large_screenshot_image1,
              this.moviedata.large_screenshot_image2,
              this.moviedata.large_screenshot_image3
            ];
            this.genre = this.moviedata.genres[0];
            this.torrents = this.moviedata.torrents;
          } else this.$router.push("/");
        })
        .catch(err => {
          console.error(err);
        });
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
  overflow: hidden;
}
.content {
  position: absolute;
  right: 0;
  left: 36%;
  top: calc(30% - 200px);
  max-height: 100vh;
  overflow-y: scroll;
  padding-bottom: 20%;
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
}

.info div {
  float: left;
  margin-right: 20px;
  color: white;
  font-size: 1rem;
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
  height: 100px;
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
  margin: 25px;
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
    left: 5%;
    padding-bottom: 50%;
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
}
@media (max-width: 404px) {
  .selecttorrent {
    padding-top: 20px;
    padding-bottom: 20px;
  }
  .watchbutton{
    margin-top: 20px;
  }
}
@media (max-width: 350px) {
  .title {
    font-size: 2.3rem;
  }
  .content{
    margin-top: 20px;
  }
  .selecttorrent {
    padding-top: 20px;
    padding-bottom: 1px;
  }
  .watchbutton{
    margin-top: 5px;
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