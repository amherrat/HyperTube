<template>
  <div class="container" >
    
  </div>
</template>

<script>

export default {
  components: {
  },
  mounted()
  {
    console.log("Mounted");
  },
  created(){
    if (!localStorage.token) this.$router.push({ path: "/login" });
  }
};
</script>

<style scoped>

</style>