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
    <NuxtImg src="/img/cookbook-logo-recorte.png" class="logo" />
    <div class="navbar-main-container">
      <div toggleable="lg" class="main-navbar">
        <nuxt-link to="/" class="option">
          <div>
            <font-awesome-icon icon="fa fa-home" aria-hidden="true" /> INICIO
          </div>
        </nuxt-link>
        <nuxt-link to="/Explorar" class="option">
          <div>
            <font-awesome-icon icon="fa fa-search" aria-hidden="true" />
            BUSCAR
          </div>
        </nuxt-link>
        <nuxt-link to="/Uploads" class="option">
          <div>
            <font-awesome-icon icon="fa fa-cloud-upload" aria-hidden="true" />
            CREAR
          </div>
        </nuxt-link>
        <nuxt-link to="/Perfil" class="option">
          <div>
            <font-awesome-icon icon="fa fa-user" aria-hidden="true" /> PERFIL
          </div>
        </nuxt-link>
      </div>
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

<style scoped lang="scss">
.header {
  display: flex;
  flex-direction: column;
  position: fixed;
  background-color: $color-background;
  width: 100vw;
  z-index: 30;
}
.secondary-options-banner {
  display: flex;
  height: $header-top-bar-height;
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

.logo {
  margin: auto;
  height: $header-logo-height;
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
  // gap: 100;
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

  // Para maquetar solamente
  border-radius: 3rem;
}

.option:hover {
  color: $color-dark;
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
  color: $color-dark;
  box-shadow: 3px 3px 5px -3px #703400e8 inset,
    -1.5px -1.5px 3px 1px rgb(248, 248, 248, 0.3) inset;
}

@media (min-width: 900px) {
  .navbar-main-container {
    width: 50rem;
  }
}
</style>