<template>
  <mdb-footer color="young-1337" class="font-small pt-0 fixed-bottom">
    <!--<mdb-container>
      <mdb-row>
        <mdb-col md="12">
          <div class="mb-3 flex-center">
            <li class="list-inline-item">
              <a href="#">
                <font-awesome-icon :icon="['fab', 'facebook']" size="3x" />
              </a>
            </li>
            <li class="list-inline-item">
              <a href="#">
                <font-awesome-icon :icon="['fab', 'instagram']" size="3x" />
              </a>
            </li>
            <li class="list-inline-item">
              <a href="#">
                <font-awesome-icon :icon="['fab', 'linkedin']" size="3x" />
              </a>
            </li>
          </div>
        </mdb-col>
      </mdb-row>
    </mdb-container>-->
    <div class="footer-copyright text-center py-3" style="opacity: 0.8">
      <mdb-container fluid>
        &copy; 2018 Copyright:
        <a href="/">Hyper Tube</a>
      </mdb-container>
    </div>
  </mdb-footer>
</template>
<style scoped>
.young-1337 {
    opacity: 0.8;
    background-image: -webkit-gradient(linear, left top, right top, from(#000000), color-stop(0%, #271817), color-stop(21%, #27181799), color-stop(52%, #de1669e0), color-stop(78%, #941c1cfa), to(#000000));
    background-image: linear-gradient(to right, #000000 0%, #000000 0%, #331c19 21%, #c30000 52%, #b93d3d 78%, #b12a2a 100%);
}
</style>
