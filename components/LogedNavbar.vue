<template>
  <mdb-navbar expand="large" dark color="young-1337">
    <mdb-navbar-brand href="/">
      <!-- class="animated bounce infinite" -->
      <img src="~/assets/Hbrand.png" height="50" alt />
    </mdb-navbar-brand>
    <mdb-navbar-toggler>
      <mdb-navbar-nav left>
        <nuxt-link to="film" no-prefetch>
          <mdb-nav-item>
            <span>
              <font-awesome-icon :icon="['fas', 'film']" size="2x" />
              <br />Films
            </span>
          </mdb-nav-item>
        </nuxt-link>
        <nuxt-link to="shows">
          <mdb-nav-item>
            <span>
              <font-awesome-icon :icon="['fas', 'tv']" size="2x" />
              <br />Shows
            </span>
          </mdb-nav-item>
        </nuxt-link>
      </mdb-navbar-nav>
      <mdb-navbar-nav right>
        <div class="md-form form-sm">
          <input type="text" placeholder="Search" class="form-control" />
        </div>
        <!-- <mdb-dropdown>
            <mdb-dropdown-toggle class="profile-icon-toggle"  slot="toggle"><img src="https://mdbootstrap.com/img/Photos/Avatars/avatar-1.jpg" class="rounded-circle z-depth-0"
            alt="avatar image" width="60px" height="60px"></mdb-dropdown-toggle>
            <mdb-dropdown-menu>
               <nuxt-link to="settings" no-prefetch><mdb-dropdown-item to="/settings">Settings</mdb-dropdown-item>
               </nuxt-link>
              <nuxt-link to="logout" no-prefetch> <mdb-dropdown-item to="/logout">Log out</mdb-dropdown-item>
              </nuxt-link>
            </mdb-dropdown-menu>
        </mdb-dropdown>-->
        <mdb-dropdown style="margin-left: 30px;">
          <mdb-dropdown-toggle class="profile-icon-toggle" slot="toggle">
            <img
              :src="user.profil ? user.profil : 'http://localhost:3000/default-profile.png'"
              class="rounded-circle z-depth-0"
              alt="avatar image"
              width="60px"
              height="60px"
            />
          </mdb-dropdown-toggle>
          <mdb-dropdown-menu>
            <mdb-dropdown-item to="/settings">
              <nuxt-link to="settings" no-prefetch>Settings</nuxt-link>
            </mdb-dropdown-item>
            <mdb-dropdown-item to="/logout">
              <nuxt-link to="logout" no-prefetch>Log out</nuxt-link>
            </mdb-dropdown-item>
          </mdb-dropdown-menu>
        </mdb-dropdown>
       <h3 style="min-width:80px; color:white; margin-top: 10px;">{{user.login}}</h3>
      </mdb-navbar-nav>
    </mdb-navbar-toggler>
  </mdb-navbar>
</template>
<script>
export default {
  data : () =>  {
    return {
      
    };
  },
  computed:{
   user: function() {
      return this.$store.getters.getdata;
    }
  },
  created() {
   this.$axios
    .get(`/api/whoAmi/${localStorage.token}`)
    .then(res => {
      this.$store.dispatch("getdata", res.data.data.user);
    })
    .catch(err => console.log(err));
  },
  methods: {
    
  }
};
</script>
<style scoped>
.profile-icon-toggle {
  box-shadow: none;
  padding: 0px;
}
.md-form {
  position: relative;
  margin: 0px;
}
.young-1337 {
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