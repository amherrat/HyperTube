<template>
  <div class="container-fluid" id="padd">
      <el-slider
            v-model="filmyear"
            range
            show-stops
            :min="1950"
            :max="2020"
            @change="FilterBy"
          ></el-slider>
    <div v-on:click="filterbar()" v-show="!this.filterbarshow">
      <center><font-awesome-icon style="color: red;" :icon="['fas', 'angle-double-down']" size="2x"/></center>
    </div>
    <div class="row" id="searchEngine" v-show="this.filterbarshow">
        <div class="col-md-2"></div>
        <div class="col-md-8">
            <h1 style="text-align: center;">Search&Filter engine</h1>
            <form>
              <div class="form-row">
                <div class="col-md-12">
                  <label for="searchTerm"><h3>Your term</h3></label>
                  <input type="text" class="form-control"  v-model="term" id="searchTerm" placeholder="Your term">
                </div>
              </div>
              <br />
              
              <div class="class-row">
                <div class="row">
                  <div class="col-md-3">
                    <div class="form-group">
                      <label for="quality">Quality</label>
                      <select v-model="choosedQuality" id="quality" class="form-control">
                        <option selected>All</option>
                        <option v-for="(qua, index) in this.quality" v-bind:key="index">{{qua}}</option>
                      </select>
                    </div>
                  </div>
                  <div class="col-md-3">
                    <div class="form-group">
                      <label for="genre">Genre</label>
                      <select id="genre" v-model="choosedGenre" class="form-control">
                        <option v-for="(gen, index) in this.genre" v-bind:key="index">{{gen}}</option>
                      </select>
                    </div>
                  </div>
                  <div class="col-md-3">
                    <div class="form-group">
                      <label for="rating">Rating</label>
                      <select id="rating" v-model="choosedRate" class="form-control">
                        <option selected>0</option>
                        <option v-for="(rate, index) in this.rating" v-bind:key="index">{{rate}}</option>
                      </select>
                    </div>
                  </div>
                  <div class="col-md-3">
                    <div class="form-group">
                      <label for="order">Order</label>
                      <select id="order" class="form-control">
                        <option selected>None</option>
                        <option>...</option>
                        <option>...</option>
                        <option>...</option>
                        <option>...</option>
                        <option>...</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-4" />
                <div class="col-md-4">
                  <center>
                    <button v-on:click="search()" type="button" style="color: black;width: 100%;" class="btn btn-danger">
                      <font-awesome-icon :icon="['fas', 'search']" size="1x"/>
                      Done
                    </button>
                  </center>
                </div>
                <div class="col-md-4" />
              </div>
            </form>
        </div>
        <div class="col-md-2"></div>
    </div>
    <div class="clssss row" id="all">
      <div v-if="!this.filmsExist" style="margin-left: 58vh; margin-top: 8vh;" class="spinner-border text-danger" role="status">
        <span class="sr-only">Loading...</span>
      </div>
      <div v-for="(film, index) in this.films" v-bind:key="index" ref="comCard" id="comCard" class="col-lg-2 col-md-3 col-sm-4 col-4"  style="padding-left: 0px; padding-right: 0;">
         <div class="card" ref="mycard" id="mycard">
            <div class="image">
              <img :src="film.medium_cover_image" />
            </div>
            <div class="details">
              <div class="center">
                <h1 >{{film.title}}
                <br />
                <br />
                <span style="color: #ffe066 ;">{{film.rating}}&nbsp;<font-awesome-icon style="color: #ffe066 " :icon="['fas', 'star']" size="1x"/></span>
                <br />
                <br />
                <span style="color: #ffe066 ; ">{{film.year}}&nbsp;<font-awesome-icon style="color: #ffe066 " :icon="['fas', 'clock']" size="1x"/></span>
                <br />
                <br />
                <nuxt-link :to="'/movie/'+ film.id">
                <span style="color: #ffe066 ; cursor:pointer;"><font-awesome-icon style="color: #ffe066 " :icon="['far', 'eye']" size="2x"/></span>

                </nuxt-link>
                </h1>
                  <p></p>
              </div>
            </div>
          </div>
      </div>
      
      <div v-if="!this.loadDone" style="margin-left: 58vh; margin-top: 8vh;" class="spinner-border text-danger" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';



export default {
  data : () =>  {
    return {
      filmyear: [2000,2019],
      films: [],
      term: '',
      filterbarshow: false,
      choosedQuality: 'All',
      choosedGenre: 'All',
      choosedRate: 0,
      quality: ["3D", "720p", "1080p"],
      genre: ["All", "Action", "Adventure", "Animation", "Biography", "Comedy", "Crime", "Documentary", "Drama", "Family", "Fantasy", "Film-Noir", "Game-Show", "History", "Horror", "Music", "Mystery", "News", "Reality-TV", "Romance", "Sci-Fi", "Sport", "Talk-Show", "Thriller", "War", "Western"],
      rating: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
      page: 1,
      filmsExist: 0,
      limit: 50,
      loadDone: 1,
      activeScroll: 1
    };
  },
  mounted() {
    axios.get(`https://yts.lt/api/v2/list_movies.json?sort=seeds&page=${this.page}`)
         .then(res => {
           let data = res.data;
           if (data.status === "ok")
           {
             this.films = data.data.movies;
             console.log(this.films);
             this.filmsExist = 1;
             this.page = this.page + 1;
           }
           this.scroll(this);
         })
         .catch(err => {});
  },
 
  destroyed () {
    window.removeEventListener('scroll', this.scroll);
  },
  methods : {
    filterbar () {
      this.filterbarshow = !this.filterbarshow;
    },
    search () {
      this.filmsExist = 0;
      this.films = [];
      this.page = 0;
      console.log(this.choosedQuality, this.choosedRate, this.choosedGenre);
      let link;
      if (this.choosedQuality === "All" && this.choosedRate === 0 && this.term === '' && this.choosedGenre === "All")
        link = `https://yts.lt/api/v2/list_movies.json?sort=seeds&page=${this.page}`;
      else
      {
        this.activeScroll = 0;
        if ( this.choosedGenre === "All" )
          this.choosedGenre = 0;
        if (this.choosedQuality === "All")
          this.choosedQuality = 0;
        link = `https://yts.lt/api/v2/list_movies.json?query_term=${this.term}&quality=${this.choosedQuality}&minimum_rating=${this.choosedRate}&genre=${this.choosedGenre}`;
        if (this.choosedGenre === 0)
          this.choosedGenre = "All";
        if (this.choosedQuality === 0)
          this.choosedQuality = "All";
      }
      console.log(link);
      axios.get(link)
      .then(res => {
          console.log(res.data);
        let data = res.data;
        if (data.status === "ok" && data.data.movies)
        {
          
          this.films = data.data.movies;
          this.page = 1;
        }
        this.filmsExist = 1;
        this.filterbarshow = false;
      })
      .catch(err => {
        this.filterbarshow = false;
        this.filmsExist = 1;
        console.log(err);
      });
    },
    scroll (state) {
        window.addEventListener(
      'scroll',
      function()
      {
          var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
          var clientHeight = document.documentElement.clientHeight;
          const ele = document.querySelector('body');
          if (ele.scrollHeight <= scrollTop + clientHeight/* && state.activeScroll === 1*/)
          {
            state.page = state.page + 1;
            state.loadDone = 0;
            window.outerHeight = window.outerHeight + window.outerHeight;
            let link = "";
            if (state.activeScroll === 1 && state.choosedQuality === "All" && state.choosedRate === 0 && state.term === '' && state.choosedGenre === "All")
              link = `https://yts.lt/api/v2/list_movies.json?sort=seeds&page=${state.page}`;
            else
            {
              if ( state.choosedGenre === "All" )
                state.choosedGenre = 0;
              if (state.choosedQuality === "All")
                state.choosedQuality = 0;
              link = `https://yts.lt/api/v2/list_movies.json?page=${state.page}&query_term=${state.term}&quality=${state.choosedQuality}&minimum_rating=${state.choosedRate}&genre=${state.choosedGenre}`;
              console.log("here", link);
              if (state.choosedGenre === 0)
                state.choosedGenre = "All";
              if (state.choosedQuality === 0)
                state.choosedQuality = "All";
            }
            axios.get(link)
            .then(res => {
              let data = res.data;
              if (data.status === "ok")
              {
                state.films = [...state.films, ...data.data.movies];
              }
              state.loadDone = 1;
            })
            .catch(err => {
              state.loadDone = 1;
              console.log(err);
            });
          }
          else
          {
            
          }
      },
      false
    );

     
    }
  },
  components: {
  }
};
</script>

<style scoped>

.clssss{
  padding-bottom: 150px;
  margin-bottom: 100px;

}

#searchEngine{
  background-image: linear-gradient( to left, 
  rgba(0,0,0,0.41176) 0%,
   rgba(36, 22, 21, 0.02745) 0%, 
   rgba(230, 59, 48, 0.6) 21%, 
   rgb(132, 124, 124) 52%, 
   rgba(148,28,28,0.98039) 78%,
    #0c0a0a 100% );
  color: aliceblue;
  padding: 3vh;
  font-family: auto;
  color: black;
}
  #all {
    
    height: 90vh;
    width: 100%;
  }
 
.card {
    position: relative;
    transform: translate(1%,0%);
    width: 100%;

    background: #000;
    padding: 0px;
}
.col-12{
  padding-left: 0px;
    padding-right: 0;
}
.card .image {
    width: 100%;
    height: 100%;
    overflow: hidden;
}
.card .image img {
    width: 100%;
    height:100%;
    transition: .5s;
}
.card:hover .image img {
    opacity: .5;
}
.card .details {
    position: absolute;
    top: 20;
    left: 0;
    width: 100%;/*100%*/
    height: 100%;
    background: rgba(0,0,0,0.4);
    transition: .5s;
    transform-origin: left;
    transform: perspective(2000px) rotateY(-90deg);
}
.card:hover .details {
    transform: perspective(2000px) rotateY(0deg);
}
.row {

    margin-right: 0;
    margin-left: 0;
}
.card .details .center {
    padding: 20px;
    text-align: center;
    background: rgb(255,0,0,0.8)	;
    position: absolute;
    top: 50%;
    width:100%;
    transform: translateY(-50%);
}
.card .details .center h1 {
    margin: 0;
    padding: 0;
    color: black;
    line-height: 20px;
    font-size: 20px;
    text-transform: uppercase;
}
.card .details .center h1 span {
    font-size: 14px;
    color: #262626;
}
.card .details .center p {
    margin: 10px 0;
    padding: 0;
    color: #262626;
}
.card .details .center ul {
    margin: 10px auto 0;
    padding: 0;
    display: table;
}
.card .details .center ul li {
    list-style: none;
    margin: 0 5px;
    float: left;
}
.card .details .center ul li a {
    display: block;
    background: #262626;
    color: #fff;
    width: 30px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    transform: .5s;
}
.card .details .center ul li a:hover {
    background: #ff3636;
}
</style>