<template>
  <div class="container-fluid" id="padd">
    <div class="block">
      <el-slider
        v-model="filmyear"
        range
        show-stops
        :max="2020"
        :min="1950"
        v-on:change="yearGap()">
        
      </el-slider>
    </div>
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
                  <!-- <div class="col-md-3">
                    <div class="form-group">
                      <label for="rating">Rating</label>
                      <select id="rating" v-model="choosedRate" class="form-control">
                        <option selected>0</option>
                        <option v-for="(rate, index) in this.rating" v-bind:key="index">{{rate}}</option>
                      </select>
                    </div>
                  </div> -->
                  <div class="col-md-3">
                    <div class="form-group">
                      <label for="sortby">Sort by</label>
                      <select id="sortby" v-model="sortvalue" class="form-control">
                        <option selected>None</option>
                        <option v-for="(ele, index) in this.sortby" v-bind:key="index">{{ele}}</option>
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
      <div v-if="!this.filmsExist" style="margin-left: 49%; margin-top: 8vh;" class="spinner-border text-danger" role="status">
        <span class="sr-only">Loading...</span>
      </div>
      <div v-for="(film, index) in this.films" v-bind:key="index" ref="comCard" id="comCard" class="col-lg-2 col-md-3 col-sm-4 col-4"  style="padding-left: 0px; padding-right: 0;">
         <div class="card" ref="mycard" id="mycard">
            <div class="image">
              <!-- <img :src="film.medium_cover_image" /> -->
              <img :src="film.poster_med" />
            </div>
            <div class="details">
              <div class="center">
                <h1 id="infos">{{film.title.substring(0,20)}}
                <br />
                <br />
                <span style="color: #ffe066 ;">{{film.rating}}&nbsp;<font-awesome-icon id="iconStyle" style="color: #ffe066 " :icon="['fas', 'star']" size="1x"/></span>
                <br />
                <br />
                <span style="color: #ffe066 ; ">{{film.year}}&nbsp;<font-awesome-icon id="iconStyle" style="color: #ffe066 " :icon="['fas', 'clock']" size="1x"/></span>
                <br />
                <br />
                <!-- <nuxt-link :to="'/movie/'+ film.id"> -->
                <nuxt-link :to="'/movie/'+ film.imdb">
                  <span style="color: #ffe066 ; cursor:pointer;"><font-awesome-icon id="iconStyle" style="color: #ffe066 " :icon="['far', 'eye']" size="2x"/></span>
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
      busy: false,
      filmyear: [1950,2020],
      allFilm: [],
      films: [],
      term: '',
      filterbarshow: false,
      choosedQuality: 0,
      choosedGenre: 0,
      choosedRate: 0,
      sortvalue: 0,
      // sortby: ["year", "rating", "peers", "seeds", "download_count"], dateadded, seeds, year, title
      sortby: ["date added", "popularity", "year", "title"],
      quality: ["3D", "720p", "1080p"],
      // genre: ["All", "Action", "Adventure", "Animation", "Biography", "Comedy", "Crime", "Documentary", "Drama", "Family", "Fantasy", "Film-Noir", "Game-Show", "History", "Horror", "Music", "Mystery", "News", "Reality-TV", "Romance", "Sci-Fi", "Sport", "Talk-Show", "Thriller", "War", "Western"],
      genre: ["All", "Action", "Adventure", "Animation", "Biography", "Comedy", "Crime", "Documentary", "Drama", "Family", "Fantasy", "Film-Noir", "History", "Horror", "Music", "Mystery", "Romance", "Sci-Fi", "Sport", "Thriller", "War", "Western"],
      rating: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
      page: 1,
      filmsExist: 0,
      limit: 50,
      loadDone: 1,
      activeScroll: 1,
      empty: false
    };
  },
  mounted() {
    this.infinteScroll();
    // axios.get(`https://yts.ms/api/v2/list_movies.json?sort=seeds&page=${this.page}`)
    axios.get(`https://api.apiumadomain.com/list?sort=seeds&short=1&cb=&quality=720p,1080p,3d&page=${this.page}`)
         .then(res => {
           let data = res.data;
          //  if (data.status === "ok")
           if (res.status === 200)
           {
             this.films = data.MovieList;
             this.page = this.page + 1;
             this.filmsExist = 1;
            //  this.films = data.data.movies;
            //  this.allFilm = data.data.movies;
            //  this.filmsExist = 1;
            //  this.page = this.page + 1;
           }
           this.scroll(this);
         })
         .catch(err => {});
  },
 
  destroyed () {
    window.removeEventListener('scroll', this.scroll);
  },
  methods : {
    yearGap () {
      let all = this.allFilm;
      let min = this.filmyear[0];
      let max = this.filmyear[1];
      let showed = all.filter(film => film.year >= min && film.year <= max);
      this.films = showed;
    },
    filterbar () {
      this.filterbarshow = !this.filterbarshow;
    },
    search () {
      this.filmsExist = 0;
      this.films = [];
      this.page = 1;
      this.empty = false;
      let link;
      
      if (!this.choosedQuality  && !this.sortvalue && !this.choosedRate  && !this.term  && !this.choosedGenre ){

      console.log('everything empty');
        link = `https://api.apiumadomain.com/list?sort=seeds&short=1&cb=&quality=720p,1080p,3d&page=${this.page}`;
        // link = `https://yts.lt/api/v2/list_movies.json?sort=seeds&page=${this.page}`;
      }
      else
      {
        console.log(this.choosedQuality,this.sortvalue,this.choosedRate,this.term ,this.choosedGenre);
        this.activeScroll = 0;
        // if ( this.sortvalue === "None" ) // dateadded, seeds, year, title
        //   this.sortvalue = "date_added";
        // if ( this.choosedGenre === "All" ) // 
        //   this.choosedGenre = 0;
        // if (this.choosedQuality === "All") //720p, 1080p, 3d
        //   this.choosedQuality = 0;
        // link = `https://yts.lt/api/v2/list_movies.json?sort_by=${this.sortvalue}&query_term=${this.term}&quality=${this.choosedQuality}&minimum_rating=${this.choosedRate}&genre=${this.choosedGenre}`;
        this.sortvalue = this.sortvalue === "None" ? 0 : this.sortvalue;
        this.sortvalue = this.sortvalue === "popularity" ? "seeds" : this.sortvalue;
        this.sortvalue = this.sortvalue === "date added" ? "dateadded" : this.sortvalue;
        this.choosedGenre = this.choosedGenre === "All" ? 0 : this.choosedGenre;
        this.choosedQuality = this.choosedQuality === "All" ? 0 : this.choosedQuality;
        console.log(this.choosedQuality,this.sortvalue,this.choosedRate,this.term ,this.choosedGenre);
        link = `https://api.apiumadomain.com/list?sort=${this.sortvalue ? this.sortvalue : ''}&short=1&cb=&quality=${this.choosedQuality ? this.choosedQuality : '' }&page=${this.page}&keywords=${this.term ? this.term : ''}&genre=${this.choosedGenre ? this.choosedGenre : ''}`;
        // if (this.choosedGenre === 0)
        //   this.choosedGenre = "All";
        // if (this.choosedQuality === 0)
        //   this.choosedQuality = "All";
        // if ( this.sortvalue === "date_added" )
        //   this.sortvalue = "None";
      }
      console.log(`link ${link}`);
      axios.get(link)
      .then(res => {
        let data = res.data;
        console.log(data.MovieList);
        if (res.status === 200 && data.MovieList.length)
        {
          this.films = data.MovieList;
          this.page = this.page + 1;
          this.filmsExist = 1;
          // let min = this.filmyear[0];
          // let max = this.filmyear[1];
          // this.films = data.data.movies.filter(film => film.year >= min && film.year <= max);
          // console.log(this.films[0]);
          // this.allFilm = data.data.movies;
          // this.page = 1;
        }else{
          //2end Api
          console.log('popcorn api');
          // link = `https://api.apiumadomain.com/list?sort=seeds&short=1&cb=&quality=720p,1080p,3d&page=1&keywords=${this.term}`
          axios.get(link).then(res => {
            let Movies = res.data.MovieList;
            console.log(Movies);
          }).catch(err => {console.log(err)});
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
    getMoreData(){
      if (this.sortvalue || this.choosedGenre || this.choosedQuality || this.term){
        let link = `https://api.apiumadomain.com/list?sort=${this.sortvalue ? this.sortvalue : ''}&short=1&cb=&quality=${this.choosedQuality ? this.choosedQuality : '' }&page=${this.page}&keywords=${this.term ? this.term : ''}&genre=${this.choosedGenre ? this.choosedGenre : ''}`;
        console.log(link);
        axios.get(link)
        .then(res => {
          let data = res.data;
          if (res.status === 200 && data.MovieList.length)
          {
            console.log(data.MovieList);
            this.films = this.films.concat(data.MovieList);
            this.page += 1;
            this.filmsExist = 1;
            console.log(this.films);
            this.empty = false;
          }
        })
        .catch(err => {});        
      }else{
      this.filmsExist = 0;
      axios.get(`https://api.apiumadomain.com/list?sort=seeds&short=1&cb=&quality=720p,1080p,3d&page=${this.page}`)
      .then(res => {
        let data = res.data;
        if (res.status === 200  && data.MovieList.length)
        {
          console.log(data.MovieList);
          this.films = this.films.concat(data.MovieList);
          this.page += 1;
          this.filmsExist = 1;
          console.log(this.films);
          this.empty = false;
        }
      })
      .catch(err => {});
      }

    },
    infinteScroll(){
      console.log('loadmore');
      window.onscroll = () => {
        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
          var clientHeight = document.documentElement.clientHeight;
          const ele = document.querySelector('body');
          console.log(this.$route.name);
          if (ele.scrollHeight <= (scrollTop + clientHeight + 150) && !this.empty && this.$route.name === "home")
          {
            console.log('scroll now');
            this.empty = true;
            this.getMoreData();
          }
      }
    },
    scroll (state) {
        window.addEventListener(
      'scroll',
      function()
      {
         /* var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
          var clientHeight = document.documentElement.clientHeight;
          const ele = document.querySelector('body');
          if (ele.scrollHeight <= (scrollTop + clientHeight + 150))
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
              if ( state.sortvalue === "None" )
                state.sortvalue = "date_added";
              if (state.choosedQuality === "All")
                state.choosedQuality = 0;
              link = `https://yts.lt/api/v2/list_movies.json?sort_by=${state.sortvalue}&page=${state.page}&query_term=${state.term}&quality=${state.choosedQuality}&minimum_rating=${state.choosedRate}&genre=${state.choosedGenre}`;
              console.log("here", link);
              if (state.choosedGenre === 0)
                state.choosedGenre = "All";
              if (state.choosedQuality === 0)
                state.choosedQuality = "All";
              if ( state.sortvalue === "date_added" )
                state.sortvalue = "None";
            }
            axios.get(link)
            .then(res => {
              let data = res.data;
              if (data.status === "ok")
              {
                state.allFilm = [...state.allFilm, ...data.data.movies];
                state.films = [...state.films, ...data.data.movies];
                let min = state.filmyear[0];
                let max = state.filmyear[1];
                state.films = state.films.filter(film => film.year >= min && film.year <= max);
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
            
          }*/
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

@media (max-width: 600px) {
  #infos{
    font-size: 15px;
  }
  #iconStyle{
    font-size: 15px;
  }
  .card .details .center {
    padding: 0px !important;
    text-align: center;
    background: rgb(255,0,0,0.8)	;
    position: absolute;
    top: 50%;
    height: 100%;
    width:100%;
  }
}

.clssss{
  padding-bottom: 150px;
  margin-bottom: 100px;

}
.color_slider .el-slider__runway .el-slider__bar {
    background-color: red !important;
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