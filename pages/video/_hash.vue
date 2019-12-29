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
      <div v-if="done" class="comments">
        <div class="input_comment">
          <div class="input_profile">
            <img src="/default-profile.png" width="60px" height="60px" />
          </div>
          <div class="input_textarea">
            <input v-model="inputComment" class="textarea" v-on:keyup.enter="NewComment()" />
            <!-- <at-textarea v-model="inputComment" placeholder="Please input..." class="textarea"  v-on:keyup.enter="NewComment()"></at-textarea> -->
          </div>
        </div>
        <div class="other_comment">
          <div class="userscomment">
            <div class="user_profile">
              <img src="/default-profile.png" width="60px" height="60px" />
            </div>
            <div class="user_comment">
              <span>Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte. Il n'a pas fait que survivre cinq siècles, mais s'est aussi adapté à la bureautique informatique, sans que son contenu n'en soit modifié. Il a été popularisé dans les années 1960 grâce à la vente de feuilles Letraset contenant des passages du Lorem Ipsum, et, plus récemment, par son inclusion dans des applications de mise en page de texte, comme Aldus PageMaker.</span>
            </div>
          </div>
          <div class="userscomment">
            <div class="user_profile">
              <img src="/default-profile.png" width="60px" height="60px" />
            </div>
            <div class="user_comment">
              <span>Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  validate({ params, query }) {
    var hash = params.hash.toLowerCase();
    if (!query.id) return false;
    return (
      /^[0-9]*$/.test(query.id) &&
      /^(?!0*$).*$/.test(query.id) &&
      /([0-9a-f]{6})([0-9a-f]{34})/.test(hash)
    );
  },
  data() {
    return {
      done: false,
      movie_details: [],
      inputComment: "",
      playerOptions: {
        url: "http://localhost:3000/torrent/" + this.$route.params.hash,
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
    this.$axios
      .$get(
        "https://yts.lt/api/v2/movie_details.json?with_images=true&movie_id=" +
          id
      )
      .then(res => {
        this.movie_details = res.data.movie;
        console.log(res.data.movie);
        var fine = 0;
        // check if hash is from movie id
        for (let index in res.data.movie.torrents) {
          if (
            res.data.movie.torrents[index].hash.includes(
              this.$route.params.hash
            )
          )
            fine = 1;
        }
        if (fine) {
          var imdbid = res.data.movie.imdb_code;
          this.playerOptions.poster = res.data.movie.large_screenshot_image3;
          this.$axios
            .$get("/api/subtitles/" + imdbid)
            .then(res => {
              console.log("subtitles");
              console.log(res);
              for (let lang in res) {
                if (["en", "ar", "fr", "es"].includes(res[lang].langcode)) {
                  console.log(res[lang].langcode);
                  this.playerOptions.textTrack.push({
                    src: res[lang].vtt,
                    kind: "captions",
                    label: res[lang].lang,
                    srclang: res[lang].langcode,
                    default: res[lang].langcode === "en" ? true : false
                  });
                }
              }
              this.done = true;
            })
            .catch(err => {
              console.log(err);
            });
          this.$axios
            .$post("/api/addvideo", {
              hash: this.$route.params.hash,
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
  mounted() {
    console.log(this.$route.params.hash);
  },
  methods: {
    NewComment() {
      console.log("Enter : " + this.inputComment);
      this.inputComment = null;
    }
  }
};
</script>
<style scoped>
.back {
  position: absolute;
  background: black;
  width: 100%;
  height: 100%;
}

.textarea {
  width: 100%;
  height: 40px;
}

.comments {
  position: absolute;
  width: 70%;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  padding: 20px 0;
  padding-bottom: 80px;
}

.input_profile {
  width: 65px;
  height: 65px;
  display: inline-block;
  vertical-align: middle;
}

.input_profile img {
  border-radius: 50%;
}

.input_textarea {
  display: inline-block;
  vertical-align: middle;
  width: calc(100% - 75px);
}

.input_button {
  position: absolute;
  right: 0;
  margin-right: 5px;
}

.comment_button {
  right: 0;
}

.user_profile img {
  border-radius: 50%;
}

.user_profile {
  width: 65px;
  height: 65px;
  display: inline-block;
  vertical-align: middle;
}

.user_comment {
  display: inline-block;
  vertical-align: middle;
  width: calc(100% - 75px);
  background: rgba(255, 255, 255, 0.2);
  padding: 10px;
  margin-top: 10px;
  font-size: 1.1rem;
  color: white;
  text-shadow: 0 0 5px #abd6dfff, 0 0 #abd6dfff, 0 0 #abd6dfff, 0 0 #abd6dfff;
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
  .comments {
    width: 100%;
  }
}
</style>