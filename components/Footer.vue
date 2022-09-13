<template>
  <footer class="footer">
    <div class="navbar-container">
      <b-navbar toggleable="lg" type="dark">
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item href="#">
                <span class="fa fa-cog" aria-hidden="true"></span>
            </b-nav-item>
            <b-nav-item href="#">
                <span class="fa fa-legal" aria-hidden="true"></span>
            </b-nav-item>
            <b-nav-item href="#">
                <span class="fa fa-star" aria-hidden="true"></span>
            </b-nav-item>
            <b-nav-item href="#">
                <span class="fa fa-envelope" aria-hidden="true"></span>
            </b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
  </footer>
</template>

<script>
export default {

}
</script>

<style scoped>
.footer{
    bottom: 0;
    width: 100%;
    position: absolute;
    /* TODO: Cambiar esto? Actualmente no sé qué es.  11/09//2022 */
    /* width: -webkit-fill-available; */
}
.navbar-container{
  background-color: #405357;
}
.navbar-dark .navbar-nav .nav-link {
  margin-left: 1rem;
  margin-right: 1rem;
  color: #F5D29E;
  background-color: #405357;
}
.navbar-expand-lg {
  height: 100%;
}


/* TODO: Ni idea de qué hace esto para centrar el navbar. Actualizar/borrar cuando sepa algo */
.navbar-expand-lg .navbar-collapse {
  place-content: center;
}

/*
  PALETA DE COLORES

    #5C2C0C #405357
    #DDA35D #F5D29E
    #AA6231 #7F5B3F
    #E3DECA #334C38
    #3C3A1E #182312
*/
</style>