<template>
  <footer class="footer">
    <div class="navbar-container">
      <BNavbar toggleable="lg" type="dark">
        <BNavbarToggle target="nav-collapse"></BNavbarToggle>
        <BCollapse id="nav-collapse" is-nav>
          <BNavbarNav>
            <BNavItem href="#">
              <font-awesome-icon icon="fa fa-cog" aria-hidden="true" />
            </BNavItem>
            <BNavItem href="#">
              <font-awesome-icon icon="fa fa-legal" aria-hidden="true" />
            </BNavItem>
            <BNavItem href="#">
              <font-awesome-icon icon="fa fa-star" aria-hidden="true" />
            </BNavItem>
            <BNavItem href="#">
              <font-awesome-icon icon="fa fa-envelope" aria-hidden="true" />
            </BNavItem>
          </BNavbarNav>
        </BCollapse>
      </BNavbar>
    </div>
  </footer>
</template>

<!-- TODO: Borrar todo el Footer. Ya no se usa -->

<script>
export default {};
</script>

<style scoped>
.footer {
  bottom: 0;
  width: 100%;
  position: absolute;
  /* TODO: Cambiar esto? Actualmente no sé qué es.  11/09//2022 */
  /* width: -webkit-fill-available; */
}
.navbar-container {
  background-color: #5e6668;
}
.navbar-dark .navbar-nav .nav-link {
  margin-left: 1rem;
  margin-right: 1rem;
  color: #f6fafb;
  background-color: #5e6668;
}
.navbar-expand-lg {
  height: 100%;
}

/* TODO: Ni idea de qué hace esto para centrar el navbar. Actualizar/borrar cuando sepa algo */
.navbar-expand-lg .navbar-collapse {
  place-content: center;
}
</style>