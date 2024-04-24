<template>
  <div class="menu">
    <div class="navbar-main-container">
      <div class="main-navbar">
        <nuxt-link to="/" class="option">
          <div>
            <font-awesome-icon icon="fa fa-home" aria-hidden="true" />
          </div>
        </nuxt-link>
        <nuxt-link to="/Buscar" class="option">
          <div>
            <font-awesome-icon icon="fa fa-search" aria-hidden="true" />
          
          </div>
        </nuxt-link>
        <nuxt-link to="/Uploads" class="option">
          <div>
            <font-awesome-icon icon="fa fa-cloud-upload" aria-hidden="true" />
          
          </div>
        </nuxt-link>
        <nuxt-link to="/Perfil" class="option">
          <div>
            <font-awesome-icon icon="fa fa-user" aria-hidden="true" />
          </div>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>
  
<script setup>
</script>
  
  <style scoped lang="scss">
.menu {
  display: flex;
  flex-direction: column;
  position: sticky;
  top: 0;
  margin-bottom: 2rem;
  background-color: $color-background;
  width: 100vw;
  z-index: 50;
  font-family: $font-headers;
  font-size: 130%;
  letter-spacing: 3px;
}
.navbar-main-container {
  height: $header-main-bar-height;
  background-color: $color-primary;
  width: 90%;
  align-self: center;
  border-radius: 3rem;
}
.main-navbar {
  height: $header-main-bar-height;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  // gap: 30px; // TODO: Queda mejor pero rompe la vista móvil. Arreglarlo al crear estilos específicos para móvil.
  align-items: center;
  top: 0;
}
.option {
  display: contents; // No tengo muy claro que hace esto
  height: $header-main-bar-height;
  width: 10rem;
  flex: 0;
  font-size: 100%;
  background-color: $color-primary;
  color: $color-background;
  font-weight: bold;
  text-align: center;
  line-height: $header-main-bar-height;
}
.option:hover {
  color: $color-dark;
}
.option:active {
  color: #f6fafb;
  box-shadow: 3px 3px 8px -2.5px #703400e8 inset,
    -1.5px -1.5px 6px 1px rgb(248, 248, 248, 0.6) inset;
}
.nuxt-link-exact-active {
  color: $color-dark;
  box-shadow: 3px 3px 5px -3px #703400e8 inset,
    -1.5px -1.5px 3px 1px rgb(248, 248, 248, 0.3) inset;
}

@media (min-width: 900px) {
  .navbar-main-container {
    width: 50rem;
  }
}
@media (max-width: 800px) {
  .navbar-main-container {
    width: 98%;
  }
}
</style>