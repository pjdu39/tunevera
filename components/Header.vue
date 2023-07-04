<template>
  <div class="header">
    <div class="secondary-options-banner">
      <b-button
        v-click-outside="onClickOutside"
        class="secondary-options-button"
        @click="opcionesGear = !opcionesGear"
      >
        <span class="fa fa-cog" aria-hidden="true"></span>
      </b-button>
      <div v-if="opcionesGear" class="gear-options-container">
        <nuxt-link to="/Explorar" class="gear-option"> General </nuxt-link>
        <nuxt-link to="/Explorar" class="gear-option"> Perfil </nuxt-link>
        <nuxt-link to="/Explorar" class="gear-option"> Contáctanos </nuxt-link>
      </div>
    </div>
    <div class="navbar-main-container">
      <b-navbar toggleable="lg">
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav class="main-navbar">
            <nuxt-link to="/" class="option">
              <span class="fa fa-home" aria-hidden="true"></span>
            </nuxt-link>
            <!-- Casita -->
            <nuxt-link to="/Explorar" class="option">
              <span class="fa fa-search" aria-hidden="true"></span>
            </nuxt-link>
            <!-- Lupa -->
            <nuxt-link to="/NuevaReceta" class="option">
              <span class="fa fa-upload" aria-hidden="true"></span>
            </nuxt-link>
            <!-- Algo parecido a un "+" -->
            <nuxt-link to="/Perfil" class="option">
              <span class="fa fa-user" aria-hidden="true"></span>
            </nuxt-link>
            <!-- Icono Usuario -->
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>

    <!-- <b-img class="" src="~/assets/img/banner.jpg"></b-img> -->
  </div>
</template>

<script>
import vClickOutside from "v-click-outside";

export default {
  directives: {
    clickOutside: vClickOutside.directive,
  },
  data() {
    return {
      opcionesGear: false,
    };
  },
  methods: {
    onClickOutside(event) {
      this.opcionesGear = false;
    },
  },
};
</script>

<style scoped>
.header {
  position: absolute;
  width: 100vw;
  z-index: 30;
}

.secondary-options-banner {
  display: flex;
  height: 3rem;
  background-color: #252b31;
  border-style: none;
}

.secondary-options-button {
  position: absolute;
  right: 1.4rem;
  height: 20%;
  aspect-ratio: 1/1;
  font-size: 165%;
  background-color: transparent;
  border-style: none;
  box-shadow: none !important;
}

.gear-options-container {
  position: absolute;
  width: 9rem;
  top: 3.2rem;
  right: 2.4rem;
  padding: 0.4rem 0.3rem 0.4rem 0.3rem;
  background-color: #eaedee;
  border-radius: 1rem;
}

.gear-option {
  display: block;
  padding: 0 0.8rem 0 0.8rem;
  color: #252b31;
  text-decoration: none;
  border-radius: 1rem;
}

.gear-option:hover {
  background-color: #c1c8c7;
}
/* TODO: Borrar. Legacy.
.navbar-user-container {
  display: flex;
  height: 4rem;
  background-color: #252b31;
} */
.navbar-main-container {
  display: flex;
  height: 5.2rem;
  background-color: #d49c6b; /* 5e6668 */
}
.main-navbar {
  margin-left: auto;
  margin-right: auto;
}
.navbar-light {
  display: contents;
}
.option {
  font-size: 240%;
  padding: 0.35rem 1rem 0.35rem 1rem;
  margin-left: 4rem;
  margin-right: 4rem;
  background-color: #d49c6b;
  box-shadow: 3px 3px 10px -2px rgb(0, 0, 0),
    -1.5px -1.5px 6px 4px rgb(248, 248, 248, 0.3);
  color: #252b31;
  border-radius: 2rem 2rem 0.8rem 0.8rem;
  border-style: none;
}

.option:hover {
  box-shadow: 1px 1px 11px 4px #f6fafb;
}

.option:active {
  color: #f6fafb;
  background-color: #5e6668;
  box-shadow: 1px 1px 5px 2px #f6fafb;
}

.option:focus {
  /* Hacer que se mantenga el focus si se hace click en otro elemento que no sea de la barra de navegación principal */
  color: #f6fafb;
  box-shadow: 1px 1px 11px 4px #f6fafb;
}
/* TODO: Borrar. Legacy.
.navbar-user-container .user .nav-link {
  margin-right: 2rem;
  border-radius: 3rem;
}
.navbar-user-container .user .nav-link:hover {
  box-shadow: 0px 0px 6px 3px #F6FAFB;
} */

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