<template>
<div class="container">
      <div class="mask rgba-black-light d-flex justify-content-center align-items-center">
        <div class="text-center white-text">
          <h1 class="display-4 mb-4">
            <strong>HyperTube!</strong>
          </h1>
          <p id="time-counter" class="border border-light my-4"></p>
          <h4 class="mb-4">
            <strong>This project proposes to create a web application that allows the user to research and watch videos.
The player will be directly integrated to the site, and the videos will be downloaded through the BitTorrent protocol.
</strong>
          </h4>
         
                       <nuxt-link to="/signup"><mdb-btn outline="white" color="white" >Register Now</mdb-btn> </nuxt-link>

        </div>
      </div>
</div>
</template>

<script>
export default {
created(){
    if (localStorage.token) this.$router.push({ path: "/home" });
}
};
</script>

<style>

</style>
