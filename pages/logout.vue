<template>
  <div></div>
</template>

<script>
export default {
  mounted() {
    localStorage.removeItem('token');
    localStorage.removeItem('vuex');
    this.$router.push({ path: "/login" });
    this.$store.dispatch("deleteToken");
    }
};
</script>

<style>
</style>