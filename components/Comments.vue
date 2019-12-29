<template>
  <div class="comments">
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
</template>

<script>
export default {
  name: "Comments",
  data() {
    return {
      inputComment: null
    };
  },
  methods: {
    NewComment() {
      console.log("Enter : " + this.inputComment);
      this.inputComment = null;
    }
  }
};
</script>

<style>
.user_profile img {
  border-radius: 50%;
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
@media (max-width: 600px) {
  .comments {
    width: 100%;
  }
}
</style>