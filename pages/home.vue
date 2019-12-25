<template>
  <div class="container-fluid" id="padd">
    <div class=" clssss row" id="all">
      <div v-for="film in this.films" v-bind:key="film.id" class=" col-lg-2 col-md-3 col-sm-4 col-4"  style="padding-left: 0px; padding-right: 0;">
         <div class="card">
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
    </div>
  </div>
</template>

<script>
import axios from 'axios';



export default {
  data : () =>  {
    return {
      films: [],
      page: 1,
      limit: 50
    };
  },
  mounted() {
    if (!localStorage.token) this.$router.push({ path: "/login" });
    axios.get(`https://yts.lt/api/v2/list_movies.json?sort=seeds&page=${this.page}`)
         .then(res => {
           let data = res.data;
           if (data.status === "ok")
           {
             this.films = data.data.movies;
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
    
    scroll (state) {
        window.addEventListener(
      'scroll',
      function()
      {
          var scrollTop = document.documentElement.scrollTop ||
              document.body.scrollTop;
          var offsetHeight = document.body.offsetHeight;
          var clientHeight = document.documentElement.clientHeight;
          const ele = document.querySelector('body');
          if (ele.scrollHeight == scrollTop + clientHeight)
          {
                window.outerHeight = window.outerHeight + window.outerHeight;
                axios.get(`https://yts.lt/api/v2/list_movies.json?sort=seeds&page=${state.page}`)
                .then(res => {
                  let data = res.data;
                  if (data.status === "ok")
                  {
                    state.films = [...state.films, ...data.data.movies];
                    state.page = state.page + 1;
                  }
                })
                .catch(err => {console.log(err);});
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
@media only screen and (max-width: 900px){
  .details{
    font-size: 2px !important;
  }
}
.clssss{
  padding-bottom: 150px;
  margin-bottom: 100px;

}
  #all {
    
    height: 90vh;
    width: 100%;
  }
 
.card {
    position: relative;
    transform: translate(1%,0%);
    width: 100%;
    height:100%;
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