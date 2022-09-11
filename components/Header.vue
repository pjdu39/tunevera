<template>
  <div>
    <div class="banner">
        <div class="section1"></div>
        <div class="section2"></div>
    </div>
    <div class="navbar-container">
      <b-navbar toggleable="lg">
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item href="#">Populares</b-nav-item>
            <b-nav-item href="#">Mediterránea</b-nav-item>
            <b-nav-item href="#">Oriental</b-nav-item>
            <b-nav-item href="#">Italiana</b-nav-item>
          </b-navbar-nav>

          <b-navbar-nav class="ml-auto">
            <b-nav-item href="#">
              <span class="fa fa-user fa-2x" aria-hidden="true"></span>
            </b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>

    <!-- <b-img class="" src="~/assets/img/banner.jpg"></b-img> -->
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.banner {
    height: 4rem;
}
.section1 {
    height: 3rem;
    background-color: rgb(29, 20, 15);
}
.section2 {
    height: 1rem;
    background-color: rgb(68, 49, 38);
}
.navbar-container {
    background-color: rgb(68, 49, 38);
}
.buscar {
    /* No se aplica el auto? */
    margin-left: auto;
    margin-right: auto;
}
/* TODO: Revisar si debe ser light o dark cuando acabe los estilos que quiero. Mantener la coherencia */
.navbar-light .navbar-nav .nav-link {
    margin-left: 1rem;
    margin-right: 1rem;
    background-color: white;
    box-shadow: inset 0px 0px 10px 6px rgb(68, 49, 38);
    color: rgb(29, 20, 15);
    border-radius: 3rem;
}

</style>