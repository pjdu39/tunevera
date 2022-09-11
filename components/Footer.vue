<template>
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
</template>

<script>
export default {

}
</script>

<style scoped>
.navbar-container{
  height: 2.5rem;
  background-color: rgb(29, 20, 15);
}
.navbar-dark .navbar-nav .nav-link {
  margin-left: 1rem;
  margin-right: 1rem;
  color: rgb(243, 243, 243);
  background-color: rgb(29, 20, 15);
  border-radius: 2rem;
}
.navbar-expand-lg {
  height: 100%;
}


/* TODO: Ni idea de qué hace esto para centrar el navbar. Actualizar/borrar cuando sepa algo */
.navbar-expand-lg .navbar-collapse {
  place-content: center;
}
</style>