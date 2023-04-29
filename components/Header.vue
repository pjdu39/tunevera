<template>
  <div class="header">
    <div class="secondary-options-banner">
      <b-button v-click-outside="onClickOutside" class="secondary-options-button" @click="opcionesGear = !opcionesGear">
        <span class="fa fa-cog" aria-hidden="true"></span>
      </b-button>
      <div v-if="opcionesGear" class="gear-options-container">
        <nuxt-link to="/Explorar" class="gear-option">
          General
        </nuxt-link>
        <nuxt-link to="/Explorar" class="gear-option">
          Perfil
        </nuxt-link>
        <nuxt-link to="/Explorar" class="gear-option">
          Contáctanos
        </nuxt-link>
      </div>
    </div>
    <div class="navbar-main-container">
      <b-navbar toggleable="lg">
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav class="main-navbar">
            <nuxt-link to="/" class="option">
              <span class="fa fa-home" aria-hidden="true"></span>
            </nuxt-link> <!-- Casita -->
            <nuxt-link to="/Explorar" class="option">
              <span class="fa fa-search" aria-hidden="true"></span>
            </nuxt-link> <!-- Lupa -->
            <nuxt-link to="/NuevaReceta" class="option">
              <span class="fa fa-upload" aria-hidden="true"></span>
            </nuxt-link> <!-- Algo parecido a un "+" -->
            <nuxt-link to="/Perfil" class="option">
              <span class="fa fa-user" aria-hidden="true"></span>
            </nuxt-link> <!-- Icono Usuario -->
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>

    <!-- <b-img class="" src="~/assets/img/banner.jpg"></b-img> -->
  </div>
</template>

<script>
import vClickOutside from 'v-click-outside'

export default {
  directives: {
    clickOutside: vClickOutside.directive
  },
  data() {
    return {
      opcionesGear: false
    }
  },
  methods: {
    onClickOutside (event) {
      this.opcionesGear = false
    }
  }
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
  padding: .4rem .3rem .4rem .3rem;
  background-color: #eaedee;
  border-radius: 1rem;
}

.gear-option {
  display: block;
  padding: 0 .8rem 0 .8rem;
  color: #252b31;
  text-decoration: none;
  border-radius: 1rem;
}

.gear-option:hover {
  background-color: #C1C8C7;
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
  background-color: #5e6668;
}
.main-navbar {
  margin-left: auto;
  margin-right: auto;
}
.navbar-light {
  display: contents;
}
/* TODO: Borrar. Los navbar se han sustituído por nuxt-links */
/* TODO: Revisar si debe ser light o dark cuando acabe los estilos que quiero. Mantener la coherencia */
/*
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
} */

.option {
  font-size: 240%;
  padding: 0.35rem 1rem 0.35rem 1rem;
  margin-left: 4rem;
  margin-right: 4rem;
  background-color: #d49c6b;
  /* box-shadow: 2px 2px 6px 3px #252b31;*/  /* Probar sin sombra un tiempo a ver qué tal */
  color: #252b31;
  border-radius: 2rem 2rem 0.8rem 0.8rem;
  border-style: none;
}

.option:hover {
  box-shadow: 1px 1px 11px 4px #F6FAFB;
}

.option:active {
  color: #F6FAFB;
  background-color: #5E6668;
  box-shadow: 1px 1px 5px 2px #F6FAFB;
}

.option:focus { /* Hacer que se mantenga el focus si se hace click en otro elemento que no sea de la barra de navegación principal */
  color: #F6FAFB;
  box-shadow: 1px 1px 11px 4px #F6FAFB;
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