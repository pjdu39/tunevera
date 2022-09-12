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
    background-color: #405357;
}
.section2 {
    height: 1rem;
    background-color: #334C38;
}
.navbar-container {
    background-color: #334C38;
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
    background-color: #7F5B3F;
    box-shadow: 2px 2px 10px 3px #182312;
    color: #F5D29E;
    border-radius: 1rem;
    border-style: none;
}

/*
  PALETA DE COLORES

    #5C2C0C #405357
    #DDA35D #F5D29E
    #AA6231 #7F5B3F
    #E3DECA #334C38
    #3C3A1E #182312
*/
/*
.navbar-light .navbar-nav .nav-link {
    margin-left: 1rem;
    margin-right: 1rem;
    background-color: #E3DECA;
    box-shadow: inset 0px 0px 10px 6px #AA6231;
    color: #3C3A1E;
    border-radius: 3rem;
    border-style: groove;
} */

</style>