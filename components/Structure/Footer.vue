<template>
  <footer class="footer">
    <div class="navbar-container">
      <BNavbar toggleable="lg" type="dark">
        <BNavbarToggle target="nav-collapse"></BNavbarToggle>
        <BCollapse id="nav-collapse" is-nav>
          <BNavbarNav>
            <BNavItem href="#">
              <span class="fa fa-cog" aria-hidden="true"></span>
            </BNavItem>
            <BNavItem href="#">
              <span class="fa fa-legal" aria-hidden="true"></span>
            </BNavItem>
            <BNavItem href="#">
              <span class="fa fa-star" aria-hidden="true"></span>
            </BNavItem>
            <BNavItem href="#">
              <span class="fa fa-envelope" aria-hidden="true"></span>
            </BNavItem>
          </BNavbarNav>
        </BCollapse>
      </BNavbar>
    </div>
  </footer>
</template>

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

/*
  PALETA DE COLORES

    #5C2C0C #405357 #252B31
    #DDA35D #F5D29E #5E6668
    #AA6231 #7F5B3F #C1C8C7
    #E3DECA #334C38 #F6FAFB
    #3C3A1E #182312 #D49C6B
*/
</style>