<template>
  <div class="comments">
    <div class="input_comment">
      <div class="input_profile">
        <img :src="this.$store.getters.getdata ? this.$store.getters.getdata.profil : 'http://localhost:3000/default-profile.png'" width="60px" height="60px" />
      </div>
      <div class="input_textarea">
        <input v-model="inputComment" class="textarea" v-on:keyup.enter="NewComment()" />
      </div>
    </div>
    <div class="other_comment">
      <div style="margin-top: 2%;" class="userscomment" v-for="(com, index) in this.comment" v-bind:key="index">
        <div class="user_profile" style="margin-top: 1%;">
          <img :src="com.user && com.user.profil ? com.user.profil : 'http://localhost:3000/default-profile.png'" width="60px" height="60px" />
        </div>
        <div class="user_comment">
          <span>{{com.comment}}</span>
        </div>
        <div class="userNameDate">
          <span>{{com.user && com.user.login ? com.user.login : ''}},{{new Date(com.date).toLocaleString()}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Comments",
  data() {
    return {
      inputComment: null,
      hash: this.$route.params.hash,
      id: this.$route.query.id,
      token: localStorage.token,
      userId: this.$store.getters.getdata,
      comment: []
    };
  },
  created(){
    this.getComment();
    //console.log("---------------->",this.$store.getters.getdata)
    //console.log(this.$store.getters.getdata.profil);
    
  },
  methods: {
    getComment() {
      const theComment = {
          id_film: this.id,
          hash_film: this.hash
      }
      this.$axios
            .$get(`/api/comment/get/${this.token}/${theComment.id_film}/${theComment.hash_film}`)
            .then(res => {
              console.log(res.data);
              if (res.success)
                this.comment = res.data.reverse();
            })
            .catch(err => {
              console.log(err);
            }) 
    },
    NewComment() {
      const theComment = {
        id_film: this.id,
        hash_film: this.hash,
        comment: this.inputComment,
        token: this.token,
        _id: this.userId
      }
      this.$axios
          .$post('/api/comment/add', theComment)
          .then(res => {
            if (res.success)
            {
              let data = res.data;
              let comment = this.comment;
              comment.unshift(data);
              this.comment = comment;
              this.inputComment = "";
            }
          })
          .catch(err => {
          })
    }
  }
};
</script>

<style>
@media (max-width: 1170px) {
  .userscomment{
    margin-top: 5% !important;
  }
}
.user_profile img {
  border-radius: 50%;
}
.userNameDate{
  color: white;
  float: right;
  margin-right: 1%;
  font-size: 11px;
}
.user_profile {
  width: 65px;
  height: 65px;
  display: inline-block;
  vertical-align: middle;
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

.textarea {
  width: 100%;
  height: 40px;
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
.comment_button {
  right: 0;
}
.user_comment {
  border-radius: 25px;
  margin-top: 0%;
  display: inline-block;
  vertical-align: middle;
  width: calc(100% - 75px);
  background: rgba(255, 255, 255, 0.2);
  padding: 10px;
  margin-top: 10px;
  font-size: 1.1rem;
  color: white;
  margin-top: 3%;
  text-shadow: 0 0 5px #abd6dfff, 0 0 #abd6dfff, 0 0 #abd6dfff, 0 0 #abd6dfff;
}
@media (max-width: 600px) {
  .comments {
    width: 100%;
  }
}
</style>