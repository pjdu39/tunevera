<template>
  <div>
    <div class="banner">
      <div class="navbar-user-container">
        <b-navbar toggleable="lg">
          <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
          <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav class="ml-auto">
              <b-nav-item href="#" class="user">
                <span class="fa fa-user fa-2x" aria-hidden="true"></span>
              </b-nav-item>
            </b-navbar-nav>
          </b-collapse>
        </b-navbar>
      </div>
      <div class="navbar-main-container">
        <b-navbar toggleable="lg">
          <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
          <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav class="main-navbar">
              <b-nav-item href="#" class="option">Más votados</b-nav-item>
              <b-nav-item href="#" class="option">Mediterránea</b-nav-item>
              <b-nav-item href="#" class="option">Oriental</b-nav-item>
              <b-nav-item href="#" class="option">Americana</b-nav-item>
              <b-nav-item href="#" class="option">Repostería</b-nav-item>
            </b-navbar-nav>
          </b-collapse>
        </b-navbar>
      </div>
    </div>

    <!-- <b-img class="" src="~/assets/img/banner.jpg"></b-img> -->
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.banner {
  height: 8rem;
  margin-bottom: 6rem;
  box-shadow: 2px 2px 6px 3px #252b31;;
}
.navbar-user-container {
  display: flex;
  height: 4rem;
  background-color: #252b31;
}
.navbar-main-container {
  display: flex;
  height: 4rem;
  background-color: #5e6668;
}
.main-navbar {
  margin-left: auto;
  margin-right: auto;
}
.navbar-light {
  display: contents;
}
/* TODO: Revisar si debe ser light o dark cuando acabe los estilos que quiero. Mantener la coherencia */
.navbar-light .navbar-nav .nav-link {
  padding-top: 0.35rem;
  padding-bottom: 0.35rem;
  margin-left: 1rem;
  margin-right: 1rem;
  background-color: #d49c6b;
  box-shadow: 2px 2px 6px 3px #252b31;
  color: #252b31;
  border-radius: 0.8rem 1.5rem 0.8rem 1.5rem;
  border-style: none;
}
.navbar-main-container .option .nav-link:hover {
  box-shadow: 1px 1px 11px 4px #F6FAFB;
}
.navbar-user-container .user .nav-link {
  margin-right: 2rem;
  border-radius: 3rem;
}
.navbar-user-container .user .nav-link:hover {
  box-shadow: 0px 0px 6px 3px #F6FAFB;
}
/*
.navbar-nav .user .nav-link{
  border-radius: 3rem;
}*/
/*
  PALETA DE COLORES

    #5C2C0C #405357 #252B31
    #DDA35D #F5D29E #5E6668
    #AA6231 #7F5B3F #C1C8C7
    #E3DECA #334C38 #F6FAFB
    #3C3A1E #182312 #D49C6B
*/
</style>