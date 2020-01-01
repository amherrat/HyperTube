<template>
  <div>
    <div class="back">
      <div class="video">
        <xgplayer v-if="done" :options="playerOptions">Your browser does not support HTML5 video.</xgplayer>
        <div
          v-else
          class="loading spinner-grow text-danger"
          style="width: 5rem; height: 5rem;"
          role="status"
        >
          <span class="sr-only">Loading...</span>
        </div>
        <!-- <video width="400" controls>
          <source :src="playerOptions.url" type="video/mp4" />
          <source :src="playerOptions.url" type="video/ogg" />
          <track src="http://dl.opensubtitles.org/en/download/subformat-vtt/src-api/vrf-19d90c58/sid-U4Erxsm,FRUJohVBDHUjD4oNCj3/filead/1956586043" kind="captions" label="English" srclang="en" default>
        </video>
        <video width="400" controls>
          <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
          <source src="https://www.w3schools.com/html/mov_bbb.ogg" type="video/ogg" />Your browser does not support HTML5 video.
        </video>-->
      </div>
      <!-- <div class="input_button">
          <at-button type="success" hollow class="cosmment_button">Success</at-button>
      </div>-->
      <Comments v-if="done" />
    </div>
  </div>
</template>
<script>
import Comments from "../../components/Comments";
import axios from "axios";
export default {
  components: {
    Comments
  },
  validate({ params, query }) {
    var hash = params.hash.toLowerCase();
    if (!query.id) return false;
    return (
      // /^[0-9]*$/.test(query.id) &&
      // /^(?!0*$).*$/.test(query.id) &&
      /tt\d{7,8}/.test(query.id) && /([0-9a-f]{6})([0-9a-f]{34})/.test(hash)
    );
  },
  data() {
    return {
      done: false,
      movie_details: [],
      inputComment: "",
      playerOptions: {
        url: "/torrent/" + this.$route.params.hash,
        poster:
          "https://hcdevilsadvocate.com/wp-content/uploads/2019/01/netflix-background-9.jpg",
        volume: 0,
        textTrack: [],
        textTrackStyle: {
          "background-color": "#000",
          color: "#fff",
          "font-size": "26px"
        },
        // pip: true, picture-in-picture
        // autoplay: true,
        width: "100%" // Depends on its wrapper element.
      }
    };
  },
  created() {
    var id = this.$route.query.id;
    axios
      .get(
        `https://api.apiumadomain.com/movie?cb=&quality=720p,1080p,3d&page=1&imdb=${id}`
      )
      .then(res => {
        let data = res.data;
        console.log(data);
        this.movie_details = data;
        var fine = 0;
        // check if hash is from movie id
        for (let i in data.items) {
          if (
            data.items[i].torrent_magnet
              .substring(20, 60)
              .includes(this.$route.params.hash)
          )
            fine = 1;
        }
        if (fine) {
          console.log(data.poster_med);
          var imdbid = data.imdb;
          axios
            .get(
              `https://tinfo.apiumadomain.com/3/movie/${imdbid}/images?api_key=49101d62654e71a2931722642ac07e5e`
            )
            .then(res => {
              let data = res.data;
              this.playerOptions.poster = `http://image.tmdb.org/t/p/original${data.backdrops[0].file_path}`;
            })
            .catch(err => {
              console.log(err);
            });
          //subtitles
          this.$axios
            .$get(`/api/subtitles/${imdbid}`)
            .then(res => {
              console.log("subtitles");
              console.log(res);
              for (let lang in res) {
                console.log(res[lang].langShort);
                this.playerOptions.textTrack.push({
                  src: res[lang].path,
                  kind: "captions",
                  label: res[lang].lang,
                  srclang: res[lang].langShort,
                  default: res[lang].langShort === "en" ? true : false
                });
              }
              this.done = true;
            })
            .catch(err => {
              console.log(err);
            });
          // api/addvideo
          this.$axios
            .$post("/api/addvideo", {
              hash: this.$route.params.hash,
              username: this.userdata.login,
              imdbid: imdbid
            })
            .then(res => {
              console.log(res);
            })
            .catch(err => {
              console.log(err);
            });
        } else this.$router.push({ name: "home" });
      })
      .catch(err => {
        console.log(err);
      });
  },
  computed: {
    userdata: function() {
      return this.$store.getters.getdata;
    }
  },
  mounted() {
    console.log(this.$route.params.hash);
  },
  methods: {}
};
</script>
<style scoped>
.back {
  position: absolute;
  background: rgba(0, 0, 0, 1);
  width: 100%;
  height: 100%;
  top: 0;
  padding-top: 6%;
}

.video {
  width: 70%;
  height: auto;
  display: block;
  margin: 0 auto;
  padding-top: 20px;
}

.loading {
  margin-left: auto;
  margin-right: auto;
  display: block;
}

@media (max-width: 600px) {
  .video {
    width: 100%;
  }
  .back {
    padding-top: 18%;
  }
}
</style>