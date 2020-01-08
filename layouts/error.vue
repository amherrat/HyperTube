<template>
  <div class="container">
    <div class="errortext">
      <h1  v-if="error.statusCode === 404">{{$t("Page not found")}}</h1>
      <h1 v-else>{{$t("An error occurred")}}</h1>
      <nuxt-link to="/">
        <mdb-btn gradient="blue" rounded>{{$t("Go Home")}}</mdb-btn>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  props: ["error"],
  layout: "blog" // you can set a custom layout for the error page
};
</script>

<style scoped>
.errortext{
text-align:center;
}
.container {
  margin-left: auto;
  margin-right: auto;
  padding-top: 20%;
}
.container h1 {
  font-size: 5rem;
  font-weight: 400;
  color: white;
  text-shadow: 0 0 15px #abd6dfff, 0 0 #abd6dfff, 0 0 #abd6dfff, 0 0 #abd6dfff;

}
@media (max-width: 600px) {
  .container h1 {
      font-size: 2.5rem;
  }
  .container {
    padding-top: 70%;
  }
}
</style>