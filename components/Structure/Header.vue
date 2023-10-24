<template>
  <div class="header">
    <div class="secondary-options-banner">
      <BButton
        v-click-outside="onClickOutside"
        class="secondary-options-button"
        @click="opcionesGear = !opcionesGear"
      >
        <font-awesome-icon icon="fa fa-cog" aria-hidden="true" />
      </BButton>
      <div v-if="opcionesGear" class="gear-options-container">
        <nuxt-link to="/Explorar" class="gear-option"> General </nuxt-link>
        <nuxt-link to="/Explorar" class="gear-option"> Perfil </nuxt-link>
        <nuxt-link to="/Explorar" class="gear-option"> Contáctanos </nuxt-link>
      </div>
    </div>
    <div class="navbar-main-container">
      <BNavbar toggleable="lg" class="main-navbar">
        <BNavbarToggle target="nav-collapse"></BNavbarToggle>
        <BCollapse id="nav-collapse" is-nav>
          <BNavbarNav>
            <nuxt-link to="/" class="option">
              <font-awesome-icon icon="fa fa-home" aria-hidden="true" />
            </nuxt-link>
            <nuxt-link to="/Explorar" class="option">
              <font-awesome-icon icon="fa fa-search" aria-hidden="true" />
            </nuxt-link>
            <nuxt-link to="/Uploads" class="option">
              <font-awesome-icon icon="fa fa-cloud-upload" aria-hidden="true" />
            </nuxt-link>
            <nuxt-link to="/Perfil" class="option">
              <font-awesome-icon icon="fa fa-user" aria-hidden="true" />
            </nuxt-link>
          </BNavbarNav>
        </BCollapse>
      </BNavbar>
    </div>
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
.navbar-main-container {
  display: flex;
  height: 5.2rem;
  background-color: #d49c6b; /* 5e6668 */
}
.main-navbar {
  margin-left: auto;
  margin-right: auto;
}
/* TODO: Borrar. Parece que esta clase ya no está en Bootstrap Vue Next. Además, display: contents no tiene nada que ver con el significado de la clase. */
.navbar-light {
  display: contents;
}
.option {
  font-size: 240%;
  padding: 0.35rem 1rem 0.35rem 1rem;
  margin-left: 4rem;
  margin-right: 4rem;
  background-color: #d49c6b;
  box-shadow: 3px 3px 8px -4px #703400e8,
    -1.5px -1.5px 4px 1px rgb(248, 248, 248, 0.3);
  /*
  box-shadow: 3px 3px 10px -2px rgb(0, 0, 0),
    -1.5px -1.5px 6px 4px rgb(248, 248, 248, 0.3); */
  color: #252b31;
  border-radius: 2rem 2rem 0.8rem 0.8rem;
  border-style: none;
}

.option:hover {
  color: #f6fafb;
  /* box-shadow: 1px 1px 11px 4px #f6fafb; */
}

.option:active {
  color: #f6fafb;
  box-shadow: 3px 3px 8px -2.5px #703400e8 inset,
    -1.5px -1.5px 6px 1px rgb(248, 248, 248, 0.6) inset;
  /*
  background-color: #b88558;
  box-shadow: 3px 3px 10px -2px rgb(0, 0, 0) inset,
    -1.5px -1.5px 6px 4px rgb(248, 248, 248, 0.3) inset; */
}

.nuxt-link-exact-active {
  color: #f6fafb;
  box-shadow: 3px 3px 5px -3px #703400e8 inset,
    -1.5px -1.5px 3px 1px rgb(248, 248, 248, 0.3) inset;
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