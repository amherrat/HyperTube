<template>
  <mdb-navbar expand="large" dark color="young-1337">
    <mdb-navbar-brand href="/">
      <img src="~/assets/Hbrand.png" height="50" alt />
    </mdb-navbar-brand>
    <mdb-navbar-toggler>
      <mdb-navbar-nav right>
        <nuxt-link to="login" no-prefetch>
          <mdb-nav-item>
            <span>
              <font-awesome-icon :icon="['fas', 'user']" size="2x" />
              <br />Login
            </span>
          </mdb-nav-item>
        </nuxt-link>
        <nuxt-link to="signup" no-prefetch>
          <mdb-nav-item>
            <span>
              <font-awesome-icon :icon="['fas', 'sign-in-alt']" size="2x" />
              <br />Sign up
            </span>
          </mdb-nav-item>
        </nuxt-link>
      </mdb-navbar-nav>
    </mdb-navbar-toggler>
  </mdb-navbar>
</template>
<script>
export default {};
</script>
<style scoped>
.young-1337 {
  margin-bottom: 10px;
  background-image: -webkit-gradient(
    linear,
    left top,
    right top,
    from(#000000),
    color-stop(0%, #271817),
    color-stop(21%, #27181799),
    color-stop(52%, #de1616e0),
    color-stop(78%, #941c1cfa),
    to(#000000)
  );
  background-image: linear-gradient(
    to right,
    #00000069 0%,
    rgba(36, 22, 21, 0.02745) 0%,
    #27181799 21%,
    #de1616e0 52%,
    #941c1cfa 78%,
    #000000 100%
  );
}
</style>