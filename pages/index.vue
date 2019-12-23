<template>
<div class="container">
      <div class="mask rgba-black-light d-flex justify-content-center align-items-center">
        <div class="text-center white-text">
          <h1 class="display-4 mb-4">
            <strong>Coming Soon!</strong>
          </h1>
          <p id="time-counter" class="border border-light my-4"></p>
          <h4 class="mb-4">
            <strong>We're working hard to finish the development of this site.</strong>
          </h4>
          <h4 class="mb-4 d-none d-md-block">
            <strong>Until then have a look at our Free Bootstrap 4 tutorials</strong>
          </h4>
                       <nuxt-link to="/signup"><mdb-btn outline="white" color="white" >Register Now</mdb-btn> </nuxt-link>

        </div>
      </div>
</div>
</template>

<script>
import Logo from "~/components/Logo.vue";

export default {
  components: {
    Logo
  }
};
</script>

<style>

</style>
