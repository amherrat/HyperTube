<template>
  
</template>

<script>
export default {
    data(){
        return{
            error: ''
        }
    },
    mounted(){
        this.error = this.$route.query.err;
        this.$nuxt.error({ statusCode: 401, msg: this.error });
    }
}
</script>

<style>

</style>